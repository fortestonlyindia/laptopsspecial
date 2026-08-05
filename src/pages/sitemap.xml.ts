import type { APIRoute } from "astro";
import { getAllPosts } from "../lib/sanity";

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();

  const staticPages = [
    "https://laptopsspecial.com/",
    "https://laptopsspecial.com/mouse-rate-test/",
    "https://laptopsspecial.com/blog/",
    "https://laptopsspecial.com/keyboard-latency-guide/",
    "https://laptopsspecial.com/monitor-refresh-rate-test/",
    "https://laptopsspecial.com/about/",
    "https://laptopsspecial.com/contact/",
    "https://laptopsspecial.com/privacy/",
    "https://laptopsspecial.com/terms/",
    "https://laptopsspecial.com/disclaimer/",
    "https://laptopsspecial.com/dmca/",
  ];

  const postUrls = posts.map(
    (post: any) => `https://laptopsspecial.com/${post.slug}/`,
  );

  const allUrls = [...staticPages, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>${url.includes("/blog/") && url !== "https://laptopsspecial.com/blog/" ? "monthly" : "weekly"}</changefreq>
    <priority>${url === "https://laptopsspecial.com/" ? "1.0" : url.includes("/blog/") ? "0.8" : "0.6"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
