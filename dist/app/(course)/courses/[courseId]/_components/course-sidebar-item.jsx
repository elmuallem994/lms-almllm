"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSidebarItem = void 0;
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const CourseSidebarItem = ({ label, id, isCompleted, courseId, isLocked, }) => {
    const pathname = (0, navigation_1.usePathname)();
    const router = (0, navigation_1.useRouter)();
    const Icon = isLocked ? lucide_react_1.Lock : isCompleted ? lucide_react_1.CheckCircle : lucide_react_1.PlayCircle;
    const isActive = pathname?.includes(id);
    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    };
    return (<button onClick={onClick} type="button" className={(0, utils_1.cn)("flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20", isActive &&
            "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700", isCompleted && isActive && "bg-emerald-200/20")}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={(0, utils_1.cn)("text-slate-500", isActive && "text-slate-700", isCompleted && "text-emerald-700")}/>
        {label}
      </div>
      <div className={(0, utils_1.cn)("ml-auto opacity-0 border-2 border-slate-700 h-full transition-all", isActive && "opacity-100", isCompleted && "border-emerald-700")}/>
    </button>);
};
exports.CourseSidebarItem = CourseSidebarItem;
