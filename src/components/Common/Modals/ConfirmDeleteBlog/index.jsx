import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { showToast } from "../../../../utils/toaster";

function DeleteBlogModal({ isDeleteModal, handleCloseDeleteModal, blog, handleAfterBlogDelet = () => {} }) {
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(false);

  const deleteBlog = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/blogs/delete/${blog._id}`, "DELETE");
      const result = await response.json();

      if (response?.status === 200) {
        showToast("Blog deleted successfully");
        handleAfterBlogDelet();
      } else {
        if (response?.status < 500) {
          showToast(result?.message || "Some error occured");
        } else showToast("Some error occured", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isDeleteModal}
      onClose={handleCloseDeleteModal}
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
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <div className="custom-bg-8 height79 width80 boxShadow6 padding-17 flex flex-col justify-between items-center border-radius-3">
          <div className="grow shrink-0 basis-auto max-width-2 padding77 padding78 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="padding-20" style={{ paddingTop: 0 }}>
                <h2 className="line21 font15 font-semibold color-3 m-0">Delete story</h2>
              </div>
              <div className="padding61">
                <p className="line-h-8 font-10 color-4 font-normal m-0">Deletion is not reversible, and the story will be completely deleted.</p>
              </div>
              <div className="w-full flex justify-center">
                <button onClick={handleCloseDeleteModal} className="border-radius-9 bdr-7 text-center box-border color-3 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">
                  Cancel
                </button>
                <div className="padding50" style={{ paddingRight: 0 }}>
                  <button onClick={deleteBlog} disabled={isLoading} className={`flex items-center custom-gap-3 bdr-3 border-[#c94a4a] bg-[#c94a4a] border-radius-9 text-center color-2 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 transition-all duration-75 linear ${isLoading ? "cursor-default opacity-[0.5]" : "cursor-pointer opacity-[0.9] hover:opacity-100"}`}>
                    {isLoading && <div className="width83 aspect-square rounded-full border-2 border-white border-t-0 border-r-0 animate-spin"></div>}Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute topRight2">
          <button onClick={handleCloseDeleteModal} className="cursor-pointer m-0 p-0 color-3 opacity-50 transition-all duration-75 linear hover:opacity-100">
            <div className="width58 aspect-square">
              <IoMdClose className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteBlogModal;
