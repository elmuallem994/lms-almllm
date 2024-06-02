"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCH = exports.DELETE = void 0;
const mux_node_1 = __importDefault(require("@mux/mux-node"));
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
const mux = new mux_node_1.default({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
});
async function DELETE(req, { params }) {
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
        if (!chapter) {
            return new server_2.NextResponse("Not Found", { status: 404 });
        }
        if (chapter.videoUrl) {
            const existingMuxData = await db_1.db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                },
            });
            if (existingMuxData) {
                await mux.video.assets.delete(existingMuxData.assetId);
                await db_1.db.muxData.delete({
                    where: {
                        id: existingMuxData.id,
                    },
                });
            }
        }
        const deletedChapter = await db_1.db.chapter.delete({
            where: {
                id: params.chapterId,
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
        return server_2.NextResponse.json(deletedChapter);
    }
    catch (error) {
        console.log("[CHAPTER_ID_DELETE]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.DELETE = DELETE;
async function PATCH(req, { params }) {
    try {
        const { userId } = (0, server_1.auth)();
        const { isPublished, ...values } = await req.json();
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
        const chapter = await db_1.db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                ...values,
            },
        });
        if (values.videoUrl) {
            const existingMuxData = await db_1.db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                },
            });
            if (existingMuxData) {
                await mux.video.assets.delete(existingMuxData.assetId);
                await db_1.db.muxData.delete({
                    where: {
                        id: existingMuxData.id,
                    },
                });
            }
            const asset = await mux.video.assets.create({
                input: values.videoUrl,
                playback_policy: ["public"],
                test: false,
            });
            await db_1.db.muxData.create({
                data: {
                    chapterId: params.chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                },
            });
        }
        return server_2.NextResponse.json(chapter);
    }
    catch (error) {
        console.log("[COURSES_CHAPTER_ID]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.PATCH = PATCH;
