import React, { useState } from "react";

function List() {
  const [isFocused, setIsFocused] = useState(false);
  const [note, setNote] = useState("");

  const handleFocusToggle = (isFocus) => {
    setIsFocused(isFocus);
  };

  return (
    <div className="margin54">
      <div className="flex justify-center">
        <div className="min-w-0 w-full max-width-2 margin-12">
          {/* note */}
          <div className="flex items-start justify-between margin-17" style={{ marginTop: 0 }}>
            <div className={`w-[80%] max-w-[80%] padding-17 italic font-4 color-4 ${isFocused ? "bdr20" : "bdr19"}`} style={{ paddingRight: 0, paddingBlock: 0, borderRight: 0, borderBlock: 0 }}>
              <span className="color-3 custom-fs-1 line20 font-normal">
                <div className="w-full flex flex-col">
                  <div className={`w-full flex padding-28 custom-px-2 bg-10 border-radius-3 ${isFocused ? "bdr-7" : "bdr16"}`}>
                    <input onFocus={() => handleFocusToggle(true)} onBlur={() => handleFocusToggle(false)} placeholder={isFocused ? "Write a brief description" : "Add a note..."} type="text" className="grow shrink w-full p-0 outline-0 border-0 m-0 resize-none" />
                  </div>
                </div>
              </span>
            </div>
            {/* save buttons */}
            <div className=""></div>
          </div>

          {/* blog */}
          <article className=""></article>
        </div>
      </div>
    </div>
  );
}

export default List;
