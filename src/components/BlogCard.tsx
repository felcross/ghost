"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n/I18nProvider";
import type { BlogPost, BlogContentSize } from "@/config/blog";

const sizeClasses: Record<BlogContentSize, string> = {
  square: "aspect-square",
  wide: "aspect-[2/1]",
  tall: "aspect-[3/4]",
};

export default function BlogCard({
  post,
  isHovered,
  isDimmed,
  readingTimeLabel,
}: {
  post: BlogPost;
  isHovered?: boolean;
  isDimmed?: boolean;
  readingTimeLabel: string;
}) {
  const { t } = useTranslation();

  return (
    <a
      href={post.href}
      className="group block"
      style={{ opacity: isDimmed ? 0.4 : 1, transition: "opacity 350ms cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div
        className={`bg-overlay-light overflow-hidden rounded-2xl mb-4 ${sizeClasses[post.size]}`}
        style={{ transform: isHovered ? "scale(1.03)" : "scale(1)", transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <Image
          src={post.featuredImageUrl}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <span className="inline-block px-3 py-1 bg-surface-dark text-muted text-[10px] tracking-wider uppercase rounded-full mb-3">
        {t(`blogV2.pillars.${post.pillar}`)}
      </span>

      <h3 className="font-[family-name:var(--font-inter)] text-lg font-bold text-text-on-light group-hover:text-accent transition-colors duration-300 mb-2">
        {post.title}
      </h3>

      <p className="text-text-on-light-muted text-sm leading-relaxed mb-3 line-clamp-2">
        {post.excerpt}
      </p>

      <div className="flex items-center gap-3 text-text-on-light-faint text-xs">
        <span>{readingTimeLabel.replace("{{min}}", String(post.readingTime))}</span>
        <span>·</span>
        <span>{post.publishDate}</span>
      </div>
    </a>
  );
}
