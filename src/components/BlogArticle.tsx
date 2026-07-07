"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/I18nProvider";
import { type BlogPost, getRelatedPosts } from "@/config/blog";
import BlogCard from "./BlogCard";

function ContentBlock({ block }: { block: BlogPost["content"][number] }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-text-on-light text-base leading-relaxed mb-6">
          {block.text}
        </p>
      );

    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="font-[family-name:var(--font-inter)] text-2xl lg:text-3xl font-black tracking-tight text-text-on-light mt-12 mb-6">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 className="font-[family-name:var(--font-inter)] text-xl lg:text-2xl font-bold tracking-tight text-text-on-light mt-10 mb-4">
          {block.text}
        </h3>
      );

    case "image":
      if (block.fullBleed) {
        return (
          <figure className="my-10 -mx-6 lg:-mx-12">
            <Image
              src={block.url}
              alt={block.caption || ""}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
            />
            {block.caption && (
              <figcaption className="text-text-on-light-faint text-sm mt-3 text-center px-6">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      }
      return (
        <figure className="my-8">
          <Image
            src={block.url}
            alt={block.caption || ""}
            width={800}
            height={450}
            className="w-full h-auto object-cover rounded-xl"
          />
          {block.caption && (
            <figcaption className="text-text-on-light-faint text-sm mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "callout":
      return (
        <div className="my-8 p-6 bg-surface-dark rounded-xl border-l-4 border-accent">
          <p className="text-text-on-dark text-sm leading-relaxed font-medium">
            {block.text}
          </p>
        </div>
      );

    default:
      return null;
  }
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const relatedPosts = getRelatedPosts(post);
  const readingTimeLabel = t("blogV2.readingTime");

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <article className="min-h-screen bg-light-bg">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-24 pb-8">
        <span className="inline-block px-3 py-1 bg-surface-dark text-muted text-[10px] tracking-wider uppercase rounded-full mb-4">
          {t(`blogV2.pillars.${post.pillar}`)}
        </span>

        <h1 className="font-[family-name:var(--font-inter)] text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-text-on-light mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-text-on-light-muted text-sm">
          <span>{readingTimeLabel.replace("{{min}}", String(post.readingTime))}</span>
          <span>·</span>
          <span>{post.publishDate}</span>
          {post.author && (
            <>
              <span>·</span>
              <span>{post.author.name}</span>
            </>
          )}
        </div>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="mt-4 px-4 py-2 text-xs tracking-wider uppercase border border-border-light rounded-full text-text-on-light-muted hover:text-text-on-light hover:border-text-on-light transition-all duration-300"
        >
          {copied ? "✓ Copied" : t("blogArticle.share")}
        </button>
      </div>

      {/* Cover image */}
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image
          src={post.featuredImageUrl}
          alt={post.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Article body */}
      <div className="max-w-[720px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {post.content.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
      </div>

      {/* Photo gallery */}
      {post.relatedImages.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
          <h3 className="font-[family-name:var(--font-inter)] text-xl font-bold text-text-on-light mb-6">
            Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {post.relatedImages.map((img, index) => (
              <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={img.url}
                  alt={img.caption || ""}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA banner */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        <div className="bg-dark-bg rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="font-[family-name:var(--font-inter)] text-2xl lg:text-3xl font-black tracking-tight text-text-on-dark mb-4">
            {t("blogArticle.ctaTitle")}
          </h3>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-accent text-white text-sm tracking-wider uppercase font-bold hover:bg-white hover:text-text-on-light transition-all duration-300 rounded-full"
          >
            {t("blogArticle.ctaButton")}
          </a>
        </div>
      </div>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 border-t border-border-light">
          <h3 className="font-[family-name:var(--font-inter)] text-xl font-bold text-text-on-light mb-8">
            {t("blogArticle.relatedPosts")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <BlogCard post={related} readingTimeLabel={readingTimeLabel} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Back to blog */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 text-center">
        <a
          href="/#blog"
          className="text-text-on-light-muted text-sm hover:text-accent transition-colors duration-300"
        >
          ← {t("blogArticle.backToBlog")}
        </a>
      </div>
    </article>
  );
}
