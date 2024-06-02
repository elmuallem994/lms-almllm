"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const db_1 = require("@/lib/db");
const search_input_1 = require("@/components/search-input");
const courses_list_1 = require("@/components/courses-list");
const get_courses_1 = require("@/actions/get-courses");
const categories_1 = require("./_components/categories");
const SearchPage = async ({ searchParams }) => {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const categories = await db_1.db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
    const courses = await (0, get_courses_1.getCourses)({
        userId,
        ...searchParams,
    });
    return (<>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <search_input_1.SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <categories_1.Categories items={categories}/>
        <courses_list_1.CoursesList items={courses}/>
      </div>
    </>);
};
exports.default = SearchPage;
