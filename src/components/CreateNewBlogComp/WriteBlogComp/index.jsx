import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

function WriteBlogComp() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

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
    ],
    content: "",
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      console.log("content: ", content);
    },
  });

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    };
  };

  if (!editor) return null;

  useEffect(() => {
    if (editor) editor.commands.focus();
  }, [editor]);

  return (
    <main className="block">
      <article className="relative height65 overflow-hidden block">
        {/* working */}
        <div className="margin40 margin41 break-all relative">
          <section className="block margin-11 relative clear-both padding-27" style={{ marginBottom: 0, marginInline: 0, paddingTop: 0, paddingInline: 0 }}>
            <div className="w-full width55 padding-14 my-0 mx-auto box-border relative editor-wrapper" style={{ paddingBlock: 0 }}>
              {/* <h3 className="padding-18 m-0 font-normal font-12 color11" style={{ paddingBottom: 0 }}>
                Heading
              </h3> */}

              <textarea
                value={heading}
                onChange={(e) => {
                  setHeading(e.target.value);
                  e.target.style.height = "auto"; // reset previous height
                  e.target.style.height = `${e.target.scrollHeight}px`; // set new height based on content
                }}
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

              {editor && (
                <BubbleMenu
                  editor={editor}
                  className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 absolute left-[-40px]"
                  shouldShow={({ state }) => {
                    const { empty, from } = state.selection;
                    const node = state.doc.nodeAt(from);
                    return empty && node?.type.name === "paragraph" && (node.content.size === 0 || (node.content.size === 1 && node.content.firstChild.text === ""));
                  }}
                >
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      addImage();
                    }}
                    className="w-8 h-8 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </BubbleMenu>
              )}

              <EditorContent editor={editor} className="margin-10 font-normal font-6 p-0 border-0 outline-none focus:outline-none" />
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
  );
}

export default WriteBlogComp;
