"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const db_1 = require("@/lib/db");
const data_table_1 = require("./_components/data-table");
const columns_1 = require("./_components/columns");
const CoursesPage = async () => {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const courses = await db_1.db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return (<div className="p-6">
      <data_table_1.DataTable columns={columns_1.columns} data={courses}/>
    </div>);
};
exports.default = CoursesPage;
