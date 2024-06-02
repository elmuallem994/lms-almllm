"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChapter = void 0;
const db_1 = require("@/lib/db");
const getChapter = async ({ userId, courseId, chapterId, }) => {
    try {
        const purchase = await db_1.db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        const course = await db_1.db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId,
            },
            select: {
                price: true,
            },
        });
        const chapter = await db_1.db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            },
        });
        if (!chapter || !course) {
            throw new Error("Chapter or course not found ");
        }
        let muxData = null;
        let attachments = [];
        let nextChapter = null;
        if (purchase) {
            attachments = await db_1.db.attachment.findMany({
                where: {
                    courseId: courseId,
                },
            });
        }
        if (chapter.isFree || purchase) {
            muxData = await db_1.db.muxData.findUnique({
                where: {
                    chapterId: chapterId,
                },
            });
            nextChapter = await db_1.db.chapter.findFirst({
                where: {
                    courseId: courseId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position,
                    },
                },
                orderBy: {
                    position: "asc",
                },
            });
        }
        const userProgress = await db_1.db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId,
                },
            },
        });
        return {
            chapter,
            course,
            muxData,
            attachments,
            nextChapter,
            userProgress,
            purchase,
        };
    }
    catch (error) {
        console.log("[GET_CHAPTER]", error);
        return {
            chapter: null,
            course: null,
            muxData: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
            purchase: null,
        };
    }
};
exports.getChapter = getChapter;
