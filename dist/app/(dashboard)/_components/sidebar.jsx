"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const logo_1 = require("./logo");
const sidebar_routes_1 = require("./sidebar-routes");
const Sidebar = () => {
    return (<div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <logo_1.Logo />
      </div>

      <div className="flex flex-col w-full">
        <sidebar_routes_1.SidebarRoutes />
      </div>
    </div>);
};
exports.Sidebar = Sidebar;
