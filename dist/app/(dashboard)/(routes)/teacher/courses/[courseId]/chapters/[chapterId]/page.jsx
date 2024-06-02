"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const db_1 = require("@/lib/db");
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const icon_badge_1 = require("@/components/icon-badge");
const chapter_title_form_1 = require("./_components/chapter-title-form");
const chapter_description_form_1 = require("./_components/chapter-description-form");
const chapter_access_form_1 = require("./_components/chapter-access-form");
const chapter_video_form_1 = require("./_components/chapter-video-form");
const banner_1 = require("@/components/banner");
const chapter_actions_1 = require("./_components/chapter-actions");
const ChapterIdPage = async ({ params, }) => {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const chapter = await db_1.db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId,
        },
        include: {
            muxData: true,
        },
    });
    if (!chapter) {
        return (0, navigation_1.redirect)("/");
    }
    const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;
    const isComplete = requiredFields.every(Boolean);
    return (<>
      {!chapter.isPublished && (<banner_1.Banner variant="warning" label="This chapter is unpublished. It will not be visible in the course"/>)}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <link_1.default href={`/teacher/courses/${params.courseId}`} className="flex items-center text-sm hover:opacity-75 transition mb-6">
              <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
              Back to course setup
            </link_1.default>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <chapter_actions_1.ChapterActions disabled={!isComplete} courseId={params.courseId} chapterId={params.chapterId} isPublished={chapter.isPublished}/>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <icon_badge_1.IconBadge icon={lucide_react_1.LayoutDashboard}/>
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <chapter_title_form_1.ChapterTitleForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}/>

              <chapter_description_form_1.ChapterDescriptionForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}/>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <icon_badge_1.IconBadge icon={lucide_react_1.Eye}/>
                <h2 className="text-xl">Access Setting</h2>
              </div>
              <chapter_access_form_1.ChapterAccessForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}/>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <icon_badge_1.IconBadge icon={lucide_react_1.Video}/>
              <h2 className="text-xl">Add a video</h2>
            </div>
            <chapter_video_form_1.ChapterVideoForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}/>
          </div>
        </div>
      </div>
    </>);
};
exports.default = ChapterIdPage;
