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
exports.AttachmentForm = void 0;
const z = __importStar(require("zod"));
const axios_1 = __importDefault(require("axios"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const file_upload_1 = require("@/components/file-upload");
const formSchema = z.object({
    url: z.string().min(1),
});
const AttachmentForm = ({ initialData, courseId, }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [deletingId, setDeletingId] = (0, react_1.useState)(null);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = (0, navigation_1.useRouter)();
    const onSubmit = async (values) => {
        try {
            await axios_1.default.post(`/api/courses/${courseId}/attachments`, values);
            react_hot_toast_1.default.success("Course updated");
            toggleEdit();
            router.refresh();
        }
        catch (error) {
            react_hot_toast_1.default.error("Something went wrong");
        }
    };
    const onDelete = async (id) => {
        try {
            setDeletingId(id);
            await axios_1.default.delete(`/api/courses/${courseId}/attachments/${id}`);
            react_hot_toast_1.default.success("Attachment deleted");
            router.refresh();
        }
        catch (error) {
            react_hot_toast_1.default.error("Something went wrong");
        }
        finally {
            setDeletingId(null);
        }
    };
    return (<div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <button_1.Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (<>
              <lucide_react_1.PlusCircle className="h-4 w-4 mr-2"/>
              Add an file
            </>)}
        </button_1.Button>
      </div>

      {!isEditing && (<>
          {initialData.attachments.length === 0 && (<p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>)}
          {initialData.attachments.length > 0 && (<div className="space-y-2">
              {initialData.attachments.map((attachment) => (<div key={attachment.id} className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                  <lucide_react_1.File className="h-4 w-4 mr-2 flex-shrink-0"/>
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (<div>
                      <lucide_react_1.Loader2 className="h-4 w-4 animate-spin"/>
                    </div>)}

                  {deletingId !== attachment.id && (<button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
                      <lucide_react_1.X className="h-4 w-4"/>
                    </button>)}
                </div>))}
            </div>)}
        </>)}
      {isEditing && (<div>
          <file_upload_1.FileUpload endpoint="courseAttachment" onChange={(url) => {
                if (url) {
                    onSubmit({ url: url });
                }
            }}/>
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>)}
    </div>);
};
exports.AttachmentForm = AttachmentForm;
