"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPlayer = void 0;
const mux_player_react_1 = __importDefault(require("@mux/mux-player-react"));
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const VideoPlayer = ({ chapterId, title, courseId, nextChapterId, playbackId, isLocked, completeOnEnd, }) => {
    const [isReady, setIsReady] = (0, react_1.useState)(false);
    return (<div className="relative aspect-video">
      {!isReady && !isLocked && (<div className="absolute inset-0 flex items-center  justify-center bg-slate-800">
          <lucide_react_1.Loader2 className="h-8 w-8 animate-spin text-secondary"/>
        </div>)}
      {isLocked && (<div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <lucide_react_1.Lock className="h-8 w-8"/>

          <p className=" text-sm">This chapter is locked</p>
        </div>)}
      {!isLocked && (<mux_player_react_1.default title={title} className={(0, utils_1.cn)(!isReady && "hidden")} onCanPlay={() => setIsReady(true)} onEnded={() => { }} autoPlay playbackId={playbackId}/>)}
    </div>);
};
exports.VideoPlayer = VideoPlayer;
