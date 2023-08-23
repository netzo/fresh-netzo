import { ScrollArea } from "netzo/components/ui/scroll-area.tsx";
import { Separator } from "netzo/components/ui/separator.tsx";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default () => {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
};
