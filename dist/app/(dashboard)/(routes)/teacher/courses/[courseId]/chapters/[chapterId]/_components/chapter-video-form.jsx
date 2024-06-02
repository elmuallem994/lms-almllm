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
exports.ChapterVideoForm = void 0;
const z = __importStar(require("zod"));
const axios_1 = __importDefault(require("axios"));
const mux_player_react_1 = __importDefault(require("@mux/mux-player-react"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const file_upload_1 = require("@/components/file-upload");
const formSchema = z.object({
    videoUrl: z.string().min(1),
});
const ChapterVideoForm = ({ initialData, courseId, chapterId, }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = (0, navigation_1.useRouter)();
    const onSubmit = async (values) => {
        try {
            await axios_1.default.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            react_hot_toast_1.default.success("Chapter updated");
            toggleEdit();
            router.refresh();
        }
        catch (error) {
            react_hot_toast_1.default.error("Something went wrong");
        }
    };
    return (<div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <button_1.Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (<>
              <lucide_react_1.PlusCircle className="h-4 w-4 mr-2"/>
              Add a video
            </>)}
          {!isEditing && initialData.videoUrl && (<>
              <lucide_react_1.Pencil className="h-4 w-4 mr-2"/>
              Edit video
            </>)}
        </button_1.Button>
      </div>

      {!isEditing &&
            (!initialData.videoUrl ? (<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <lucide_react_1.Video className="h-10 w-10 text-slate-50 0"/>
          </div>) : (<div className="relative aspect-video mt-2">
            <mux_player_react_1.default playbackId={initialData?.muxData?.playbackId || ""}/>
          </div>))}
      {isEditing && (<div>
          <file_upload_1.FileUpload endpoint="chapterVideo" onChange={(url) => {
                if (url) {
                    onSubmit({ videoUrl: url });
                }
            }}/>
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>)}
      {initialData.videoUrl && !isEditing && (<div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear
        </div>)}
    </div>);
};
exports.ChapterVideoForm = ChapterVideoForm;
