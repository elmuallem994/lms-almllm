"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
async function POST(req) {
    try {
        const { userId } = (0, server_1.auth)();
        const { title } = await req.json();
        if (!userId) {
            return new server_2.NextResponse("Unauthorized", { status: 401 });
        }
        const course = await db_1.db.course.create({
            data: {
                userId,
                title,
            },
        });
        return server_2.NextResponse.json(course);
    }
    catch (error) {
        console.log("[COURSES]", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.POST = POST;
