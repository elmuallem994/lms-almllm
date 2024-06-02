"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterActions = void 0;
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const confirm_modal_1 = require("@/components/modals/confirm-modal");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const axios_1 = __importDefault(require("axios"));
const navigation_1 = require("next/navigation");
const ChapterActions = ({ disabled, courseId, chapterId, isPublished, }) => {
    const router = (0, navigation_1.useRouter)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const onClick = async () => {
        try {
            setIsLoading(true);
            if (isPublished) {
                await axios_1.default.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                react_hot_toast_1.default.success("Chapter unpublished");
            }
            else {
                await axios_1.default.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                react_hot_toast_1.default.success("Chapter published");
            }
            router.refresh();
        }
        catch (error) {
            react_hot_toast_1.default.error("Something went wrong");
        }
        finally {
            setIsLoading(false);
        }
    };
    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios_1.default.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
            react_hot_toast_1.default.success("Chapter deleted");
            router.refresh();
            router.push(`/teacher/courses/${courseId}`);
        }
        catch (error) {
            react_hot_toast_1.default.error("Something went wrong");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<div className="flex items-center gap-x-2">
      <button_1.Button onClick={onClick} disabled={disabled || isLoading} variant="outline" size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </button_1.Button>
      <confirm_modal_1.ConfirmModal onConfirm={onDelete}>
        <button_1.Button size="sm" disabled={isLoading}>
          <lucide_react_1.Trash className="h-4 w-4"/>
        </button_1.Button>
      </confirm_modal_1.ConfirmModal>
    </div>);
};
exports.ChapterActions = ChapterActions;
