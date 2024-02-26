// adapted from https://github.com/shadcn-ui/ui/issues/876#issuecomment-1627395691
import {
  type Editor,
  EditorContent,
  type EditorOptions,
  useEditor,
} from "../../../deps/@tiptap/react.ts";
import { StarterKit } from "../../../deps/@tiptap/starter-kit.ts";
import { Separator } from "../../separator.tsx";
import { Toggle } from "../../toggle.tsx";
import { cn } from "../../utils.ts";

export type RichTextEditorProps = HTMLDivElement & Partial<EditorOptions> & {
  content?: string;
};

export const RichTextEditor = (
  { className, ...props }: RichTextEditorProps,
) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: cn(
          "w-full h-full bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
          className,
        ),
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
    ],
    content: "",
    ...props,
  });

  return (
    <>
      <RichTextEditorToolbar editor={editor} />
      <Separator />
      <EditorContent editor={editor} />
    </>
  );
};

export const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="bg-transparent p-1 flex flex-row items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor?.isActive("bold")}
        onPressedChange={() => editor?.chain().focus().toggleBold().run()}
      >
        <i className="mdi-format-bold h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("italic")}
        onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
      >
        <i className="mdi-format-italic h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("strike")}
        onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
      >
        <i className="mdi-format-strikethrough h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        pressed={editor?.isActive("bulletList")}
        onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <i className="mdi-format-list-bulleted h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("orderedList")}
        onPressedChange={() =>
          editor?.chain().focus().toggleOrderedList().run()}
      >
        <i className="mdi-format-list-numbered h-4 w-4" />
      </Toggle>
    </div>
  );
};
