"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@clerk/nextjs/server");
const db_1 = require("@/lib/db");
const navigation_1 = require("next/navigation");
const get_progress_1 = require("@/actions/get-progress");
const course_sidebar_1 = require("./_components/course-sidebar");
const course_navbar_1 = require("./_components/course-navbar");
const CourseLayout = async ({ children, params, }) => {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const course = await db_1.db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                include: {
                    userProgress: {
                        where: {
                            userId,
                        },
                    },
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
    const progressCount = await (0, get_progress_1.getProgress)(userId, course.id);
    return (<div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50 ">
        <course_navbar_1.CourseNavbar course={course} progressCount={progressCount}/>
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <course_sidebar_1.CourseSidebar course={course} progressCount={progressCount}/>
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>);
};
exports.default = CourseLayout;
