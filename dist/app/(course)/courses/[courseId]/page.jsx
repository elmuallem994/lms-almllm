"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@/lib/db");
const navigation_1 = require("next/navigation");
const CourseIdPage = async ({ params }) => {
    const course = await db_1.db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                orderBy: {
                    position: "asc",
                },
            },
        },
    });
    if (!course) {
        return (0, navigation_1.redirect)("/");
    }
    return (0, navigation_1.redirect)(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};
exports.default = CourseIdPage;
