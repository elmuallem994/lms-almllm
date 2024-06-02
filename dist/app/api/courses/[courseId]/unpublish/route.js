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
        });
        if (!course) {
            return new server_2.NextResponse("Not found", { status: 404 });
        }
        const unpublishedCourse = await db_1.db.course.update({
            where: {
                id: params.courseId,
                userId,
            },
            data: {
                isPublished: false,
            },
        });
        return server_2.NextResponse.json(unpublishedCourse);
    }
    catch (error) {
        console.log("[COURSE_ID_UNPUBLISH]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.PATCH = PATCH;
