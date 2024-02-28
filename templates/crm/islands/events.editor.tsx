import type { Editor } from "netzo/components/blocks/prose-editor/prose-editor.tsx";
import * as ProseEditor from "netzo/components/blocks/prose-editor/prose-editor.tsx";
import { Separator } from "netzo/components/separator.tsx";

export function EventEditor({ editor, content }: {
  editor: Editor | null; // set to null on the server and initialize on the client
  content: string; // used to server-side render initial content
}) {
  if (!content) {
    return (
      <div className="grid place-items-center w-full h-full py-20">
        <div className="text-center">
          <i className="mdi-note-text text-4xl text-muted-foreground mb-2" />
          <h2 className="text-xl font-medium text-muted-foreground mb-1">
            No event selected
          </h2>
          <p className="text-sm text-muted-foreground">
            Create a new event to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <header className="bg-transparent p-1 flex flex-row items-center gap-1">
        <ProseEditor.ToggleBold editor={editor} />
        <ProseEditor.ToggleItalic editor={editor} />
        <ProseEditor.ToggleUnderline editor={editor} />
        <ProseEditor.ToggleStrike editor={editor} />
        <ProseEditor.ToggleHighlight editor={editor} />
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <ProseEditor.ToggleH1 editor={editor} />
        <ProseEditor.ToggleH2 editor={editor} />
        <ProseEditor.ToggleH3 editor={editor} />
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <ProseEditor.ToggleUl editor={editor} />
        <ProseEditor.ToggleOl editor={editor} />
        <Separator
          orientation="vertical"
          className="w-[1px] h-8 ml-auto"
        />
        <ProseEditor.ToggleCodeBlock editor={editor} />
        <ProseEditor.ToggleBlockquote editor={editor} />
        <ProseEditor.ToggleLink editor={editor} />
        <ProseEditor.ToggleImage editor={editor} />
        <ProseEditor.ToggleTable editor={editor} />
        <ProseEditor.ToggleYoutube editor={editor} />
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <ProseEditor.ToggleUndo editor={editor} />
        <ProseEditor.ToggleRedo editor={editor} />
      </header>
      <Separator />
      <ProseEditor.ProseEditor editor={editor} content={content} />
    </div>
  );
}
