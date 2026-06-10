import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Checkbox from "@mui/material/Checkbox";

function EditListModal({ isEditListModal, handleCloseEditListModal, list, editList }) {
  const listNameMaxLength = 60;
  const listDescriptionMaxLength = 280;
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [isListPrivate, setIsListPrivate] = useState(true);
  const [isHideDescInput, setIsHideDescInp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmEditBtnClick = async () => {
    const params = {
      listId: list._id,
      name: listName,
      description: listDescription,
      isPrivate: isListPrivate,
    };
    editList(params, setIsLoading);
  };

  useEffect(() => {
    if (isEditListModal) {
      setListName(list.name);
      setListDescription(list.description || "");
      setIsHideDescInp(list?.description?.length > 0 ? false : true);
      setIsListPrivate(list.isPrivate);
    }
  }, [isEditListModal]);

  return (
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
                  {!list.isDefault && (
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
                  )}

                  <div className="padding-14" style={{ paddingTop: 0, paddingInline: 0 }}>
                    {!isHideDescInput && (
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
                    )}
                    {isHideDescInput && (
                      <button onClick={() => setIsHideDescInp(false)} className="cursor-pointer m-0 p-0">
                        <p className="text-[#1a8917] line-h-8 font-10 font-normal m-0">Add a description</p>
                      </button>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center">
                      <div className="relative grow-0 shrink-0 basis-auto margin-34 width72 aspect-square flex items-stretch" style={{ marginLeft: 0, marginBlock: 0 }}>
                        <Checkbox checked={isListPrivate} onChange={(e) => setIsListPrivate(e.target.checked)} className="w-full h-full" />
                      </div>
                      <div>
                        <p onClick={() => setIsListPrivate(!isListPrivate)} className="line-h-8 font-10 color-3 font-normal m-0 p-0 cursor-default">
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
                  <button onClick={handleConfirmEditBtnClick} disabled={isLoading} className={`flex items-center custom-gap-3 bdr-3 border-[#1a8917] bg-[#1a8917] border-radius-9 text-center text-white custom-fs-1 line20 font-medium custom-px-2 padding-38 m-0 transition-all duration-75 linear ${isLoading ? "cursor-default opacity-[0.5]" : "cursor-pointer opacity-[0.9] hover:opacity-100"}`}>
                    {isLoading && <div className="width83 aspect-square rounded-full border-2 border-white border-t-0 border-r-0 animate-spin"></div>} Done
                  </button>
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
  );
}

export default EditListModal;
