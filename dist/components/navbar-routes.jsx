"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarRoutes = void 0;
const nextjs_1 = require("@clerk/nextjs");
const navigation_1 = require("next/navigation");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const button_1 = require("./ui/button");
const search_input_1 = require("./search-input");
const NavbarRoutes = () => {
    const pathname = (0, navigation_1.usePathname)();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";
    return (<>
      {isSearchPage && (<div className="hidden md:block">
          <search_input_1.SearchInput />
        </div>)}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (<link_1.default href="/">
            <button_1.Button size="sm" variant="ghost">
              <lucide_react_1.LogOut className="h-4 w-4 mr-2"/>
              Exit
            </button_1.Button>
          </link_1.default>) : (<link_1.default href="/teacher/courses">
            <button_1.Button size="sm" variant="ghost">
              Teacher mode
            </button_1.Button>
          </link_1.default>)}
        <nextjs_1.UserButton afterSignOutUrl="/"/>
      </div>
    </>);
};
exports.NavbarRoutes = NavbarRoutes;
