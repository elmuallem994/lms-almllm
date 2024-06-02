"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUT = void 0;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
async function PUT(req, { params }) {
    try {
        const { userId } = (0, server_1.auth)();
        if (!userId) {
            return new server_2.NextResponse("Unauthorized", { status: 401 });
        }
        const { list } = await req.json();
        const ownCourse = await db_1.db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });
        if (!ownCourse) {
            return new server_2.NextResponse("Unauthorized", { status: 401 });
        }
        for (let item of list) {
            await db_1.db.chapter.update({
                where: { id: item.id },
                data: { position: item.position },
            });
        }
        return new server_2.NextResponse("Success", { status: 200 });
    }
    catch (error) {
        console.log("[REORDER]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.PUT = PUT;
