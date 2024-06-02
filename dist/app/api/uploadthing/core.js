"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ourFileRouter = void 0;
const server_1 = require("@clerk/nextjs/server");
const next_1 = require("uploadthing/next");
const f = (0, next_1.createUploadthing)();
const handleAuth = () => {
    const { userId } = (0, server_1.auth)();
    if (!userId)
        throw new Error("Unauthorized");
    return { userId };
};
exports.ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
};
