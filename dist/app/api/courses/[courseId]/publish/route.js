"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCH = void 0;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
async function PATCH(req, { params }) {
    try {
        const { userId } = (0, server_1.auth)();
        if (!userId) {
            return new server_2.NextResponse("Unauthorized", { status: 401 });
        }
        const course = await db_1.db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    },
                },
            },
        });
        if (!course) {
            return new server_2.NextResponse("Not found", { status: 404 });
        }
        const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);
        if (!course.title ||
            !course.description ||
            !course.imageUrl ||
            !course.categoryId ||
            !hasPublishedChapter) {
            return new server_2.NextResponse("Missing required fiels", { status: 401 });
        }
        const publishedCourse = await db_1.db.course.update({
            where: {
                id: params.courseId,
                userId,
            },
            data: {
                isPublished: true,
            },
        });
        return server_2.NextResponse.json(publishedCourse);
    }
    catch (error) {
        console.log("[COURSE_ID_PUBLISH]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.PATCH = PATCH;
