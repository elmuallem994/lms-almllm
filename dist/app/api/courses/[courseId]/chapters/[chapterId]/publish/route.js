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
        const chapter = await db_1.db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
        });
        const muxData = await db_1.db.muxData.findUnique({
            where: {
                chapterId: params.chapterId,
            },
        });
        if (!chapter ||
            !muxData ||
            !chapter.title ||
            !chapter.description ||
            !chapter.videoUrl) {
            return new server_2.NextResponse("Missing required fields", { status: 400 });
        }
        const publishedChapter = await db_1.db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                isPublished: true,
            },
        });
        return server_2.NextResponse.json(publishedChapter);
    }
    catch (error) {
        console.log("[CHAPTER_PUBLISH]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.PATCH = PATCH;
