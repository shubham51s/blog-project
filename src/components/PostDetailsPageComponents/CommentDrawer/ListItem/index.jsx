import React, { useContext, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { IoIosMore } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../../../../context/userContext";
import { formatMonthAndDayLong } from "../../../../utils/monthDateLongFormatter";

function ListItem({ item }) {
  const { userInfo } = useContext(UserContext);
  const [comment, setComment] = useState(item);

  const handleDeleteComment = async () => {
    try {
      const response = await requestHandler(`/comment/${comment._id}`, "DELETE");
      const result = await response.json();

      if (response.status === 200) {
        setBlog((prev) => ({ ...prev, commentCount: prev.commentCount > 0 ? prev.commentCount - 1 : 0 }));
        setComment(null);
        showToast("Comment deleted successfully");
      } else {
        showToast(result.message || "Something went wrong", "error");
      }
    } catch (err) {
      showToast("Something went wrong", "error");
      console.error(err);
    }
  };

  return (
    <>
      {comment && (
        <div className="bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
          <div className="h-full w-full">
            <div className="custom-p-y-1 padding-42" style={{ paddingInline: 0 }}>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="inline-block cursor-pointer relative">
                    <div className="relative">
                      <img src={comment.user.profileImg} className="width-11 aspect-square box-border rounded-full align-middle" />
                    </div>
                  </div>
                  <div className="padding-33" style={{ paddingRight: 0, paddingBlock: 0 }}>
                    <div className="flex items-center">
                      <div className="cursor-pointer transition-all duration-400 ease-in-out hover:underline">
                        <p className="break-words text-ellipsis color-3 custom-fs-1 overflow-hidden font-normal m-0 p-0">{comment.user.name}</p>
                      </div>
                      {comment.user._id === userInfo._id && (
                        <div className="bg-[rgb(26,137,23)] text-white margin-19 border-radius-3 padding-6 line-h-7 font-8 font-normal" style={{ marginBlock: 0, marginRight: 0, paddingBlock: 0 }}>
                          Author
                        </div>
                      )}
                    </div>
                    <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">
                      <span>{formatMonthAndDayLong(comment.updatedAt)}</span>
                    </p>
                  </div>
                </div>
                <div className="inline-block">
                  <Popover.Root>
                    <Popover.Trigger>
                      <div className="custom-px-2 padding-36 cursor-pointer m-0">
                        <div className="width-13 aspect-square">
                          <IoIosMore className="w-full h-full" />
                        </div>
                      </div>
                    </Popover.Trigger>
                    <Popover.Content side="bottom" align="middle" sideOffset={1}>
                      <div className="box-shadow-4 border-radius-3 box-border custom-bg-8">
                        <ul className="padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                          {comment.user._id === userInfo._id && (
                            <li className="padding-1 custom-fs-1 color-4 font-normal">
                              <button onClick={() => handleDeleteComment()} className="text-[#c94a4a] cursor-pointer m-0 p-0">
                                Delete response
                              </button>
                            </li>
                          )}

                          {comment.user._id !== userInfo._id && (
                            <li className="padding-1 custom-fs-1 color-4 font-normal">
                              <button className="text-[#c94a4a] cursor-pointer m-0 p-0">Report response...</button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </Popover.Content>
                  </Popover.Root>
                </div>
              </div>
              <div className="margin-35 break-words" style={{ marginBottom: 0, marginInline: 0 }}>
                <div className="padding-27">
                  <div className="color-3 custom-fs-1 line-h-8 font-normal" dangerouslySetInnerHTML={{ __html: comment.content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListItem;
