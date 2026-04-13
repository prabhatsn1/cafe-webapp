"use client";

import { useState, useId } from "react";
import type { FaqItem } from "@/src/types/content";

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const headingId = useId();

  return (
    <div className="divide-y divide-border">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const answerId = `${headingId}-answer-${item.id}`;
        const questionId = `${headingId}-question-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={questionId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="w-full flex items-center justify-between gap-4 py-5 text-left font-semibold text-foreground hover:text-primary transition-colors"
              >
                <span className="text-base md:text-lg">{item.question}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-primary transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </h3>

            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-muted-fg leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
