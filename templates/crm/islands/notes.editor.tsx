import { RichTextEditor } from "netzo/components/blocks/rich-text-editor/rich-text-editor.tsx";
import type { Note } from "../data/mod.tsx";

export function NoteEditor(props: { note: Note }) {
  return (
    <RichTextEditor
      className="w-full h-full"
      content={props.note.content}
    />
  );
}
