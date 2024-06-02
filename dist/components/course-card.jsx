"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCard = void 0;
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const icon_badge_1 = require("@/components/icon-badge");
const lucide_react_1 = require("lucide-react");
const format_1 = require("@/lib/format");
const CourseCard = ({ id, title, imageUrl, chaptersLength, price, progress, category, }) => {
    return (<link_1.default href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <image_1.default fill className="object-cover" alt={title} src={imageUrl}/>
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <icon_badge_1.IconBadge size="sm" icon={lucide_react_1.BookOpen}/>
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (<div>TODO: Progress component</div>) : (<p className="text-md md:text-sm font-medium text-slate-700">
              {(0, format_1.formatPrice)(price)}
            </p>)}
        </div>
      </div>
    </link_1.default>);
};
exports.CourseCard = CourseCard;
