import React, { useRef, useState } from "react";
import { BsCamera } from "react-icons/bs";
import { useImageUpload } from "../../../../hooks/upload";

function ImageInput({ publication, setPublication }) {
  const { uploadImage } = useImageUpload();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadImgBtnClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setIsLoading(true);
      try {
        const options = {
          maxSizeMB: 0.8,
          maxWidthOrHeight: 512,
          useWebWorker: true,
        };
        // if (user.public_id) deleteImages([user.public_id]);
        const result = await uploadImage(file, options);

        if (result?.status === 200) {
          setPublication((prev) => ({ ...prev, profileImg: result.data.url, public_id: result.data.public_id }));
        } else {
          showToast("Failed to upload image.");
          setPublication((prev) => ({ ...prev, profileImg: "", public_id: "" }));
        }
      } catch (err) {
        showToast("Failed to upload image.");
        setPublication((prev) => ({ ...prev, profileImg: "", public_id: "" }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="margin71 flex items-start">
      <div className="font-semibold relative padding81 w-[25%]">
        Publication avatar
        <span className="font-normal">*</span>
      </div>

      <div className="padding59 w-[41.66666667%]">
        {!publication.profileImg && (
          <button onClick={handleUploadImgBtnClick} disabled={isLoading} className="font-normal font-9 p-0 cursor-pointer color11 transition-all duration-75 ease opacity-100 hover:opacity-[0.95]">
            Add avatar
          </button>
        )}

        {publication.profileImg && (
          <button onClick={handleUploadImgBtnClick} disabled={isLoading} className="font-normal font-9 p-0 cursor-pointer color11 transition-all duration-75 ease opacity-100 hover:opacity-[0.95]">
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
        {!publication.profileImg && (
          <button onClick={handleUploadImgBtnClick} disabled={isLoading} className="p-0 text-left align-baseline cursor-pointer group">
            <div className="bdr25 padding44 border-radius11">
              <div className="width-4 aspect-square color-4 opacity-[0.65] transition-all duration-75 ease group-hover:opacity-100">
                <BsCamera className="w-full h-full" />
              </div>
            </div>
          </button>
        )}

        {publication.profileImg && (
          <div>
            <img loading="lazy" src={publication.profileImg} className="width88 aspect-square object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageInput;
