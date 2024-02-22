import { RichTextEditor } from "netzo/components/blocks/rich-text-editor/rich-text-editor.tsx";
import { Note } from "./Notes.tsx";

export function NoteEditor(props: { note: Note }) {
  return (
    <RichTextEditor
      className="w-full h-full"
      content={props.note.text}
    />
  );
}
