"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = void 0;
const db_1 = require("@/lib/db");
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
async function DELETE(req, { params }) {
    try {
        const { userId } = (0, server_1.auth)();
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
        const attachment = await db_1.db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId,
            },
        });
        return server_2.NextResponse.json(attachment);
    }
    catch (error) {
        console.log("ATTACHMENT_ID", error);
        return new server_2.NextResponse("Internal Error", { status: 500 });
    }
}
exports.DELETE = DELETE;
