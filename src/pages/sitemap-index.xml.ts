import type { APIRoute } from "astro";
import { getAllPostSlugs } from "../lib/sanity";

const staticPages = [
  { url: "", priority: "1.0", changefreq: "weekly" },
  { url: "mouse-rate-test", priority: "0.9", changefreq: "weekly" },
  { url: "blog", priority: "0.8", changefreq: "weekly" },
  { url: "keyboard-latency-guide", priority: "0.7", changefreq: "monthly" },
  { url: "about", priority: "0.5", changefreq: "monthly" },
  { url: "contact", priority: "0.5", changefreq: "monthly" },
  { url: "privacy", priority: "0.3", changefreq: "yearly" },
  { url: "terms", priority: "0.3", changefreq: "yearly" },
  { url: "disclaimer", priority: "0.3", changefreq: "yearly" },
  { url: "dmca", priority: "0.3", changefreq: "yearly" },
];

export const GET: APIRoute = async () => {
  const SITE = "https://laptopsspecial.com";

  let blogSlugs: any[] = [];
  try {
    blogSlugs = (await getAllPostSlugs()) || [];
  } catch (e) {
    blogSlugs = [];
  }

  const staticUrls = staticPages
    .map(
      (p) =>
        `<url><loc>${SITE}/${p.url}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
    )
    .join("\n  ");

  const blogUrls = blogSlugs
    .map(
      (s: any) =>
        `<url><loc>${SITE}/${s.slug}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    )
    .join("\n  ");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${blogUrls}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
};
