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
        const course = await db_1.db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
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
        for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await mux.video.assets.delete(chapter.muxData.assetId);
            }
        }
        const deletedCourse = await db_1.db.course.delete({
            where: {
                id: params.courseId,
            },
        });
        return server_2.NextResponse.json(deletedCourse);
    }
    catch (error) {
        console.log("[COURSE_ID_DELETE]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.DELETE = DELETE;
async function PATCH(req, { params }) {
    try {
        const { userId } = (0, server_1.auth)();
        const { courseId } = params;
        const values = await req.json();
        if (!userId) {
            return new server_2.NextResponse("Unauthorized", { status: 401 });
        }
        const course = await db_1.db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                ...values,
            },
        });
        return server_2.NextResponse.json(course);
    }
    catch (error) {
        console.log("[COURSE_ID]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.PATCH = PATCH;
