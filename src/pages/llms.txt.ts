import type { APIRoute } from "astro";
import { getAllPosts } from "../lib/sanity";

const MAX_POSTS_LISTED = 25; // Keep the file concise as the blog grows

export const GET: APIRoute = async () => {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, MAX_POSTS_LISTED);

  const postLines = posts
    .map((post: any) => {
      const desc = post.excerpt ? `: ${post.excerpt}` : "";
      return `- [${post.title}](https://laptopsspecial.com/${post.slug}/)${desc}`;
    })
    .join("\n");

  const morePostsNote =
    allPosts.length > MAX_POSTS_LISTED
      ? `\n\n(${allPosts.length - MAX_POSTS_LISTED} more posts available — see the full [blog index](https://laptopsspecial.com/blog/) or [sitemap](https://laptopsspecial.com/sitemap.xml).)`
      : "";

  const content = `# Laptops Special

> Free browser-based hardware diagnostic tools for testing keyboards, mice, and monitors — no downloads, no signup required. Also publishes guides on peripheral latency, polling rates, and PC performance topics.

## Tools

- [Keyboard Tester](https://laptopsspecial.com/tools/keyboard-latency-tester/): Full 104-key keyboard tester that measures shortest key press time and estimated scan rate live in the browser.
- [Mouse Rate Test](https://laptopsspecial.com/tools/mouse-rate-test/): Tests real mouse polling rate (up to 8000Hz), click latency, jitter, and movement speed with live heatmap and CPS counter.
- [Monitor Refresh Rate Test](https://laptopsspecial.com/tools/monitor-refresh-rate-test/): Measures actual monitor refresh rate and frame consistency with a stability grade, motion clarity test, and VRR/G-Sync simulator.
- [All Tools Hub](https://laptopsspecial.com/): Overview page linking to all diagnostic tools with FAQs on browser-based hardware testing.

## Guides

- [Keyboard Latency Guide](https://laptopsspecial.com/keyboard-latency-guide/): Explains scan rate, polling rate, and system latency, and how each affects gaming performance.

## Blog

- [Blog Index](https://laptopsspecial.com/blog/): Full list of all published articles.
${postLines || "- No blog posts published yet."}${morePostsNote}

## Optional

- [About Us](https://laptopsspecial.com/about/): Information about Laptops Special.
- [Contact](https://laptopsspecial.com/contact/): How to get in touch.
- [Privacy Policy](https://laptopsspecial.com/privacy/)
- [Terms of Service](https://laptopsspecial.com/terms/)
- [Disclaimer](https://laptopsspecial.com/disclaimer/)
- [DMCA](https://laptopsspecial.com/dmca/)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
