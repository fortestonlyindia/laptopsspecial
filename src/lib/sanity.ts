import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset   = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const hasConfig = projectId && /^[a-z0-9-]+$/.test(projectId);

let sanityClient: any = null;
let builder: any = null;

if (hasConfig) {
  sanityClient = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: true,
  });
  builder = imageUrlBuilder(sanityClient);
}

export { sanityClient };

export function urlFor(source: any) {
  if (!builder) return { url: () => '', width: () => ({ url: () => '' }), height: () => ({ url: () => '' }), auto: () => ({ url: () => '' }) } as any;
  return builder.image(source);
}

async function safeFetch<T>(query: string, params: Record<string, any> = {}): Promise<T[]> {
  if (!sanityClient) return [];
  try {
    const result = await sanityClient.fetch(query, params);
    return result || [];
  } catch (e: any) {
    console.warn('[Sanity] fetch failed:', e?.message || e);
    return [];
  }
}

export async function getAllPosts() {
  return safeFetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title,
      "slug": slug.current,
      excerpt, publishedAt,
      "categories": categories[]->title,
      tags, mainImage { asset, altText }, readTime
    }`
  );
}

export async function getPostBySlug(slug: string) {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id, title,
        "slug": slug.current,
        excerpt, publishedAt,
        "categories": categories[]->title,
        tags,
        mainImage { asset, altText },
        "author": author->{ name, "slug": slug.current, image },
        body, faqs,
        seoTitle, seoDescription,
        seoImage { asset, altText },
        readTime
      }`,
      { slug }
    );
  } catch (e: any) {
    console.warn('[Sanity] getPostBySlug failed:', e?.message);
    return null;
  }
}

export async function getAllPostSlugs() {
  return safeFetch<{ slug: string }>(
    `*[_type == "post"] { "slug": slug.current }`
  );
}

export async function getRelatedPosts(currentSlug: string, categories: string[]) {
  return safeFetch(
    `*[_type == "post" && slug.current != $currentSlug
       && count((categories[]->title)[@ in $categories]) > 0
    ] | order(publishedAt desc) [0...3] {
      title, "slug": slug.current, excerpt,
      mainImage { asset, altText },
      "categories": categories[]->title
    }`,
    { currentSlug, categories }
  );
}
