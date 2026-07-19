import { defineType, defineArrayMember, defineField } from "sanity";

export default defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    // ── TEXT BLOCKS ──────────────────────────────────────
    defineArrayMember({
      type: "block",
      options: { spellCheck: true },
      styles: [
        { title: "Normal",     value: "normal"     },
        { title: "H2",         value: "h2"         },
        { title: "H3",         value: "h3"         },
        { title: "H4",         value: "h4"         },
        { title: "Quote",      value: "blockquote" },
      ],
      lists: [
        { title: "Bullet",   value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold",      value: "strong"        },
          { title: "Italic",    value: "em"            },
          { title: "Underline", value: "underline"     },
          { title: "Strike",    value: "strike-through"},
          { title: "Code",      value: "code"          },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href",   type: "url",     title: "URL"          },
              { name: "blank",  type: "boolean", title: "Open new tab",
                initialValue: true },
              { name: "rel",    type: "string",
                title: "Rel attribute",
                description: "e.g. nofollow, sponsored, ugc",
                options: { list: ["nofollow","sponsored","ugc",""] }
              },
            ],
          },
          // Affiliate link annotation — adds rel=sponsored automatically
          {
            name: "affiliateLink",
            type: "object",
            title: "Affiliate Link",
            fields: [
              { name: "href",    type: "url",    title: "Affiliate URL" },
              { name: "program", type: "string", title: "Program (e.g. Amazon, Flipkart)" },
            ],
          },
        ],
      },
    }),

    // ── IMAGE WITH ALT + CAPTION ──────────────────────────
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "SEO aur accessibility ke liye zaroori.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption (optional)",
        }),
      ],
    }),

    // ── CODE SNIPPET (@sanity/code-input — syntax highlighted editor) ──
    // Provides Monaco editor with full syntax highlighting in Sanity Studio
    defineArrayMember({
      name: "codeBlock",
      title: "Code Snippet",
      type: "object",
      fields: [
        defineField({
          name: "filename",
          type: "string",
          title: "Filename (optional)",
          description: "e.g. index.js, style.css, keyboard-tester.ts",
        }),
        defineField({
          name: "highlightedLines",
          type: "array",
          title: "Highlighted Lines (optional)",
          description: "Line numbers to highlight, e.g. [1, 3, 5]",
          of: [{ type: "number" }],
        }),
        defineField({
          // Uses @sanity/code-input → Monaco editor with syntax highlighting
          name: "code",
          title: "Code",
          type: "code",
          options: {
            language: "javascript",          // default language
            languageAlternatives: [
              { title: "JavaScript",   value: "javascript"  },
              { title: "TypeScript",   value: "typescript"  },
              { title: "HTML",         value: "html"        },
              { title: "CSS",          value: "css"         },
              { title: "Bash / Shell", value: "sh"          },
              { title: "JSON",         value: "json"        },
              { title: "Python",       value: "python"      },
              { title: "Markdown",     value: "markdown"    },
              { title: "Plain Text",   value: "text"        },
            ],
            withFilename: false,  // We handle filename separately above
          },
        }),
      ],
      preview: {
        select: {
          filename:  "filename",
          language:  "code.language",
          codeText:  "code.code",
        },
        prepare({ filename, language, codeText }: any) {
          const lang = language || "code";
          const preview = codeText?.slice(0, 55) || "";
          return {
            title: filename ? `📄 ${filename}` : `💻 ${lang} snippet`,
            subtitle: preview + (codeText?.length > 55 ? "…" : ""),
          };
        },
      },
    }),

    // ── TABBED CODE BLOCK ──────────────────────────────────────────────────
    // HTML + CSS + JS alag-alag tabs mein — ek hi component
    defineArrayMember({
      name: "tabbedCode",
      type: "object",
      title: "Tabbed Code Block (HTML / CSS / JS)",
      description: "Multiple language tabs — HTML, CSS, JavaScript alag-alag daalo",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Block Title (optional)",
          description: "e.g. 'Keyboard Tester Example', 'Mouse Rate Test'",
        }),
        defineField({
          name: "tabs",
          type: "array",
          title: "Code Tabs",
          description: "Har tab ke liye ek entry — HTML, CSS, JS etc.",
          of: [
            {
              type: "object",
              name: "codeTab",
              title: "Code Tab",
              fields: [
                defineField({
                  name: "label",
                  type: "string",
                  title: "Tab Label",
                  description: "e.g. HTML, CSS, JavaScript, TypeScript, Bash",
                }),
                defineField({
                  name: "language",
                  type: "string",
                  title: "Language",
                  options: {
                    list: [
                      { title: "HTML",         value: "html"       },
                      { title: "CSS",          value: "css"        },
                      { title: "JavaScript",   value: "javascript" },
                      { title: "TypeScript",   value: "typescript" },
                      { title: "Bash / Shell", value: "bash"       },
                      { title: "JSON",         value: "json"       },
                      { title: "Python",       value: "python"     },
                      { title: "Plain Text",   value: "text"       },
                    ],
                  },
                }),
                defineField({
                  name: "filename",
                  type: "string",
                  title: "Filename (optional)",
                  description: "e.g. index.html, style.css, app.js",
                }),
                defineField({
                  name: "code",
                  type: "text",
                  title: "Code",
                  rows: 12,
                }),
              ],
              preview: {
                select: { label: "label", filename: "filename", code: "code" },
                prepare({ label, filename, code }: any) {
                  return {
                    title: filename ? `${label || "?"}: ${filename}` : (label || "Tab"),
                    subtitle: code?.slice(0, 60) || "",
                  };
                },
              },
            },
          ],
          validation: (Rule: any) => Rule.min(1).max(5),
        }),
      ],
      preview: {
        select: { title: "title", tabs: "tabs" },
        prepare({ title, tabs }: any) {
          const labels = (tabs || []).map((t: any) => t.label || t.language || "?").join(" | ");
          return {
            title: title ? `🗂 ${title}` : "🗂 Tabbed Code Block",
            subtitle: labels,
          };
        },
      },
    }),

    // ── CALLOUT BOX ──────────────────────────────────────
    defineArrayMember({
      name: "callout",
      type: "object",
      title: "Callout Box",
      fields: [
        defineField({ name: "emoji", type: "string", title: "Emoji", initialValue: "💡" }),
        defineField({ name: "text",  type: "text",   title: "Text" }),
      ],
      preview: {
        select: { emoji: "emoji", text: "text" },
        prepare({ emoji, text }: any) {
          return { title: `${emoji || "💡"} ${text?.slice(0, 60) || "Callout"}` };
        },
      },
    }),

    // ── YOUTUBE EMBED ─────────────────────────────────────
    defineArrayMember({
      name: "youtube",
      type: "object",
      title: "YouTube Embed",
      fields: [
        defineField({ name: "url",   type: "url",    title: "YouTube URL" }),
        defineField({ name: "title", type: "string", title: "Video Title (for accessibility)" }),
      ],
      preview: {
        select: { url: "url", title: "title" },
        prepare({ url, title }: any) {
          return { title: title || "YouTube Video", subtitle: url };
        },
      },
    }),

    // ── TABLE ─────────────────────────────────────────────
    defineArrayMember({
      name: "table",
      type: "object",
      title: "Table",
      fields: [
        defineField({
          name: "caption",
          type: "string",
          title: "Table Caption (optional)",
        }),
        defineField({
          name: "hasHeaderRow",
          type: "boolean",
          title: "First row is header?",
          initialValue: true,
        }),
        defineField({
          name: "rows",
          type: "array",
          title: "Rows",
          of: [{
            type: "object",
            fields: [{
              name: "cells",
              type: "array",
              title: "Cells",
              of: [{ type: "string" }],
            }],
            preview: {
              select: { cells: "cells" },
              prepare({ cells }: any) {
                return { title: (cells || []).join(" | ") };
              },
            },
          }],
        }),
      ],
    }),
  ],
});
