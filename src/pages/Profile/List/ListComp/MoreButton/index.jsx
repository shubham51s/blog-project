import React, { useContext, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { UserContext } from "../../../../../context/userContext";
import { Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Checkbox from "@mui/material/Checkbox";

function MoreButton({ user }) {
  const listNameMaxLength = 60;
  const listDescriptionMaxLength = 280;
  const { userInfo } = useContext(UserContext);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isPrivateListModal, setIsPrivateListModal] = useState(false);
  const [isEditListModal, setIsEditListModal] = useState(false);
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [isListPrivate, setIsListPrivate] = useState(true);

  const handleCloseDeleteModal = () => {
    setIsDeleteModal(false);
  };

  const handleShowDeleteModal = () => {
    setIsDeleteModal(true);
  };

  const handleClosePrivateListModal = () => {
    setIsPrivateListModal(false);
  };

  const handleShowPrivateListModal = () => {
    setIsPrivateListModal(true);
  };

  const handleCloseEditListModal = () => {
    setIsEditListModal(false);
  };

  const handleShowEditListModal = () => {
    setListName("default name");
    setListDescription("default description");
    setIsListPrivate(false);

    setIsEditListModal(true);
  };

  return (
    <>
      {user && userInfo && (
        <div>
          <Popover.Root>
            <Popover.Trigger className="custom-px-2 padding-36 cursor-pointer opacity-[0.75] transition-all duration-200 linear hover:opacity-100" title="More">
              <div className="width-13 aspect-square color-3">
                <MdOutlineMoreHoriz className="w-full h-full" />
              </div>
            </Popover.Trigger>
            <Popover.Content side="bottom" className="z-[98700] box-border border-radius-3 box-shadow-4" align="middle" sideOffset={1}>
              <div className="custom-bg-8 border-radius-3 overflow-hidden">
                {user._id === userInfo._id && (
                  <ul className="flex flex-col items-stretch custom-px-2 list-none m-0">
                    <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                      <button className="cursor-pointer m-0 p-0">
                        <div className="inline-block">Copy link</div>
                      </button>
                    </li>
                    <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                      <button onClick={handleShowEditListModal} className="cursor-pointer m-0 p-0">
                        <div className="inline-block">Edit list info</div>
                      </button>
                    </li>
                    <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                      <button className="cursor-pointer m-0 p-0">
                        <div className="inline-block">Remove items</div>
                      </button>
                    </li>
                    <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                      <button onClick={handleShowPrivateListModal} className="cursor-pointer m-0 p-0">
                        <div className="inline-block">Make list private</div>
                      </button>
                    </li>
                    <li className="custom-px-2 padding59 text-[#c94a4a] opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                      <button onClick={handleShowDeleteModal} className="cursor-pointer m-0 p-0">
                        <div className="inline-block">Delete list</div>
                      </button>
                    </li>
                  </ul>
                )}
                {user._id !== userInfo._id && (
                  <ul className="flex flex-col items-stretch custom-px-2 list-none m-0">
                    <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                      <button className="cursor-pointer m-0 p-0">
                        <div className="inline-block">Copy link</div>
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      )}

      {/* confirm delete list modal */}
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
        <div className="relative">
          <div className="custom-bg-8 height79 width80 boxShadow6 padding-17 flex flex-col justify-between items-center border-radius-3">
            <div className="grow shrink-0 basis-auto max-width-2 padding77 padding78 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <div className="padding-20" style={{ paddingTop: 0 }}>
                  <h2 className="line21 font15 font-semibold color-3 m-0">Delete list</h2>
                </div>
                <div className="padding61">
                  <p className="line-h-8 font-10 color-4 font-normal m-0">Deleting this list {"(Reading list)"} will remove it from Your library. If others have saved this list, it will also be deleted and removed from their library. Deleting this list will not delete any stories in it.</p>
                </div>
                <div className="w-full flex justify-center">
                  <button onClick={handleCloseDeleteModal} className="border-radius-9 bdr-7 text-center box-border color-3 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">
                    Cancel
                  </button>
                  <div className="padding50" style={{ paddingRight: 0 }}>
                    <button className="bdr-3 border-[#c94a4a] bg-[#c94a4a] border-radius-9 text-center color-2 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">Delete</button>
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

      {/* confirm make private list modal */}
      <Dialog
        open={isPrivateListModal}
        onClose={handleClosePrivateListModal}
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
                <div className="padding-20" style={{ paddingTop: 0 }}>
                  <h2 className="line21 font15 font-semibold color-3 m-0">Make list private</h2>
                </div>
                <div className="padding61">
                  <p className="line-h-8 font-10 color-4 font-normal m-0">If others have saved this list {"(Reading list)"}, it will be removed from their library.</p>
                </div>
                <div className="w-full flex justify-center">
                  <button onClick={handleClosePrivateListModal} className="border-radius-9 bdr-7 text-center box-border color-3 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">
                    Cancel
                  </button>
                  <div className="padding50" style={{ paddingRight: 0 }}>
                    <button className="bdr-3 border-[#1a8917] bg-[#1a8917] border-radius-9 text-center text-white custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">Make private</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute topRight2">
            <button onClick={handleClosePrivateListModal} className="cursor-pointer m-0 p-0 color-3 opacity-50 transition-all duration-75 linear hover:opacity-100">
              <div className="width58 aspect-square">
                <IoMdClose className="w-full h-full" />
              </div>
            </button>
          </div>
        </div>
      </Dialog>

      {/* edit list details */}
      <Dialog
        open={isEditListModal}
        onClose={handleCloseEditListModal}
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
                <div className="height80">
                  <div className="padding79" style={{ paddingTop: 0 }}>
                    <h2 className="line21 font15 font-semibold color-3 m-0">Edit list</h2>
                  </div>

                  <div className="width81 text-left">
                    <div className="padding-14" style={{ paddingTop: 0, paddingInline: 0 }}>
                      <span className="color-3 custom-fs-1 line20 font-normal">
                        <div className="w-full flex flex-col">
                          <div className="custom-px-2 padding-28 bdr-5 border-radius-3 w-full flex bg-11">
                            <input value={listName} onChange={(e) => setListName(e.target.value)} maxLength={listNameMaxLength} type="text" className="p-0 grow shrink basis-0 outline-0 border-0 w-full m-0 bg-11" placeholder="Give it a name" />
                          </div>
                          <div className="margin-16 flex justify-end" style={{ marginBottom: 0, marginInline: 0 }}>
                            <p className="font-4 color-4 line20 font-normal m-0">
                              <span className="color16">{listName.length}</span>/{listNameMaxLength}
                            </p>
                          </div>
                        </div>
                      </span>
                    </div>

                    <div className="padding-14" style={{ paddingTop: 0, paddingInline: 0 }}>
                      <div className="height81 overflow-auto">
                        <span className="color-3 custom-fs-1 line20 font-normal">
                          <div className="w-full flex flex-col">
                            <div className="custom-px-2 padding-28 bdr-5 border-radius-3 w-full flex bg-11">
                              <textarea value={listDescription} onChange={(e) => setListDescription(e.target.value)} maxLength={listDescriptionMaxLength} type="text" className="p-0 grow shrink basis-0 outline-0 border-0 w-full m-0 bg-11 resize-none" placeholder="Description" />
                            </div>
                            <div className="margin-16 flex justify-end" style={{ marginBottom: 0, marginInline: 0 }}>
                              <p className="font-4 color-4 line20 font-normal m-0">
                                <span className="color16">{listDescription.length}</span>/{listDescriptionMaxLength}
                              </p>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <div className="relative grow-0 shrink-0 basis-auto margin-34 width72 aspect-square flex items-stretch" style={{ marginLeft: 0, marginBlock: 0 }}>
                          <Checkbox checked={isListPrivate} onChange={(e) => setIsListPrivate(e.target.checked)} className="w-full h-full" />
                        </div>
                        <div>
                          <p onClick={() => setIsListPrivate(!isListPrivate)} className="line-h-8 font-10 color-3 font-normal m-0 p-0">
                            Make it private
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  <button onClick={handleCloseEditListModal} className="border-radius-9 bdr-7 text-center box-border color-3 custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">
                    Cancel
                  </button>
                  <div className="padding50" style={{ paddingRight: 0 }}>
                    <button className="bdr-3 border-[#1a8917] bg-[#1a8917] border-radius-9 text-center text-white custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 cursor-pointer opacity-[0.9] transition-all duration-75 linear hover:opacity-100">Done</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute topRight2">
            <button onClick={handleCloseEditListModal} className="cursor-pointer m-0 p-0 color-3 opacity-50 transition-all duration-75 linear hover:opacity-100">
              <div className="width58 aspect-square">
                <IoMdClose className="w-full h-full" />
              </div>
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default MoreButton;
