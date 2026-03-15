import React from "react";

function Header({ handleCreateNewPublicationBtnClick, isLoading }) {
  return (
    <header className="block font-3 bg15">
      <div className="mx-auto padding59 width87">
        <div className="text-left padding-2 mx-auto">
          <div className="flex items-center">
            <h1 className="font-semibold font17 leading-tight color11 grow shrink basis-auto m-0">New publication</h1>
            <div className="text-right margin-18 grow-0 shrink-0 basis-auto" style={{ marginRight: 0 }}>
              <span className="custom-fs-1 color10 align-middle text-right margin-34" style={{ marginLeft: 0, marginBlock: 0 }}>
                Step 1 of 2
              </span>
              <button onClick={handleCreateNewPublicationBtnClick} disabled={isLoading} className="inline-block align-middle height68 line-h11 padding-7 bdr23 border-radius-9 bdr17-hover transition-all duration-300 ease color-3 custom-fs-1 text-center cursor-pointer whitespace-nowrap font-normal opacity-[0.75] hover:opacity-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
