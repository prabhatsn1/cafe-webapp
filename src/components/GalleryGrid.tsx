"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryImage } from "@/src/types/content";
import MotionSection from "./MotionSection";

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <MotionSection key={img.id} delay={i * 0.05} direction="up">
            <button
              onClick={() => setLightbox(img)}
              className="group block w-full overflow-hidden rounded-2xl relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              aria-label={`View: ${img.alt}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-hero-bg/0 group-hover:bg-hero-bg/30 transition-colors duration-300 flex items-end">
                  <p className="w-full px-4 pb-4 text-sm text-hero-fg font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {img.caption}
                  </p>
                </div>
              </div>
            </button>
          </MotionSection>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="relative max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="object-contain w-full h-full"
            />
            <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-6 py-3">
              {lightbox.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
