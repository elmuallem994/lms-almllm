"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCH = void 0;
const db_1 = require("@/lib/db");
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
async function PATCH(req, { params }) {
    try {
        const { userId } = (0, server_1.auth)();
        if (!userId) {
            return new server_2.NextResponse("Unauthorized", { status: 401 });
        }
        const ownCourse = await db_1.db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
        });
        if (!ownCourse) {
            return new server_2.NextResponse("Unauthorized", { status: 401 });
        }
        const unpublishedChapter = await db_1.db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                isPublished: false,
            },
        });
        const publishedChaptersInCourse = await db_1.db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            },
        });
        if (!publishedChaptersInCourse.length) {
            await db_1.db.course.update({
                where: {
                    id: params.courseId,
                },
                data: {
                    isPublished: false,
                },
            });
        }
        return server_2.NextResponse.json(unpublishedChapter);
    }
    catch (error) {
        console.log("[CHAPTER_UNPUBLISH]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.PATCH = PATCH;
