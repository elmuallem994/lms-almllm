"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const get_chapter_1 = require("@/actions/get-chapter");
const banner_1 = require("@/components/banner");
const video_player_1 = require("./_components/video-player");
const ChapterIdPage = async ({ params, }) => {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase, } = await (0, get_chapter_1.getChapter)({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    });
    if (!chapter || !course) {
        return (0, navigation_1.redirect)("/");
    }
    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;
    return (<div>
      {userProgress?.isCompleted && (<banner_1.Banner variant="success" label="You already completed this chapter."/>)}
      {isLocked && (<banner_1.Banner variant="warning" label="You need to purchase this course to watch this chapter."/>)}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <video_player_1.VideoPlayer chapterId={params.chapterId} title={chapter.title} courseId={params.courseId} nextChapterId={nextChapter?.id} playbackId={muxData?.playbackId} isLocked={isLocked} completeOnEnd={completeOnEnd}/>
        </div>
      </div>
    </div>);
};
exports.default = ChapterIdPage;
