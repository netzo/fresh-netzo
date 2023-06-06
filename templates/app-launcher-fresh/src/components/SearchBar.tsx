/** @jsx h */
import { h } from "preact";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default ({ onSearch }: SearchBarProps) => {
  const handleInput = (event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    onSearch(query);
  };

  return (
    <input
      type="search"
      placeholder="Search"
      class="input input-bordered w-full max-w-sm"
      onInput={handleInput}
    />
  );
};
