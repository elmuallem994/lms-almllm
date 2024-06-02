"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaptersForm = void 0;
const z = __importStar(require("zod"));
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const form_1 = require("@/components/ui/form");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const input_1 = require("@/components/ui/input");
const chapters_list_1 = require("./chapters-list");
const formSchema = z.object({
    title: z.string().min(1),
});
const ChaptersForm = ({ initialData, courseId }) => {
    const [isCreating, setIsCreating] = (0, react_1.useState)(false);
    const [isUpdating, setIsUpdating] = (0, react_1.useState)(false);
    const toggleCreating = () => {
        setIsCreating((current) => !current);
    };
    const router = (0, navigation_1.useRouter)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            title: "",
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values) => {
        try {
            await axios_1.default.post(`/api/courses/${courseId}/chapters`, values);
            react_hot_toast_1.default.success("Chapter created");
            toggleCreating();
            router.refresh();
        }
        catch (error) {
            react_hot_toast_1.default.error("Something went wrong");
        }
    };
    const onRaorder = async (updateData) => {
        try {
            setIsUpdating(true);
            await axios_1.default.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData,
            });
            react_hot_toast_1.default.success("Chapters reordered");
            router.refresh();
        }
        catch {
            react_hot_toast_1.default.error("Something went wrong");
        }
        finally {
            setIsUpdating(false);
        }
    };
    const onEdit = (id) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    };
    return (<div className=" relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (<div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <lucide_react_1.Loader2 className="animate-spin h-6 w-6 text-sky-700"/>
        </div>)}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <button_1.Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (<>Cancel</>) : (<>
              <lucide_react_1.PlusCircle className="h-4 w-4 mr-2"/>
              Add a chapter
            </>)}
        </button_1.Button>
      </div>

      {isCreating && (<form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <form_1.FormField control={form.control} name="title" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormControl>
                    <input_1.Input disabled={isSubmitting} placeholder="e.g. 'Introduction to the course'" {...field}/>
                  </form_1.FormControl>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <button_1.Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </button_1.Button>
          </form>
        </form_1.Form>)}

      {!isCreating && (<div className={(0, utils_1.cn)("text-sm mt-2", !initialData.chapters.length && "text-slate-500 italic")}>
          {!initialData.chapters.length && "No chapters"}
          <chapters_list_1.ChaptersList onEdit={onEdit} onReorder={onRaorder} items={initialData.chapters || []}/>
        </div>)}
      {!isCreating && (<p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>)}
    </div>);
};
exports.ChaptersForm = ChaptersForm;
