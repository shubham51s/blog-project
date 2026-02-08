import React, { useContext, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { formatMonthYearFromUTC } from "../../../utils/dates";
import { formatNumberCompact } from "../../../utils/common";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { showToast } from "../../../utils/toaster";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { UserContext } from "../../../context/userContext";
import Skeleton from "react-loading-skeleton";

function About() {
  const { requestHandler } = useRequestHandler();
  const { user, setUser } = useOutletContext();
  const { userInfo } = useContext(UserContext);
  const [isEditable, setIsEditable] = useState(false);
  const [loaders, setLoaders] = useState({
    initialLoader: true,
    saveLoader: false,
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
        link: false, // IMPORTANT
      }),
      CharacterCount.configure({
        limit: 3000,
      }),
    ],
    content: "",
    editable: isEditable,
  });

  const handleEnableEdit = () => {
    if (editor) {
      setIsEditable(true);
      editor.setEditable(true);
      editor.commands.setContent(user.about || "", false);
      editor?.commands.focus();
    }
  };

  const handleCancelEdit = (about = null) => {
    if (editor) {
      setIsEditable(false);
      editor.commands.setContent(about || user.about || "", false);
      editor.setEditable(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editor) return;
    setLoaders((prev) => ({ ...prev, saveLoader: true }));

    try {
      const params = {
        about: editor.getHTML(),
      };

      const response = await requestHandler("/users/update/about", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        if (result?.data?.about) {
          setUser((prev) => ({ ...prev, about: result.data.about }));
          handleCancelEdit(result.data.about);
        } else {
          showToast("Some error occured");
        }
      } else {
        showToast("Some error occured");
      }
      setLoaders((prev) => ({ ...prev, saveLoader: false }));
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setLoaders((prev) => ({ ...prev, saveLoader: false }));
    }
  };

  useEffect(() => {
    if (user && editor && loaders.initialLoader) {
      editor.commands.setContent(user.about || "", false);
      setLoaders((prev) => ({ ...prev, initialLoader: false }));
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col custom-bg-8">
      <div className="flex justify-center">
        <div className="min-w-0 w-full max-width-2 margin-12">
          <div className="padding71 margin65 bdr-5" style={{ paddingTop: 0, marginTop: 0, marginInline: 0, borderTop: 0, borderInline: 0 }}>
            <EditorContent editor={editor} className={`w-full border-0 outline-0`} />
            {user && userInfo._id === user._id && (
              <div className="flex items-center justify-end padding62">
                <div className="flex justify-end">
                  {/* enable edit */}
                  {!isEditable && (
                    <button onClick={handleEnableEdit} className="bdr-7 border-radius-9 custom-px-2 custom-py-2 box-border custom-fs-1 line20 font-normal m-0 cursor-pointer color-3 opacity-[0.95] transition-all duration-75 ease hover:opacity-100">
                      Edit
                    </button>
                  )}

                  {/* cancel edit */}
                  {isEditable && (
                    <button disabled={loaders.saveLoader} onClick={() => handleCancelEdit()} className={`bdr-7 border-radius-9 custom-px-2 custom-py-2 box-border custom-fs-1 line20 font-normal m-0 color-3 transition-all duration-75 ease ${loaders.saveLoader ? "cursor-not-allowed opacity-[0.7]" : "cursor-pointer opacity-[0.95] hover:opacity-100"}`}>
                      Cancel
                    </button>
                  )}

                  {/* save edit changes */}
                  {isEditable && (
                    <div className="flex margin-5">
                      <button onClick={handleSaveEdit} disabled={loaders.saveLoader} className={`flex items-center custom-gap-3 bdr-6 custom-bg-1 border-radius-9 custom-px-2 padding59 box-border custom-fs-1 line20 font-normal m-0 color-2 transition-all duration-75 ease ${loaders.saveLoader ? "opacity-[0.7] cursor-not-allowed" : "cursor-pointer opacity-[0.95] hover:opacity-100"}`}>
                        {loaders.saveLoader && <div className="width-33 aspect-square rounded-full custom-bdr-7 border-2 border-t-0 border-r-0 animate-spin"></div>}
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="padding-3" style={{ paddingTop: 0, paddingInline: 0 }}>
            {user && <span className="color-4 custom-fs-1 line20 font-normal">Medium member since {formatMonthYearFromUTC(user.createdAt)}</span>}
            {!user && <Skeleton className="color-4 custom-fs-1 line20 font-normal" width={50} height={20} />}
          </div>

          <div className="padding-3" style={{ paddingTop: 0, paddingInline: 0 }}>
            {user && (
              <h4 className="text-[#1A8917] custom-fs-1 line20 font-normal m-0 p-0">
                <Link to={`/profile/${user.username}/followers`} className="cursor-pointer m-0 p-0 no-underline transition-all duration-75 ease hover:text-[#156D12]">
                  {formatNumberCompact(user.followersCount)} followers
                </Link>
                <span className="inline-block margin-13">
                  <p className="color-3 custom-fs-1 line20 font-normal m-0">.</p>
                </span>
                <Link to={`/profile/${user.username}/following`} className="cursor-pointer m-0 p-0 no-underline transition-all duration-75 ease hover:text-[#156D12]">
                  {formatNumberCompact(user.followingCount)} following
                </Link>
              </h4>
            )}
            {!user && <Skeleton width={50} height={20} />}
          </div>

          {/* <div className="padding-3" style={{ paddingTop: 0, paddingInline: 0 }}></div> */}
        </div>
      </div>
    </div>
  );
}

export default About;
