"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarRoutes = void 0;
const lucide_react_1 = require("lucide-react");
const sidebar_item_1 = require("./sidebar-item");
const navigation_1 = require("next/navigation");
const guestRoutes = [
    {
        icon: lucide_react_1.Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: lucide_react_1.Compass,
        label: "Browse",
        href: "/search",
    },
];
const teacherRoutes = [
    {
        icon: lucide_react_1.List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: lucide_react_1.BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
];
const SidebarRoutes = () => {
    const pathname = (0, navigation_1.usePathname)();
    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    return (<div className="flex flex-col w-full">
      {routes.map((route) => (<sidebar_item_1.SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href}/>))}
    </div>);
};
exports.SidebarRoutes = SidebarRoutes;
