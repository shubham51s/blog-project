import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { IoIosAddCircleOutline } from "react-icons/io";
import PreviewBlogComp from "./preview-blog-comp";

function WriteBlogComp({ setHeading, heading, setContent, setDescription }) {
  const [isPreview, setIsPreview] = useState(true);
  const [showAddBtn, setShowAddBtn] = useState(false);
  const [btnPos, setBtnPos] = useState({ top: 0, left: 0 });
  const [pendingImages, setPendingImages] = useState([]);
  const editorWrapperRef = useRef(null);
  const addImgBtnRef = useRef(null);
  const editorRef = useRef(null);

  const handlePlusButtonVisibility = (editor) => {
    const { from } = editor.state.selection;
    const pos = editor.state.selection.$from.pos;
    const node = editor.state.doc.nodeAt(pos);

    const isEmpty = editor.state.doc.textContent.trim() === "" || editor.state.selection.$from.parent.textContent.trim() === "";

    if (isEmpty) {
      const coords = editor.view.coordsAtPos(from);
      const editorEl = editorWrapperRef.current;
      const editorRect = editorEl.getBoundingClientRect();

      setShowAddBtn(true);
      setBtnPos({
        top: coords.top - editorRect.top + (coords.bottom - coords.top) / 2,
        left: coords.left - editorRect.left - 35,
      });
    } else {
      setShowAddBtn(false);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: true,
        codeBlock: true,
        horizontalRule: true,
        listItem: true,
        orderedList: true,
        bulletList: true,
      }),
      Image,
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
      CharacterCount.configure({
        limit: 30000,
      }),
    ],
    content: "",
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());

      const html = editor.getHTML();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const firstParagraph = doc.querySelector("p");
      const description = firstParagraph ? firstParagraph.textContent : "";
      const existingIds = Array.from(html.matchAll(/data-id="([^"]+)"/g), (m) => m[1]);

      setContent(html);
      setDescription(description);

      setPendingImages((prev) => prev.filter((img) => existingIds.includes(img.id)));

      console.log("html: ", html, " description: ", description);

      // Get current selection (cursor)
      const { from } = editor.state.selection;

      // Get current node (the paragraph user is editing)
      const node = editor.view.domAtPos(from)?.node;

      // Find paragraph parent node
      const para = node?.closest("p");

      // Check if paragraph exists and is empty
      const isEmpty = para && para.textContent.trim().length === 0;

      handlePlusButtonVisibility(editor);
    },
    onFocus: ({ editor }) => {
      handlePlusButtonVisibility(editor);
    },
    // onBlur: () => {
    //   setShowAddBtn(false); // optional: hide on blur
    // },
    onSelectionUpdate: ({ editor }) => {
      handlePlusButtonVisibility(editor);
    },
  });

  if (!editor) return null;

  const handleAddImage = (e) => {
    e.stopPropagation();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const id = Math.random().toString(36).substring(2, 10);
      // Create a temporary local preview URL
      const localUrl = URL.createObjectURL(file);

      // Insert image at current cursor position
      editor.chain().focus().setImage({ src: localUrl, "data-id": id }).run();

      setPendingImages((prev) => [...prev, { file, id, blobUrl: localUrl }]);
    };
    input.click();
    console.log("pending images: ", pendingImages);
  };

  const handleClickOutside = (e) => {
    if (addImgBtnRef && !addImgBtnRef.current.contains(e.target) && editorRef && !editorRef.current.contains(e.target)) {
      setShowAddBtn(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <main className="block">
        <article className="relative height65 overflow-hidden block">
          <div className="margin40 margin41 break-all relative">
            <section className="block margin-11 relative clear-both padding-27" style={{ marginBottom: 0, marginInline: 0, paddingTop: 0, paddingInline: 0 }}>
              <div ref={editorWrapperRef} className="w-full width55 padding-14 my-0 mx-auto box-border relative editor-wrapper" style={{ paddingBlock: 0 }}>
                <textarea
                  value={heading}
                  onChange={(e) => {
                    setHeading(e.target.value);
                    e.target.style.height = "auto"; // reset previous height
                    e.target.style.height = `${e.target.scrollHeight}px`; // set new height based on content
                  }}
                  maxLength={500}
                  className="padding-18 m-0 font-normal font-12 color11 outline-none resize-none overflow-hidden w-full"
                  placeholder="Title"
                  style={{
                    paddingBottom: 0,
                  }}
                  rows={1}
                />

                {editor && (
                  <BubbleMenu editor={editor} options={{ placement: "top", offset: 8 }}>
                    <div className="flex bg-9 color-2 border-radius-1 shadow-lg padding-30 gap9 backdrop-blur-sm">
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault(); // prevent editor losing focus
                          editor.chain().focus().toggleBold().run();
                        }}
                        className={`padding50 padding51 rounded hover:cursor-pointer transition-colors ${editor.isActive("bold") ? "color12" : ""}`}
                      >
                        B
                      </button>

                      <button
                        onMouseDown={(e) => {
                          e.preventDefault(); // prevent editor losing focus
                          editor.chain().focus().toggleItalic().run();
                        }}
                        className={`padding50 padding51 rounded italic hover:cursor-pointer transition-colors ${editor.isActive("italic") ? "color12" : ""}`}
                      >
                        i
                      </button>
                    </div>
                  </BubbleMenu>
                )}

                {showAddBtn && (
                  <button
                    onClick={(e) => handleAddImage(e)}
                    ref={addImgBtnRef}
                    className="flex items-center justify-center width-11 aspect-square line-h-9 p-0 font13 color-6 transition-all duration-300 ease-in-out opacity-75 hover:opacity-100 text-center rounded-full cursor-pointer bg-transparent"
                    style={{
                      position: "absolute",
                      top: btnPos.top,
                      left: btnPos.left,
                      transform: "translate(-100%, -50%)",
                      zIndex: 9999,
                    }}
                  >
                    <IoIosAddCircleOutline className="w-full h-full" />
                  </button>
                )}

                <EditorContent ref={editorRef} editor={editor} className="margin-10 font-normal font-6 p-0 border-0 outline-none focus:outline-none" />
              </div>
            </section>
          </div>

          {heading.length > 0 && (
            <div className="absolute top4 right4 height66 text-right font-10 color10 margin42" style={{ marginLeft: 0, marginBlock: 0 }}>
              <div className="h-full absolute width56 left3 top-0 overflow-hidden custom-bg-3 opacity-50">
                <div className="bdr10 absolute h-full top-[-100%]" style={{ borderLeft: 0, borderBlock: 0 }}></div>
              </div>
              <div className="absolute right-0 top-0 padding52" style={{ paddingInline: 0, paddingBottom: 0 }}>
                Title
              </div>
            </div>
          )}

          <div className="absolute top5 left2 margin43 margin44 height-2 aspect-square p-0 z-[400]"></div>

          <footer className="padding-25"></footer>
        </article>
      </main>
      {isPreview && <PreviewBlogComp />}
    </>
  );
}

export default WriteBlogComp;
