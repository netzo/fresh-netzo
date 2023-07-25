import { computed, signal } from "@preact/signals";
import FilterBar from "../components/FilterBar.tsx";
import SearchBar from "../components/SearchBar.tsx";
import AppCard from "../components/AppCard.tsx";

interface App {
  name: string;
  tags: string[];
  logo: string;
  description: string;
  href: string;
}

interface Props {
  apps: App[];
}

const selectedTags = signal([]);
const searchQuery = signal("");

const handleTagSelect = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value = [...selectedTags.value, tag];
  }
};

const handleSearch = (query: string) => searchQuery.value = query;

export default ({ apps }: Props) => {
  const filteredApps = computed<App[]>(() =>
    apps.filter((app) => {
      if (
        selectedTags.value.length > 0 &&
        !selectedTags.value?.some((tag) => app.tags.includes(tag))
      ) {
        return false;
      }
      if (!app.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
        return false;
      }
      return true;
    })
  );

  return (
    <div class="flex flex-col w-full h-[calc(100%-96px)]">
      <header class="sticky top-0 bg-white dark:bg-gray-900">
        <div class="w-full mx-auto py-4 px-10">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div class="w-full mx-auto pb-6 px-10">
          <FilterBar
            tags={Array.from(new Set(apps.flatMap((app) => app.tags)))}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </div>
      </header>
      <div class="flex-1 grid grid-cols-4 gap-8 pb-6 px-10">
        {filteredApps.value.map((app: App) => (
          <AppCard
            name={app.name}
            tags={app.tags}
            logo={app.logo}
            description={app.description}
            href={app.href}
          />
        ))}
      </div>
    </div>
  );
};
