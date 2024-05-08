import { base64 } from "https://deno.land/std/encoding/base64.ts";

// Offset Pagination:

export function encodeOffsetCursor(offset: number): string {
  return base64.encode(`offset::${offset}`);
}

export function decodeOffsetCursor(cursor: string): number {
  const decoded = base64.decode(cursor);
  const [type, value] = decoded.split("::");
  if (type === "offset") return parseInt(value, 10);
  throw new Error("Invalid cursor");
}

// Cursor Pagination:

export function encodeCursorCursor(cursor: string): string {
  return base64.encode(`cursor::${cursor}`);
}

export function decodeCursorCursor(cursor: string): string {
  const decoded = base64.decode(cursor);
  const [type, value] = decoded.split("::");
  if (type === "cursor") return value;
  throw new Error("Invalid cursor");
}

// Link Pagination:

export function encodeLinkCursor(url: string): string {
  return base64.encode(`link::${url}`);
}

export function decodeLinkCursor(cursor: string): string {
  const decoded = base64.decode(cursor);
  const [type, value] = decoded.split("::");
  if (type === "link") return value;
  throw new Error("Invalid cursor");
}
