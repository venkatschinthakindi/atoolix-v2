
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { X } from "lucide-react";

type TiptapEditorProps = {
  html: string;
  onHtmlChange: (html: string) => void;
};

function EditorShell({
  editor,
  onClose,
}: {
  editor: any;
  onClose: () => void;
}) {
  const [linkUrl, setLinkUrl] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex h-[75vh] w-[75vw] max-w-[1100px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-indigo-900/40 px-6 py-4">
          <div className="text-sm font-semibold text-slate-900">Edit content</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200"
          >
            <X size={28} />
          </button>
        </div>

        <div className="border-b border-slate-200 bg-indigo-900/40 px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100" onClick={() => editor.chain().focus().toggleBold().run()}>
              Bold
            </button>
            <button type="button" className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100" onClick={() => editor.chain().focus().toggleItalic().run()}>
              Italic
            </button>
            <button type="button" className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100" onClick={() => editor.chain().focus().toggleUnderline().run()}>
              Underline
            </button>
            <button type="button" className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100" onClick={() => editor.chain().focus().setTextAlign("left").run()}>
              Left
            </button>
            <button type="button" className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100" onClick={() => editor.chain().focus().setTextAlign("center").run()}>
              Center
            </button>
            <button type="button" className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100" onClick={() => editor.chain().focus().setTextAlign("right").run()}>
              Right
            </button>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter link URL"
                className="w-56 rounded-md border border-slate-300 px-3 py-2 text-xs text-slate-700 outline-none"
              />
              <button
                type="button"
                className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => {
                  if (!linkUrl.trim()) return;
                  editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl.trim() }).run();
                  setLinkUrl("");
                }}
              >
                Insert Link
              </button>
            </div>

            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  editor.chain().focus().setImage({ src: reader.result as string }).run();
                };
                reader.readAsDataURL(file);
                e.target.value = "";
              }}
            />

            <button
              type="button"
              className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              Image
            </button>

            <input
              type="color"
              className="h-9 w-12 cursor-pointer rounded-md border border-slate-300 p-1"
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              title="Text color"
            />

            <button
              type="button"
              className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => editor.chain().focus().unsetColor().run()}
            >
              Clear Color
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-slate-100 p-6">
          <div className="h-full min-h-0 overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-sm">
            <EditorContent editor={editor} className="h-full" />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function TiptapEditor({
  html,
  onHtmlChange,
}: TiptapEditorProps) {
  const [open, setOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          style: "max-width: 100px; max-height: 100px; width: auto; height: auto; object-fit: contain;",
        },
      }),
      Link.configure({ openOnClick: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: html,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none w-full px-6 py-6 text-base leading-8 text-slate-900 outline-none focus:outline-none whitespace-pre-wrap break-words",
      },
    },
    onUpdate: ({ editor }) => {
      onHtmlChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && html !== editor.getHTML()) {
      editor.commands.setContent(html);
    }
  }, [html, editor]);

  if (!editor) {
    return (
      <div className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-500">
        Loading editor...
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
        }

        .ProseMirror {
          min-height: 220px;
          height: 220px;
          max-height: 220px;
          overflow-y: auto;
          outline: none;
          white-space: pre-wrap;
          word-break: break-word;
          padding: 1rem 1.5rem;
        }
        .fhcontent{
          max-height: 150px;
          overflow-y: auto;
          outline: none;
          white-space: pre-wrap;
          word-break: break-word;
          padding: 1rem 1.5rem;
          }
      `}</style>

      <div
        className="cursor-text rounded-xl border border-slate-300 p-2 shadow-sm transition hover:border-slate-400"
        onClick={() => setOpen(true)}
      >
        <div className="min-h-[220px] max-h-[220px] overflow-hidden text-slate-900">
          {html ? (
            <div
              className="fhcontent prose prose-slate max-w-none max-h-[220px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <div className="text-slate-400">Click to edit content</div>
          )}
        </div>
      </div>

      {open && <EditorShell editor={editor} onClose={() => setOpen(false)} />}
    </>
  );
}