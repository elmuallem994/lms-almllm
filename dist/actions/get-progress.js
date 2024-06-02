"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgress = void 0;
const db_1 = require("@/lib/db");
const getProgress = async (userId, courseId) => {
    try {
        const publishedChapters = await db_1.db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
            select: {
                id: true,
            },
        });
        const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
        const validCompletedChapters = await db_1.db.userProgress.count({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChapterIds,
                },
                isCompleted: true,
            },
        });
        const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;
        return progressPercentage;
    }
    catch (error) {
        console.log("[GET_PROGRESS]", error);
        return 0;
    }
};
exports.getProgress = getProgress;
