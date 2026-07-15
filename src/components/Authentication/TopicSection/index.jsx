import React from "react";
import infinity from "../../../assets/images/infinity.png";

function TopicInputSection({ handleCloseTopicsTab, handleFinishSignuBtnClick }) {
  return (
    <>
      <div className={`w-full h-full overflow-y-auto flex items-center transition-all ease-in-out duration-200 absolute ${!isLoginTabActive && isTopicsTabActive ? "translate-x-0 visible pointer-events-auto" : "translate-x-full invisible pointer-events-none "}`}>
        <div className="absolute z-[999] top-0 left-0 padding-6 bg-transparent">
          <button onClick={handleCloseTopicsTab} className="width-13 aspect-square cursor-pointer transition-all duration-200 linear opacity-75 hover:opacity-100" disabled={isLoading}>
            <IoMdArrowRoundBack className="w-full h-full" />
          </button>
        </div>

        <div className="padding-18 padding60 color-3 w-full h-full flex flex-col items-center justify-start">
          <h3 className="flex items-center justify-center letter-spacing-4 line-h-5 font-7 color-6 font-medium select-none padding-37" style={{ marginTop: 0, marginInline: 0, paddingTop: 0, paddingInline: 0 }}>
            StoryNest
          </h3>
          <div className="w-full padding-37"></div>
          <div className="padding-37 flex items-center justify-center w-full">
            <img loading="lazy" src={infinity} className="w-24 aspect-square" />
          </div>

          <div className="padding-37 flex items-center justify-center w-full line-h-5 font-3 font-normal" style={{ paddingBottom: 0 }}>
            What are you interested in?
          </div>

          <div className="padding-37 flex items-center justify-center w-full line-h-8 font13 font-normal" style={{ paddingBottom: 0 }}>
            Choose three or more.
          </div>
          <div className="w-full padding-37"></div>
          <div className="padding-37 w-full font13 font-normal" style={{ paddingBottom: 0 }}>
            <Select value={selectedTopic} onChange={handleTopicSelectionChange} isMulti name="colors" options={topics} className="basic-multi-select custom-select box-border bg-transparent" classNamePrefix="select" placeholder="Select a topic..." />
          </div>

          <div className="height-2 margin-8 flex items-center w-full justify-center shrink-0" style={{ marginInline: 0, marginBottom: 0 }}>
            <button onClick={handleFinishSignuBtnClick} disabled={isLoading || selectedTopic.length < 3} className={`h-full w-full flex items-center justify-center custom-gap-3 custom-bg-7 font-normal color-5 font-10 rounded-full transition-all linear duration-200 ${selectedTopic.length < 3 ? "opacity-[0.4]" : "opacity-75 cursor-pointer hover:opacity-100"}`}>
              {isLoading && <CircularProgress size={22} />}
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopicInputSection;
