import React, { useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { useNavigate } from "react-router-dom";
import SubmitBlogModal from "../../../../Common/Modals/SubmitBlog";
import { showToast } from "../../../../../utils/toaster";
import { useRequestHandler } from "../../../../../hooks/requestHandler";

function ActionBtn({ blog, setBlog }) {
  const { requestHandler } = useRequestHandler();
  const navigate = useNavigate();
  const [isShowSubmitModal, setIsShowSubmitModal] = useState(false);
  const [tabNo, setTabNo] = useState(0);
  const [open, setOpen] = useState(false);
  const [loaders, setLoaders] = useState({
    delete: false,
  });

  const handlePublishBlog = (id) => {
    setTabNo(id);
    setIsShowSubmitModal(true);
    setOpen(false);
  };

  const deleteDraft = async () => {
    setLoaders((prev) => ({ ...prev, delete: true }));
    try {
      const response = await requestHandler(`/draft/delete/${blog._id}`, "DELETE");
      const result = await response.json();

      if (response?.status === 200) {
        showToast("Draft deleted successfully");
        setBlog(null);
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setLoaders((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger className="cursor-pointer m-0 p-0 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100">
          <div className="width-13 aspect-square">
            <MdMoreHoriz className="w-full h-full" />
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="bottom" className="z-[999]" onClick={(e) => e.stopPropagation()} align="middle" sideOffset={1}>
            <div className="border-radius-3 overflow-hidden boxShadow11 custom-bg-8 margin-35" style={{ marginLeft: 0, marginBlock: 0 }}>
              <ul className="width71 custom-px-2 flex flex-col items-stretch list-none px-0 font-medium">
                <li onClick={() => navigate(`/p/${blog._id}/edit`)} className="custom-px-2 padding59 custom-fs-1 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100 font-normal">
                  <span className="cursor-pointer m-0 p-0">Edit story</span>
                </li>
                <li onClick={() => handlePublishBlog(1)} className="custom-px-2 padding59 custom-fs-1 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100 font-normal">
                  <span className="cursor-pointer m-0 p-0">Publish story</span>
                </li>
                <li onClick={() => handlePublishBlog(0)} className="custom-px-2 padding59 custom-fs-1 color-3 opacity-[0.85] transition-all duration-200 linear hover:opacity-100 font-normal">
                  <span className="cursor-pointer m-0 p-0">Submit to publication</span>
                </li>
                <li className="custom-px-2">
                  <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                </li>
                <li className="custom-px-2 padding59 custom-fs-1 text-[#c94a4a] transition-all duration-200 linear hover:text-[#b63636] font-normal">
                  <button onClick={deleteDraft} disabled={loaders.delete}>
                    <span className="cursor-pointer m-0 p-0">Delete story</span>
                  </button>
                </li>
              </ul>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {isShowSubmitModal && <SubmitBlogModal id={blog._id} tabNo={tabNo} setIsShowSubmitModal={setIsShowSubmitModal} edited={true} />}
    </>
  );
}

export default ActionBtn;
