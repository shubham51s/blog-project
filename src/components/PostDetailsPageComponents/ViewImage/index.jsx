import React, { useEffect } from "react";

function ViewFullImage({ img, setIsShowFullImg }) {
  // add on scroll event only when full size image is open (to close this full size image on scroll) and remove listener when full size image is closed
  const handleOnScroll = () => {
    handleCloseFullImg();
  };

  const handleCloseFullImg = () => {
    setIsShowFullImg(false);
    window.removeEventListener("scroll", handleOnScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  return (
    <div onClick={() => handleCloseFullImg()} className="w-screen h-screen max-w-screen max-h-screen fixed inset-0 z-[999] flex items-center justify-center custom-bg-4 select-none pointer-events-auto">
      <img loading="lazy" onClick={() => handleCloseFullImg()} src={img} className="h-full max-w-full max-h-full cursor-zoom-out" />
    </div>
  );
}

export default ViewFullImage;
