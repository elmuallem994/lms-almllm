"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSidebar = void 0;
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const db_1 = require("@/lib/db");
const course_sidebar_item_1 = require("./course-sidebar-item");
const CourseSidebar = async ({ course, progressCount, }) => {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const purchase = await db_1.db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId: course.id,
            },
        },
    });
    return (<div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {/* Check purchase and add progress */}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (<course_sidebar_item_1.CourseSidebarItem key={chapter.id} id={chapter.id} label={chapter.title} isCompleted={!!chapter.userProgress?.[0]?.isCompleted} courseId={course.id} isLocked={!chapter.isFree && !purchase}/>))}
      </div>
    </div>);
};
exports.CourseSidebar = CourseSidebar;
