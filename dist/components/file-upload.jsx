"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const uploadthing_1 = require("@/lib/uploadthing");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const FileUpload = ({ onChange, endpoint }) => {
    return (<uploadthing_1.UploadDropzone endpoint={endpoint} onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
        }} onUploadError={(error) => {
            react_hot_toast_1.default.error(`${error?.message}`);
        }}/>);
};
exports.FileUpload = FileUpload;
