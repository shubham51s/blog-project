import React, { useState } from "react";

function DescriptionInput({ publication, setPublication }) {
  const [isfocus, setIsFocus] = useState(false);

  const handleValueChange = (e) => {
    const textarea = e.target;
    setPublication((prev) => ({ ...prev, description: textarea.value }));

    textarea.style.height = "auto"; // reset height
    textarea.style.height = textarea.scrollHeight + "px"; // adjust height
  };

  return (
    <div className="margin71 flex items-start">
      <div className="font-semibold relative padding81 w-[25%]">
        Description
        <span className="font-normal">*</span>
      </div>
      <div className="padding59 w-[75%]">
        <div className="padding85 height87" style={{ paddingTop: 0 }}>
          <textarea value={publication.description} onInput={(e) => handleValueChange(e)} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} maxLength={280} placeholder="Type a short description" rows={1} className={`w-full padding51 overflow-hidden m-0 p-0 outline-none transition-all duration-75 ease resize-none ${isfocus ? "bdr24" : "bdr23"}`} style={{ paddingTop: 0, borderTop: 0, borderInline: 0 }}></textarea>
        </div>

        <div className="color10 custom-fs-1">The description is a quick way to tell readers about your publication. It's short and appears on search results and publication preview cards. Max 280 characters.</div>
      </div>
    </div>
  );
}

export default DescriptionInput;
