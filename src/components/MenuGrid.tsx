"use client";

import { useState } from "react";
import Image from "next/image";
import type { MenuItem, DietaryTag, AllergenTag } from "@/src/types/content";

interface MenuGridProps {
  categories: Array<{
    id: string;
    name: string;
    description: string;
    items: MenuItem[];
  }>;
}

const DIETARY_LABELS: Record<DietaryTag, string> = {
  vegan: "Vegan",
  vegetarian: "Vegetarian",
  "gluten-free": "Gluten-Free",
};

const DIETARY_COLORS: Record<DietaryTag, string> = {
  vegan: "bg-emerald-100 text-emerald-800",
  vegetarian: "bg-green-100 text-green-800",
  "gluten-free": "bg-amber-100 text-amber-800",
};

export default function MenuGrid({ categories }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [dietaryFilter, setDietaryFilter] = useState<DietaryTag | "all">("all");
  const [showSpicy, setShowSpicy] = useState(false);

  const currentCategory = categories.find((c) => c.id === activeCategory);
  const filtered =
    currentCategory?.items.filter((item) => {
      const dietaryOk =
        dietaryFilter === "all" || item.dietary.includes(dietaryFilter);
      const spicyOk = !showSpicy || item.spicy;
      return dietaryOk && spicyOk;
    }) ?? [];

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all ${
              activeCategory === cat.id
                ? "bg-primary text-primary-fg shadow-sm"
                : "bg-muted text-muted-fg hover:bg-secondary hover:text-secondary-fg"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-fg mr-2">
          Filter:
        </span>
        <button
          onClick={() => setDietaryFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            dietaryFilter === "all"
              ? "bg-foreground text-background"
              : "bg-muted text-muted-fg hover:bg-border"
          }`}
        >
          All
        </button>
        {(Object.keys(DIETARY_LABELS) as DietaryTag[]).map((tag) => (
          <button
            key={tag}
            onClick={() => setDietaryFilter(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              dietaryFilter === tag
                ? "bg-foreground text-background"
                : "bg-muted text-muted-fg hover:bg-border"
            }`}
          >
            {DIETARY_LABELS[tag]}
          </button>
        ))}
        <button
          onClick={() => setShowSpicy((s) => !s)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            showSpicy
              ? "bg-red-600 text-white"
              : "bg-muted text-muted-fg hover:bg-border"
          }`}
        >
          🌶️ Spicy only
        </button>
      </div>

      {/* Description */}
      {currentCategory && (
        <p className="text-muted-fg text-sm mb-8 italic">
          {currentCategory.description}
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-muted-fg text-center py-16">
          No items match the selected filters.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group rounded-2xl overflow-hidden border border-border bg-card flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {item.bestSeller && (
            <span className="text-xs font-semibold bg-accent text-accent-fg px-2.5 py-1 rounded-full">
              Best Seller
            </span>
          )}
          {item.featured && !item.bestSeller && (
            <span className="text-xs font-semibold bg-primary text-primary-fg px-2.5 py-1 rounded-full">
              Featured
            </span>
          )}
          {item.spicy && (
            <span className="text-xs bg-red-600 text-white px-2.5 py-1 rounded-full">
              🌶️ Spicy
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold text-card-fg leading-snug">
            {item.name}
          </h3>
          <p className="text-primary font-semibold text-lg flex-shrink-0">
            ₹{item.price}
          </p>
        </div>

        <p className="text-sm text-muted-fg leading-relaxed flex-1 mb-4">
          {item.description}
        </p>

        {item.dietary.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.dietary.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIETARY_COLORS[tag]}`}
              >
                {DIETARY_LABELS[tag]}
              </span>
            ))}
          </div>
        )}

        {item.allergens.length > 0 && (
          <p className="mt-2 text-xs text-muted-fg">
            Contains: {item.allergens.join(", ")}
          </p>
        )}
      </div>
    </article>
  );
}
