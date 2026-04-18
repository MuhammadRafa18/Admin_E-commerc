import TextAlign from "@tiptap/extension-text-align";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value]);

  if (!editor) return null;

  const ToolbarBtn = ({ onClick, active, children, title }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-all duration-150
        ${
          active
            ? "bg-violet-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {children}
    </button>
  );

  const Divider = () => (
    <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
  );

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex  items-center gap-0.5 px-2 py-1.5 border-b overflow-x-auto border-gray-200 bg-gray-50">
        {/* Text style */}
        <ToolbarBtn
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="#000"
              d="M4 2h4.5a3.501 3.501 0 0 1 2.852 5.53A3.499 3.499 0 0 1 9.5 14H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m1 7v3h4.5a1.5 1.5 0 0 0 0-3Zm3.5-2a1.5 1.5 0 0 0 0-3H5v3Z"
            />
          </svg>
        </ToolbarBtn>

        <ToolbarBtn
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M11 5h6M7 19h6m1-14l-4 14"
            />
          </svg>
        </ToolbarBtn>

        <ToolbarBtn
          title="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M5 12h14m-3-5.5A4 2 0 0 0 12 5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1-4-1.5"
            />
          </svg>
        </ToolbarBtn>

        <Divider />

        {/* Heading */}
        <ToolbarBtn
          title="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <span className="text-xs font-bold">H1</span>
        </ToolbarBtn>

        <ToolbarBtn
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <span className="text-xs font-bold">H2</span>
        </ToolbarBtn>

        <Divider />

        {/* Blockquote & Code */}
        <ToolbarBtn
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </ToolbarBtn>

        <ToolbarBtn
          title="Code"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </ToolbarBtn>
        <Divider/>
        <ToolbarBtn
          title="Align Left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="18" y2="18" />
          </svg>
        </ToolbarBtn>

        <ToolbarBtn
          title="Align Center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="6" y1="12" x2="18" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </ToolbarBtn>

        <ToolbarBtn
          title="Align Right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="9" y1="12" x2="21" y2="12" />
            <line x1="6" y1="18" x2="21" y2="18" />
          </svg>
        </ToolbarBtn>

        <ToolbarBtn
          title="Justify"
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </ToolbarBtn>

        <Divider />

        {/* List */}
        <ToolbarBtn
          title="Bullet List"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="9" y1="6" x2="20" y2="6" />
            <line x1="9" y1="12" x2="20" y2="12" />
            <line x1="9" y1="18" x2="20" y2="18" />
            <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
            <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
            <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
          </svg>
        </ToolbarBtn>

        <ToolbarBtn
          title="Ordered List"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="10" y1="6" x2="21" y2="6" />
            <line x1="10" y1="12" x2="21" y2="12" />
            <line x1="10" y1="18" x2="21" y2="18" />
            <path d="M4 6h1v4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 10h2" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </ToolbarBtn>

        <ToolbarBtn
          title="Horizontal Rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </ToolbarBtn>

        <Divider />

        {/* Undo Redo */}
        <ToolbarBtn
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 14 4 9 9 4" />
            <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
          </svg>
        </ToolbarBtn>

        <ToolbarBtn
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 14 20 9 15 4" />
            <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
          </svg>
        </ToolbarBtn>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="p-3 min-h-[150px] text-sm text-gray-800 focus:outline-none
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror_p]:mb-2
          [&_.ProseMirror_h1]:text-xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-2
          [&_.ProseMirror_h2]:text-lg [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-2
          [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul]:mb-2
          [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol]:mb-2
          [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-violet-300 [&_.ProseMirror_blockquote]:pl-3 [&_.ProseMirror_blockquote]:text-gray-500 [&_.ProseMirror_blockquote]:italic
          [&_.ProseMirror_code]:bg-gray-100 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-xs [&_.ProseMirror_code]:font-mono
          [&_.ProseMirror_hr]:border-gray-200 [&_.ProseMirror_hr]:my-3"
      />
    </div>
  );
};
