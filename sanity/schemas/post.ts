import { defineType, defineField } from "sanity";

function sanitize(s?: string) {
  return !s ? "" : s.replace(/\s+/g, " ").replace(/[\r\n]+/g, " ").trim();
}
function truncate(s: string, max = 155) {
  if (!s || s.length <= max) return s || "";
  const t = s.slice(0, max - 1);
  const i = t.lastIndexOf(" ");
  return (i > Math.floor(max * 0.7) ? t.slice(0, i) : t).trim() + "…";
}

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    // ── BASIC ─────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 120 },
      validation: (Rule) => Rule.required(),
      description: "URL: laptopsspecial.com/your-slug — /blog/ nahi aata",
    }),
    defineField({
      name: "oldSlugs",
      title: "Old Slugs (redirects ke liye)",
      type: "array",
      of: [{ type: "string" }],
      description: "Agar pehle koi aur URL tha to yahan daalo — redirect auto hoga.",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (Short Description)",
      type: "text",
      rows: 3,
      description: "Blog listing aur SEO mein use hoga.",
    }),

    // ── FEATURE IMAGE ──────────────────────────────────────
    defineField({
      name: "mainImage",
      title: "Feature Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "altText",
          title: "Alt Text",
          type: "string",
          description: "SEO aur accessibility ke liye — describe the image.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ── AUTHOR / META ──────────────────────────────────────
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published On",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: 'e.g. "5 min read"',
    }),

    // ── TAXONOMY ───────────────────────────────────────────
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    // ── CONTENT ────────────────────────────────────────────
    defineField({
      name: "body",
      title: "Content",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),

    // ── FAQ ────────────────────────────────────────────────
    defineField({
      name: "faqs",
      title: "FAQs",
      description: "Yahan add karo — FAQ schema (JSON-LD) auto generate hoga.",
      type: "array",
      of: [{
        type: "object",
        fields: [
          {
            name: "question",
            title: "Question",
            type: "string",
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: "answer",
            title: "Answer",
            type: "text",
            rows: 4,
            validation: (Rule: any) => Rule.required(),
          },
        ],
        preview: { select: { title: "question" } },
      }],
    }),

    // ── SEO ────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Blank raho → post title auto use hoga. Max 60 chars.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Blank raho → excerpt auto use hoga. Max 155 chars.",
      validation: (Rule) => Rule.max(155),
    }),
    defineField({
      name: "seoImage",
      title: "SEO / OG Image",
      type: "image",
      description: "Social sharing ke liye. Blank → feature image use hoga.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "altText", title: "Alt Text", type: "string" }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      subtitle: "excerpt",
      seoTitle: "seoTitle",
      seoDescription: "seoDescription",
    },
    prepare(sel) {
      const { title, author, media, subtitle, seoTitle, seoDescription } = sel || {};
      const finalTitle = truncate(sanitize(seoTitle || title || ""), 60) || "Untitled";
      const rawDesc = sanitize(seoDescription || subtitle || title || "");
      const finalDesc = rawDesc ? truncate(rawDesc, 155) : "No description";
      return {
        title: finalTitle,
        subtitle: author ? `by ${author} — ${finalDesc}` : finalDesc,
        media,
      };
    },
  },
});
