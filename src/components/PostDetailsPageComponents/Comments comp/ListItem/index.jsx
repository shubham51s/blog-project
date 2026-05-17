import React, { useContext, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { formatMonthAndDayLong } from "../../../../utils/monthDateLongFormatter";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { UserContext } from "../../../../context/userContext";
import { showToast } from "../../../../utils/toaster";
import { Link } from "react-router-dom";

function ListItem({ item, setBlog }) {
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const [comment, setComment] = useState(item);
  const [loaders, setLoaders] = useState({
    deleteComment: false,
  });

  const handleDeleteComment = async () => {
    setLoaders((prev) => ({ ...prev, deleteComment: true }));
    try {
      const response = await requestHandler(`/comment/${comment._id}`, "DELETE");
      const result = await response.json();

      if (response?.status === 200) {
        setBlog((prev) => ({ ...prev, commentCount: prev.commentCount > 0 ? prev.commentCount - 1 : 0 }));
        setComment(null);
      } else {
        showToast(result?.message || "Some error occured", "error");
      }
    } catch (err) {
      showToast("Some error occured", "error");
      console.error(err);
    } finally {
      setLoaders((prev) => ({ ...prev, deleteComment: false }));
    }
  };

  return (
    <>
      {comment && (
        <div className="bdr-5" style={{ borderTop: 0, borderInline: 0 }} key={comment._id}>
          <div className="h-full w-full">
            <div className="custom-p-y-1 padding-42" style={{ paddingInline: 0 }}>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Link to={`/profile/${comment.user.username}`} className="inline-block cursor-pointer relative">
                    <div className="relative">
                      <img src={comment.user.profileImg} className="width-11 aspect-square box-border rounded-full align-middle" />
                    </div>
                  </Link>
                  <div className="padding-33" style={{ paddingRight: 0, paddingBlock: 0 }}>
                    <div className="flex items-center">
                      <Link to={`/profile/${comment.user.username}`} className="cursor-pointer transition-all duration-75 ease hover:underline">
                        <p className="break-words text-ellipsis color-3 custom-fs-1 overflow-hidden font-medium m-0 p-0">{comment.user.name}</p>
                      </Link>
                      {comment.user._id === userInfo._id && (
                        <div className="bg-11 color-4 margin-19 border-radius-3 padding-6 line-h-7 font-8 font-normal" style={{ marginBlock: 0, marginRight: 0, paddingBlock: 0 }}>
                          You
                        </div>
                      )}
                    </div>
                    <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">
                      <span>{formatMonthAndDayLong(comment.createdAt)}</span>
                    </p>
                  </div>
                </div>
                <div className="inline-block">
                  <Popover.Root>
                    <Popover.Trigger>
                      <div className="custom-px-2 padding-36">
                        <div className="width-13 aspect-square cursor-pointer opacity-[0.75] transition-all duration-75 ease hover:opacity-100">
                          <MdOutlineMoreHoriz className="w-full h-full" />
                        </div>
                      </div>
                    </Popover.Trigger>
                    <Popover.Content side="bottom" align="middle" sideOffset={1}>
                      <div className="box-shadow-4 border-radius-3 box-border custom-bg-8">
                        <ul className="padding-6 flex flex-col items-stretch list-none m-0" style={{ paddingInline: 0 }}>
                          {comment.user._id === userInfo._id && (
                            <li className="padding-1 custom-fs-1 color-4 font-normal">
                              <button onClick={() => handleDeleteComment()} disabled={loaders.deleteComment} className="text-[#c94a4a] cursor-pointer m-0 p-0">
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
                  <div className="color-3 custom-fs-1 line-h-8 font-medium" dangerouslySetInnerHTML={{ __html: comment.content }} />
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
