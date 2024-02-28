// adapted from https://github.com/shadcn-ui/ui/issues/876#issuecomment-1627395691
import { IS_BROWSER } from "$fresh/runtime.ts";
import * as React from "react";
import { type Editor, EditorContent } from "../../../deps/@tiptap/react.ts";
import { Separator } from "../../separator.tsx";
import { Toggle } from "../../toggle.tsx";
import { cn } from "../../utils.ts";

export * from "../../../deps/@tiptap/react.ts";
export * from "./use-prose-editor.tsx";

type ProseEditorProps = HTMLDivElement & {
  /* client-only editor instance (set to null on the server, initialized in the client) */
  editor: Editor | null;
  /* used to server-side render initial content (until editor instance created in client) */
  content?: string;
  /* used to disable editor (sets contenteditable to false) */
  editable?: boolean;
};

export const ProseEditor = (
  { className, editor, content }: ProseEditorProps,
) => {
  // server-side render content once
  if (!IS_BROWSER || !editor) {
    return (
      <div
        className="prose h-full w-full"
        dangerouslySetInnerHTML={{ __html: content ?? "" }}
      />
    );
  }

  return (
    <EditorContent
      editor={editor}
      className={cn("prose h-full w-full", className)}
    />
  );
};

type ToggleButtonProps = {
  editor?: Editor;
  className?: string;
};

export const ToggleBold = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("bold")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().toggleBold().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-format-bold h-4 w-4" />
  </Toggle>
);

export const ToggleItalic = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("italic")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-format-italic h-4 w-4" />
  </Toggle>
);

export const ToggleUnderline = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("underline")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().toggleUnderline().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-format-underline h-4 w-4" />
  </Toggle>
);

export const ToggleStrike = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("strike")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-format-strikethrough h-4 w-4" />
  </Toggle>
);

export const ToggleCode = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("code")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().toggleCode().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-code-tags h-4 w-4" />
  </Toggle>
);

export const ToggleHighlight = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("highlight")}
    disabled={!editor}
    onPressedChange={() =>
      editor?.commands.toggleHighlight({ color: "#ffcc00" })}
    className={cn("grid", className)}
  >
    <i className="mdi-format-color-highlight h-4 w-4" />
  </Toggle>
);

const ToggleH = ({
  className,
  editor,
  level,
}: ToggleButtonProps & { level: 1 | 2 | 3 | 4 | 5 | 6 }) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("heading", { level })}
    disabled={!editor}
    onPressedChange={() =>
      editor?.chain().focus().toggleHeading({ level }).run()}
    className={cn("grid", className)}
  >
    <i className={`mdi-format-header-${level} h-4 w-4`} />
  </Toggle>
);

export const ToggleH1 = ({ className, editor }: ToggleButtonProps) => (
  <ToggleH level={1} className={className} editor={editor} />
);

export const ToggleH2 = ({ className, editor }: ToggleButtonProps) => (
  <ToggleH level={2} className={className} editor={editor} />
);

export const ToggleH3 = ({ className, editor }: ToggleButtonProps) => (
  <ToggleH level={3} className={className} editor={editor} />
);

export const ToggleH4 = ({ className, editor }: ToggleButtonProps) => (
  <ToggleH level={4} className={className} editor={editor} />
);

export const ToggleH5 = ({ className, editor }: ToggleButtonProps) => (
  <ToggleH level={5} className={className} editor={editor} />
);

export const ToggleH6 = ({ className, editor }: ToggleButtonProps) => (
  <ToggleH level={6} className={className} editor={editor} />
);

export const ToggleP = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("paragraph")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().setParagraph().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-format-paragraph h-4 w-4" />
  </Toggle>
);

export const ToggleUl = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("bulletList")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-format-list-bulleted h-4 w-4" />
  </Toggle>
);

export const ToggleOl = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("orderedList")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().toggleOrderedList().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-format-list-numbered h-4 w-4" />
  </Toggle>
);

export const ToggleTasklist = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("taskList")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().toggleTaskList().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-format-list-checkbox h-4 w-4" />
  </Toggle>
);

export const ToggleCodeBlock = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("codeBlock")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().toggleCodeBlock().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-code-braces-box h-4 w-4" />
  </Toggle>
);

export const ToggleBlockquote = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("blockquote")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().toggleBlockquote().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-format-quote-close h-4 w-4" />
  </Toggle>
);

export const ToggleLink = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("link")}
    disabled={!editor}
    onPressedChange={() =>
      editor?.chain().focus().toggleLink({ href: "https://example.com" }).run()}
    className={cn("grid", className)}
  >
    <i className="mdi-link h-4 w-4" />
  </Toggle>
);

// TODO: open a dialog with a form to ask for image, table and youtube options

export const ToggleImage = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("image")}
    disabled={!editor}
    onPressedChange={() =>
      editor?.chain().focus().setImage({
        src: "https://picsum.photos/200/300",
        alt: "Image",
      }).run()}
    className={cn("grid", className)}
  >
    <i className="mdi-image h-4 w-4" />
  </Toggle>
);

export const ToggleTable = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("table")}
    disabled={!editor}
    onPressedChange={() =>
      editor?.chain().focus().insertTable({
        rows: 3,
        cols: 3,
        withHeaderRow: true,
      }).run()}
    className={cn("grid", className)}
  >
    <i className="mdi-table h-4 w-4" />
  </Toggle>
);

export const ToggleYoutube = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("youtube")}
    disabled={!editor}
    onPressedChange={() =>
      editor?.chain().focus().setYoutubeVideo({
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        width: 640,
        height: 480,
      }).run()}
    className={cn("grid", className)}
  >
    <i className="mdi-youtube h-4 w-4" />
  </Toggle>
);

export const ToggleUndo = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("undo")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().undo().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-undo h-4 w-4" />
  </Toggle>
);

export const ToggleRedo = ({ className, editor }: ToggleButtonProps) => (
  <Toggle
    size="sm"
    pressed={editor?.isActive("redo")}
    disabled={!editor}
    onPressedChange={() => editor?.chain().focus().redo().run()}
    className={cn("grid", className)}
  >
    <i className="mdi-redo h-4 w-4" />
  </Toggle>
);

export const Toolbar = ({ className, editor }: ProseEditorProps) => {
  return (
    <>
      <header className="bg-transparent p-1 flex flex-row items-center gap-1">
        <ToggleBold editor={editor} />
        <ToggleItalic editor={editor} />
        <ToggleUnderline editor={editor} />
        <ToggleStrike editor={editor} />
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <ToggleH1 editor={editor} />
        <ToggleH2 editor={editor} />
        <ToggleH3 editor={editor} />
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <ToggleUl editor={editor} />
        <ToggleOl editor={editor} />
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <ToggleCodeBlock editor={editor} />
        <ToggleBlockquote editor={editor} />
        <Separator orientation="vertical" className="w-[1px] h-8 ml-auto" />
        <ToggleUndo editor={editor} />
        <ToggleRedo editor={editor} />
      </header>
      <Separator />
    </>
  );
};
