import React, { useContext, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import FollowAuthorBtn from "../../../../Common/BlogActions/FollowAuthor";
import FollowPublicationBtn from "../../../../Common/BlogActions/FollowPublication";
import { RiMoreFill } from "react-icons/ri";
import { UserContext } from "../../../../../context/userContext";
import MuteAuthorBtn from "../../../../Common/BlogActions/MuteAuthor";
import MutePublicationBtn from "../../../../Common/BlogActions/MutePublication";
import Edit from "../../../../Common/BlogActions/Edit";
import SubmitToPublicationBtn from "../../../../Common/BlogActions/SubmitToPublication";
import DeleteBlogBtn from "../../../../Common/BlogActions/Delete";

function ActionBtn({ blog, handleAfterBlogDelete }) {
  const { userInfo } = useContext(UserContext);
  const [isMyBlog, setIsMyBlog] = useState(userInfo._id === blog.author._id);

  const handleFollowUser = async () => {
    setLoaders((prev) => ({ ...prev, toggleFollowLoader: true }));

    const params = {
      _id: listItem.blog.author._id,
      name: listItem.blog.author.name,
    };
    await followUser(params);

    setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
  };

  const handleUnfollowUser = async () => {
    setLoaders((prev) => ({ ...prev, toggleFollowLoader: true }));

    const params = {
      _id: listItem.blog.author._id,
      name: listItem.blog.author.name,
    };
    await unfollowUser(params);

    setLoaders((prev) => ({ ...prev, toggleFollowLoader: false }));
  };

  return (
    <Popover.Root>
      <Popover.Trigger className="padding-33 cursor-pointer m-0 color-3 transition-all duration-75 ease opacity-[0.85] hover:opacity-100">
        <div className="width-13 aspect-square">
          <RiMoreFill className="w-full h-full" />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="bottom" align="middle" sideOffset={2} className="box-shadow-4 border-radius-3">
          <div className="border-radius-3 custom-bg-8">
            {!isMyBlog && (
              <ul className="list-none width59 overflow-hidden custom-px-2 flex flex-col items-stretch m-0">
                {userInfo._id !== blog.author._id && <FollowAuthorBtn user={blog.author} />}

                {blog.publication && <FollowPublicationBtn publication={blog.publication} />}

                <li className="custom-px-2">
                  <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                </li>

                {userInfo._id !== blog.author._id && <MuteAuthorBtn user={blog.author} />}

                {blog.publication && <MutePublicationBtn publication={blog.publication} />}
              </ul>
            )}

            {isMyBlog && (
              <ul className="list-none width59 overflow-hidden custom-px-2 flex flex-col items-stretch m-0">
                <Edit blog={blog} />
                {!blog.publication && <SubmitToPublicationBtn blog={blog} />}

                {blog.publication && (
                  <li className="custom-px-2">
                    <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>{" "}
                  </li>
                )}

                {blog.publication && <FollowPublicationBtn publication={blog.publication} />}
                {blog.publication && <MutePublicationBtn publication={blog.publication} />}
                <li className="custom-px-2">
                  <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                </li>

                <DeleteBlogBtn blog={blog} handleAfterBlogDelete={handleAfterBlogDelete} />
              </ul>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ActionBtn;
