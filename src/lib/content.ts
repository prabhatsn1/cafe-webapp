import type { SiteContent, MenuItem } from "@/src/types/content";
// JSON import is resolved at build-time by Next.js bundler (server-safe)
import rawContent from "@/src/content/content-mock.json";

const content = rawContent as SiteContent;

export function getContent(): SiteContent {
  return content;
}

export function getFeaturedItems(): MenuItem[] {
  const { menu, featured } = content;
  const allItems = menu.categories.flatMap((c) => c.items);
  return featured
    .map((id) => allItems.find((item) => item.id === id))
    .filter((item): item is MenuItem => item !== undefined);
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return content.menu.categories
    .flatMap((c) => c.items)
    .find((item) => item.id === id);
}
