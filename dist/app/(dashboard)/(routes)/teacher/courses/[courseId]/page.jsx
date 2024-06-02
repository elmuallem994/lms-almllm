"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@clerk/nextjs/server");
const db_1 = require("@/lib/db");
const navigation_1 = require("next/navigation");
const icon_badge_1 = require("@/components/icon-badge");
const banner_1 = require("@/components/banner");
const lucide_react_1 = require("lucide-react");
const title_form_1 = require("./_components/title-form");
const description_form_1 = require("./_components/description-form");
const image_form_1 = require("./_components/image-form");
const category_form_1 = require("./_components/category-form");
const price_form_1 = require("./_components/price-form");
const attachment_form_1 = require("./_components/attachment-form");
const chapters_form_1 = require("./_components/chapters-form");
const actions_1 = require("./_components/actions");
const CourseIdPage = async ({ params }) => {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const course = await db_1.db.course.findUnique({
        where: {
            id: params.courseId,
            userId,
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
    const categories = await db_1.db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
    if (!course) {
        return (0, navigation_1.redirect)("/");
    }
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some((chapter) => chapter.isPublished),
    ];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;
    const isComplete = requiredFields.every(Boolean);
    return (<>
      {!course.isPublished && (<banner_1.Banner label="This course is unpublished. It will not be visible to the students."/>)}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>

          <actions_1.Actions disabled={!isComplete} courseId={params.courseId} isPublished={course.isPublished}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <icon_badge_1.IconBadge icon={lucide_react_1.LayoutDashboard}/>
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <title_form_1.TitleForm initialData={course} courseId={course.id}/>
            <description_form_1.DescriptionForm initialData={course} courseId={course.id}/>
            <image_form_1.ImageForm initialData={course} courseId={course.id}/>
            <category_form_1.CategoryForm initialData={course} courseId={course.id} options={categories.map((category) => ({
            label: category.name,
            value: category.id,
        }))}/>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <icon_badge_1.IconBadge icon={lucide_react_1.ListChecks}/>
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <chapters_form_1.ChaptersForm initialData={course} courseId={course.id}/>
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <icon_badge_1.IconBadge icon={lucide_react_1.CircleDollarSign}/>
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <price_form_1.PriceForm initialData={course} courseId={course.id}/>
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <icon_badge_1.IconBadge icon={lucide_react_1.File}/>
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <attachment_form_1.AttachmentForm initialData={course} courseId={course.id}/>
            </div>
          </div>
        </div>
      </div>
    </>);
};
exports.default = CourseIdPage;
