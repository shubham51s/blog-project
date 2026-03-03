import React from "react";

function EmailSection() {
  return (
    <button className="w-full flex items-center justify-between text-left margin-14 color-4 custom-fs-1 cursor-pointer p-0" style={{ marginInline: 0 }}>
      <div className="flex w-full items-baseline justify-between">
        <div className="flex items-baseline">
          <div className="grow shrink basis-0 my-auto">
            <span className="color-3 custom-fs-1 line20 font-normal">Email address</span>
          </div>
        </div>

        <div className="inline-block margin-14" style={{ marginRight: 0, marginBlock: 0 }}>
          <span className="inline-block width-28 text-right align-bottom truncate">shubhamsolat9@gmail.com</span>
        </div>
      </div>
    </button>
  );
}

export default EmailSection;
