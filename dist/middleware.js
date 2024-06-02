"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const server_1 = require("@clerk/nextjs/server");
exports.default = (0, server_1.clerkMiddleware)();
exports.config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
