import React, { useRef, useState } from "react";
import { createSlug } from "../../../../utils/common";

function NameInput({ publication, setPublication }) {
  const rootUrl = window.location.origin;
  const [isfocus, setIsFocus] = useState(false);
  const [namePreview, setNamePreview] = useState(publication.slug);
  const previewTimeout = useRef(null);

  const handleValueChange = (e) => {
    const textarea = e.target;
    setPublication((prev) => ({ ...prev, name: textarea.value }));

    textarea.style.height = "auto"; // reset height
    textarea.style.height = textarea.scrollHeight + "px"; // adjust height

    if (previewTimeout.current) clearTimeout(previewTimeout.current);
    previewTimeout.current = setTimeout(() => {
      setNamePreview(createSlug(textarea.value));
    }, 500);
  };

  return (
    <div className="margin71 flex items-start">
      <div className="font-semibold relative padding81 w-[25%]">
        Name
        <span className="font-normal">*</span>
      </div>
      <div className="padding59 w-[75%]">
        <div className="padding85 height87" style={{ paddingTop: 0 }}>
          <textarea value={publication.name} onInput={(e) => handleValueChange(e)} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} maxLength={140} placeholder="Type your publication's name" rows={1} className={`w-full padding51 overflow-hidden m-0 p-0 outline-none transition-all duration-75 ease resize-none ${isfocus ? "bdr24" : "bdr23"}`} style={{ paddingTop: 0, borderTop: 0, borderInline: 0 }}></textarea>
        </div>

        <div className="color10 custom-fs-1">
          Link:{" "}
          <span>
            {rootUrl?.split("//")?.[1]}/publication/{namePreview ? namePreview : "..."}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NameInput;
