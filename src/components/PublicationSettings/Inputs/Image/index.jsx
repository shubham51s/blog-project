import React, { useRef, useState } from "react";
import { BsCamera } from "react-icons/bs";

function ImageInput({ publication, setPublication }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(publication.profileImg);

  const handleUploadImgBtnClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const blogUrl = URL.createObjectURL(file);
      setPreview(blogUrl);
    }
  };

  return (
    <div className="margin71 flex items-start">
      <div className="font-semibold relative padding81 w-[25%]">
        Publication avatar
        <span className="font-normal">*</span>
      </div>

      <div className="padding59 w-[41.66666667%]">
        {!preview && (
          <button onClick={handleUploadImgBtnClick} className="font-normal font-9 p-0 cursor-pointer color11 transition-all duration-75 ease opacity-100 hover:opacity-[0.95]">
            Add avatar
          </button>
        )}

        {preview && (
          <button onClick={handleUploadImgBtnClick} className="font-normal font-9 p-0 cursor-pointer color11 transition-all duration-75 ease opacity-100 hover:opacity-[0.95]">
            Change avatar
          </button>
        )}
        <div className="color10 custom-fs-1 leading-[1.4]">The avatar appears with your stories across Medium.</div>
        <div className="color10 custom-fs-1 leading-[1.4]">
          <span className="font-semibold">Recommended size:</span> Square, at least 1000 pixels per side
        </div>
        <div className="color10 custom-fs-1 leading-[1.4]">
          <span className="font-semibold">File type:</span> JPG, PNG
        </div>
      </div>

      <div className="padding59 w-[33.33333333%]">
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
        {!preview && (
          <button onClick={handleUploadImgBtnClick} className="p-0 text-left align-baseline cursor-pointer group">
            <div className="bdr25 padding44 border-radius11">
              <div className="width-4 aspect-square color-4 opacity-[0.65] transition-all duration-75 ease group-hover:opacity-100">
                <BsCamera className="w-full h-full" />
              </div>
            </div>
          </button>
        )}

        {preview && (
          <div>
            <img src={preview} className="width88 aspect-square object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageInput;
