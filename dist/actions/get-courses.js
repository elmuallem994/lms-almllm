"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = void 0;
const get_progress_1 = require("@/actions/get-progress");
const db_1 = require("@/lib/db");
const getCourses = async ({ userId, title, categoryId, }) => {
    try {
        const courses = await db_1.db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
                purchase: {
                    where: {
                        userId,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const coursesWithProgress = await Promise.all(courses.map(async (course) => {
            if (course.purchase.length === 0) {
                return {
                    ...course,
                    progress: null,
                };
            }
            const progressPercentage = await (0, get_progress_1.getProgress)(userId, course.id);
            return {
                ...course,
                progress: progressPercentage,
            };
        }));
        return coursesWithProgress;
    }
    catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
};
exports.getCourses = getCourses;
