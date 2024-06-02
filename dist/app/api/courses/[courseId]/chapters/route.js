"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
async function POST(req, { params }) {
    try {
        const { userId } = (0, server_1.auth)();
        const { title } = await req.json();
        if (!userId) {
            return new server_2.NextResponse("Unauthorized", { status: 401 });
        }
        const courseOwner = await db_1.db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });
        if (!courseOwner) {
            return new server_2.NextResponse("Unauthorized", { status: 401 });
        }
        const lastChapter = await db_1.db.chapter.findFirst({
            where: {
                courseId: params.courseId,
            },
            orderBy: {
                position: "desc",
            },
        });
        const newPosition = lastChapter ? lastChapter.position + 1 : 1;
        const chapter = await db_1.db.chapter.create({
            data: {
                title,
                courseId: params.courseId,
                position: newPosition,
            },
        });
        return server_2.NextResponse.json(chapter);
    }
    catch (error) {
        console.log("[CHAPTERS]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.POST = POST;
