import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Checkbox from "@mui/material/Checkbox";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";

function ReportBlogModal({ isReportModal, blog, handleCloseReportModal }) {
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isBlockUser, setIsBlockUser] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleOnChange = (value) => {
    setReportReason(value);
  };

  const checkIsSelected = (value) => {
    return reportReason === value;
  };

  const handleReportStory = async () => {
    console.log("selected value: ", reportReason, " isblock user: ", isBlockUser);
    setIsLoading(true);
    try {
      const params = {
        blogId: blog._id,
        reason: reportReason,
        blockAuthor: isBlockUser,
      };
      const response = await requestHandler("/blog/report", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        showToast(result?.message || "Successfully reported post.");
        handleCloseReportModal();
      } else {
        showToast(result?.message || "Some error occured.");
      }

      console.log("result: ", result);
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isReportModal}
      onClose={handleCloseReportModal}
      PaperProps={{
        sx: {
          maxWidth: "none",
          width: "auto",
          margin: 0,
          boxShadow: "none",
          backgroundImage: "none",
          overflow: "visible",
        },
      }}
    >
      <div className="relative">
        <div className="custom-bg-8 height79 width80 boxShadow6 padding-17 flex flex-col justify-between items-center border-radius-3">
          <div className="grow shrink-0 basis-auto max-width-2 padding77 padding78 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="height80 flex flex-col">
                <div className="padding79 flex justify-center" style={{ paddingTop: 0 }}>
                  <h2 className="line21 font15 font-semibold color-3 m-0">Report Story</h2>
                </div>

                <div className="width81 text-left">
                  <div className="flex flex-col custom-gap-2">
                    <div className="flex items-center">
                      <div className="relative grow-0 shrink-0 basis-auto margin-34 width72 aspect-square flex items-stretch" style={{ marginLeft: 0, marginBlock: 0 }}>
                        <Radio className="w-full h-full" checked={checkIsSelected("HARASSMENT")} onChange={() => handleOnChange("HARASSMENT")} />
                      </div>
                      <div>
                        <p onClick={() => handleOnChange("HARASSMENT")} className="line-h-8 custom-fs-1 color-3 font-medium m-0 p-0 cursor-default">
                          Harassment
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="relative grow-0 shrink-0 basis-auto margin-34 width72 aspect-square flex items-stretch" style={{ marginLeft: 0, marginBlock: 0 }}>
                        <Radio className="w-full h-full" checked={checkIsSelected("RULES_VIOLATION")} onChange={() => handleOnChange("RULES_VIOLATION")} />
                      </div>
                      <div>
                        <p onClick={() => handleOnChange("RULES_VIOLATION")} className="line-h-8 custom-fs-1 color-3 font-medium m-0 p-0 cursor-default">
                          Rules Violation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="relative grow-0 shrink-0 basis-auto margin-34 width72 aspect-square flex items-stretch" style={{ marginLeft: 0, marginBlock: 0 }}>
                        <Radio className="w-full h-full" checked={checkIsSelected("SPAM")} onChange={() => handleOnChange("SPAM")} />
                      </div>
                      <div>
                        <p onClick={() => handleOnChange("SPAM")} className="line-h-8 custom-fs-1 color-3 font-medium m-0 p-0 cursor-default">
                          Spam
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="relative grow-0 shrink-0 basis-auto margin-34 width72 aspect-square flex items-stretch" style={{ marginLeft: 0, marginBlock: 0 }}>
                        <Radio className="w-full h-full" checked={checkIsSelected("AI_GENERATED")} onChange={() => handleOnChange("AI_GENERATED")} />
                      </div>
                      <div>
                        <p onClick={() => handleOnChange("AI_GENERATED")} className="line-h-8 custom-fs-1 color-3 font-medium m-0 p-0 cursor-default">
                          AI-generated
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-start my-auto">
                  <div className="relative grow-0 shrink-0 basis-auto margin-34 width72 aspect-square flex items-stretch" style={{ marginLeft: 0, marginBlock: 0 }}>
                    <Checkbox checked={isBlockUser} onChange={(e) => setIsBlockUser(e.target.checked)} className="w-full h-full" />
                  </div>
                  <div>
                    <p onClick={() => setIsBlockUser(!isBlockUser)} className="line-h-8 custom-fs-1 color-3 font-medium m-0 p-0 cursor-default">
                      Also block the author of this story
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <button onClick={handleCloseReportModal} className="border-radius-9 bdr-7 text-center box-border color-3 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">
                  Cancel
                </button>
                <div className="padding50" style={{ paddingRight: 0 }}>
                  <button disabled={isLoading || !reportReason} onClick={handleReportStory} className={`flex items-center custom-gap-3 bdr-3 border-[#b63636] bg-[#b63636] border-radius-9 text-center text-white custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 transition-all duration-75 linear ${isLoading || !reportReason ? "cursor-default opacity-[0.5]" : "cursor-pointer opacity-[0.9] hover:opacity-100"}`}>
                    {isLoading && <div className="width83 aspect-square rounded-full border-2 border-white border-t-0 border-r-0 animate-spin"></div>} Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute topRight2">
          <button onClick={handleCloseReportModal} className="cursor-pointer m-0 p-0 color-3 opacity-50 transition-all duration-75 linear hover:opacity-100">
            <div className="width58 aspect-square">
              <IoMdClose className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default ReportBlogModal;
