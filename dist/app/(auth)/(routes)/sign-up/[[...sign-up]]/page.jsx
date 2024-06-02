"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nextjs_1 = require("@clerk/nextjs");
function Page() {
    return <nextjs_1.SignUp path="/sign-up"/>;
}
exports.default = Page;
