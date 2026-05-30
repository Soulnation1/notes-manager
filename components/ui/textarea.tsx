"use client";
import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type TextareaProps = {
  error?: string;
  id?: string;
  name?: string;
  className?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function Textarea({
  error,
  className = "",
  id,
  name,
  value = "",
  placeholder,
  onChange,
}: TextareaProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: [
          "min-h-[120px]",
          "bg-paper-elevated",
          "px-3.5",
          "py-2.5",
          "text-[0.9375rem]",
          "text-ink",
          "leading-relaxed",
          "focus:outline-none",
          error
            ? "border-red-400"
            : "border-border",
          placeholder ? "empty:before:content-[attr(data-placeholder)]" : "",
          className,
        ]
          .filter(Boolean)
          .join(" "),
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  return (
    <div className="w-full">
      <div
        className={[
          "rounded-lg border overflow-hidden",
          error ? "border-red-400" : "border-border",
        ].join(" ")}
      >
        {/* Toolbar */}
        <div className="flex gap-2 border-b p-2 bg-paper">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className="rounded px-2 py-1 border"
          >
            Bold
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className="rounded px-2 py-1 border"
          >
            Italic
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className="rounded px-2 py-1 border"
          >
            List
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().undo().run()}
            className="rounded px-2 py-1 border"
          >
            Undo
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().redo().run()}
            className="rounded px-2 py-1 border"
          >
            Redo
          </button>
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          id={id}
          data-placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && id ? `${id}-error` : undefined}
        />
        <input type="hidden" name={name} value={value} />
      </div>

      {error && id && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
