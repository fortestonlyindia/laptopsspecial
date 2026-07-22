import { defineType, defineArrayMember, defineField } from "sanity";

// ── TEXT COLOR OPTIONS ─────────────────────────────────────────────────────
const textColors = [
  { title: "Default", value: "default" },
  { title: "🔴 Red", value: "red" },
  { title: "🟠 Orange", value: "orange" },
  { title: "🟡 Yellow", value: "yellow" },
  { title: "🟢 Green", value: "green" },
  { title: "🔵 Blue", value: "blue" },
  { title: "🟣 Purple", value: "purple" },
  { title: "🩷 Pink", value: "pink" },
  { title: "⚫ Dark Gray", value: "gray-dark" },
  { title: "🩶 Gray", value: "gray" },
  { title: "⚪ Light Gray", value: "gray-light" },
  { title: "🤍 White", value: "white" },
  { title: "🩵 Cyan", value: "cyan" },
];

const highlightColors = [
  { title: "🟡 Yellow", value: "highlight-yellow" },
  { title: "🟢 Green", value: "highlight-green" },
  { title: "🔵 Blue", value: "highlight-blue" },
  { title: "🔴 Red", value: "highlight-red" },
  { title: "🟣 Purple", value: "highlight-purple" },
  { title: "🟠 Orange", value: "highlight-orange" },
  { title: "🩷 Pink", value: "highlight-pink" },
  { title: "⚫ Dark", value: "highlight-dark" },
];

export default defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    // ── TEXT BLOCKS ──────────────────────────────────────────────────────────
    defineArrayMember({
      type: "block",
      options: { spellCheck: true },
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strikethrough", value: "strike-through" },
          { title: "Code", value: "code" },
          { title: "Superscript", value: "sup" },
          { title: "Subscript", value: "sub" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule: any) => Rule.required(),
              },
              {
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: true,
              },
              {
                name: "rel",
                type: "string",
                title: "Rel attribute",
                description: "Leave blank for normal links",
                options: { list: ["", "nofollow", "sponsored", "ugc"] },
              },
            ],
          },
          {
            name: "affiliateLink",
            type: "object",
            title: "Affiliate Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "Affiliate URL",
                validation: (Rule: any) => Rule.required(),
              },
              {
                name: "program",
                type: "string",
                title: "Program",
                description: "e.g. Amazon, Flipkart, Meesho",
              },
            ],
          },
          {
            name: "textColor",
            type: "object",
            title: "Text Color",
            fields: [
              {
                name: "color",
                type: "string",
                title: "Color",
                options: { list: textColors },
                initialValue: "default",
                validation: (Rule: any) => Rule.required(),
              },
            ],
          },
          {
            name: "highlight",
            type: "object",
            title: "Highlight",
            fields: [
              {
                name: "color",
                type: "string",
                title: "Highlight Color",
                options: { list: highlightColors },
                initialValue: "highlight-yellow",
                validation: (Rule: any) => Rule.required(),
              },
            ],
          },
          {
            name: "fontSize",
            type: "object",
            title: "Font Size",
            fields: [
              {
                name: "size",
                type: "string",
                title: "Size",
                options: {
                  list: [
                    { title: "XS (0.75rem)", value: "xs" },
                    { title: "SM (0.875rem)", value: "sm" },
                    { title: "Base (1rem)", value: "base" },
                    { title: "LG (1.125rem)", value: "lg" },
                    { title: "XL (1.25rem)", value: "xl" },
                    { title: "2XL (1.5rem)", value: "2xl" },
                    { title: "3XL (1.875rem)", value: "3xl" },
                  ],
                },
                initialValue: "base",
              },
            ],
          },
        ],
      },
    }),

    // ── IMAGE WITH ALT + CAPTION ─────────────────────────────────────────────
    defineArrayMember({
      type: "image",
      options: {
        hotspot: true,
        // studioInputOptions: prevent auto-confirm so user can type alt text
        accept: "image/*",
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description:
            "Image upload ke baad yahan alt text likho — SEO ke liye zaroori.",
          // No validation required so it doesn't auto-submit
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption (optional)",
        }),
      ],
    }),

    // ── CODE SNIPPET ─────────────────────────────────────────────────────────
    defineArrayMember({
      name: "codeBlock",
      title: "Code Snippet",
      type: "object",
      fields: [
        defineField({
          name: "filename",
          type: "string",
          title: "Filename (optional)",
          description: "e.g. index.js, style.css",
        }),
        defineField({
          name: "highlightedLines",
          type: "array",
          title: "Highlighted Lines (optional)",
          description: "e.g. [1, 3, 5]",
          of: [{ type: "number" }],
        }),
        defineField({
          name: "code",
          title: "Code",
          type: "code",
          options: {
            language: "javascript",
            languageAlternatives: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "Bash / Shell", value: "sh" },
              { title: "JSON", value: "json" },
              { title: "Python", value: "python" },
              { title: "Markdown", value: "markdown" },
              { title: "Plain Text", value: "text" },
            ],
            withFilename: false,
          },
        }),
      ],
      preview: {
        select: {
          filename: "filename",
          language: "code.language",
          codeText: "code.code",
        },
        prepare({ filename, language, codeText }: any) {
          return {
            title: filename
              ? `📄 ${filename}`
              : `💻 ${language || "code"} snippet`,
            subtitle:
              (codeText || "").slice(0, 55) +
              (codeText?.length > 55 ? "…" : ""),
          };
        },
      },
    }),

    // ── TABBED CODE BLOCK (Fixed HTML/CSS/JS — no nested array issues) ──────
    defineArrayMember({
      name: "tabbedCode",
      type: "object",
      title: "Tabbed Code Block (HTML / CSS / JS)",
      description:
        "HTML, CSS, JavaScript alag-alag boxes mein daalo — jo blank chhodoge uska tab nahi banega.",
      options: {
        modal: { type: "dialog", width: 2 },
      },
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Block Title (optional)",
        }),
        defineField({
          name: "htmlCode",
          type: "text",
          title: "HTML",
          rows: 10,
        }),
        defineField({
          name: "cssCode",
          type: "text",
          title: "CSS",
          rows: 10,
        }),
        defineField({
          name: "jsCode",
          type: "text",
          title: "JavaScript",
          rows: 10,
        }),
      ],
      preview: {
        select: {
          title: "title",
          html: "htmlCode",
          css: "cssCode",
          js: "jsCode",
        },
        prepare({ title, html, css, js }: any) {
          const present = [html ? "HTML" : "", css ? "CSS" : "", js ? "JS" : ""]
            .filter(Boolean)
            .join(" | ");
          return {
            title: title ? `🗂 ${title}` : "🗂 Tabbed Code Block",
            subtitle: present || "Empty",
          };
        },
      },
    }),

    // ── CALLOUT BOX ──────────────────────────────────────────────────────────
    defineArrayMember({
      name: "callout",
      type: "object",
      title: "Callout Box",
      fields: [
        defineField({
          name: "emoji",
          type: "string",
          title: "Emoji",
          initialValue: "💡",
        }),
        defineField({ name: "text", type: "text", title: "Text" }),
        defineField({
          name: "variant",
          type: "string",
          title: "Style",
          initialValue: "info",
          options: {
            list: [
              { title: "💡 Info (Blue)", value: "info" },
              { title: "⚠️ Warning (Amber)", value: "warning" },
              { title: "✅ Success (Green)", value: "success" },
              { title: "❌ Error (Red)", value: "error" },
              { title: "📌 Note (Purple)", value: "note" },
            ],
          },
        }),
      ],
      preview: {
        select: { emoji: "emoji", text: "text", variant: "variant" },
        prepare({ emoji, text, variant }: any) {
          return {
            title: `${emoji || "💡"} ${text?.slice(0, 60) || "Callout"}`,
            subtitle: variant || "info",
          };
        },
      },
    }),

    // ── YOUTUBE EMBED ─────────────────────────────────────────────────────────
    defineArrayMember({
      name: "youtube",
      type: "object",
      title: "YouTube Embed",
      fields: [
        defineField({ name: "url", type: "url", title: "YouTube URL" }),
        defineField({
          name: "title",
          type: "string",
          title: "Video Title (for accessibility)",
        }),
        defineField({
          name: "startAt",
          type: "number",
          title: "Start at (seconds, optional)",
        }),
      ],
      preview: {
        select: { url: "url", title: "title" },
        prepare({ url, title }: any) {
          return { title: title || "YouTube Video", subtitle: url };
        },
      },
    }),

    // ── TABLE (Easy-to-use grid) ──────────────────────────────────────────────
    // Problem: purani table mein rows ke andar cells add karna confusing tha
    // Solution: Fixed named columns (c1-c6), simple row entry
    // ── TABLE (Easy Paste — Excel/Sheets se copy-paste bhi chalega) ─────────
    defineArrayMember({
      name: "table",
      type: "object",
      title: "Table",
      description:
        "Excel/Google Sheets se seedha copy-paste karo, ya khud type karo. Har row = ek naya line. Columns ko | (pipe) se separate karo.",
      options: {
        modal: { type: "dialog", width: 2 },
      },
      fields: [
        defineField({
          name: "caption",
          type: "string",
          title: "Table Caption (optional)",
        }),
        defineField({
          name: "hasHeaderRow",
          type: "boolean",
          title: "Pehli row header hai? (bold + background)",
          initialValue: true,
        }),
        defineField({
          name: "tableData",
          type: "text",
          title: "Table Data",
          rows: 10,
          description:
            "Example:\nProduct | Price | Rating\nThinkPad X1 | ₹85,000 | 4.5\nMacBook Air M2 | ₹95,000 | 4.8\n\nGoogle Sheets se copy karke paste karoge to tabs auto-detect ho jaayenge, pipe bhi chalega.",
          validation: (Rule: any) => Rule.required(),
        }),
      ],
      preview: {
        select: { caption: "caption", tableData: "tableData" },
        prepare({ caption, tableData }: any) {
          const lines = (tableData || "")
            .split("\n")
            .filter((l: string) => l.trim());
          const cols = lines[0]
            ? lines[0].split(/\t|\|/).filter((c: string) => c.trim()).length
            : 0;
          return {
            title: caption ? `📊 ${caption}` : "📊 Table",
            subtitle: `${lines.length} rows × ${cols} columns`,
          };
        },
      },
    }),

    // ── DIVIDER ───────────────────────────────────────────────────────────────
    defineArrayMember({
      name: "divider",
      type: "object",
      title: "Divider (Horizontal Line)",
      fields: [
        defineField({
          name: "style",
          type: "string",
          title: "Style",
          initialValue: "line",
          options: {
            list: [
              { title: "── Line", value: "line" },
              { title: "· · · Dots", value: "dots" },
              { title: "⭐ Stars", value: "stars" },
            ],
          },
        }),
      ],
      preview: {
        select: { style: "style" },
        prepare({ style }: any) {
          const icons: Record<string, string> = {
            line: "────────",
            dots: "· · · · ·",
            stars: "⭐ ⭐ ⭐",
          };
          return { title: icons[style] || "────────" };
        },
      },
    }),
  ],
});
