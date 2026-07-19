# Blog Posts Kaise Add Karein

## 1. Nayi Blog Post Banana

`src/pages/` mein ek nayi `.astro` file banao.
File ka naam hi URL ban jaata hai:
- `src/pages/best-gaming-mouse-2026.astro` → `laptopsspecial.com/best-gaming-mouse-2026`

### Template copy karo:
`src/pages/keyboard-latency-guide.astro` ko copy karo aur rename karo.

Top mein sirf yeh 3 cheezein badlo:
```
title="Apna Title Yahan"
description="Apna description yahan — 150 characters max"
canonical="https://laptopsspecial.com/apna-post-slug"
```

---

## 2. Images Kaise Add Karein

### Option A — Local Image (Recommended)
Image ko `src/assets/` folder mein daalo, phir post mein:

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/keyboard-photo.jpg';
---

<Image
  src={myImage}
  alt="Mechanical keyboard close up"
  width={800}
  height={450}
  format="webp"
/>
```

**Supported input formats:** JPG, PNG, GIF, TIFF, WebP, AVIF, SVG
**Output formats:** WebP (default), AVIF, PNG, JPG

Astro automatically:
- WebP/AVIF mein convert karta hai
- Resize karta hai
- `width` + `height` set karta hai (CLS prevent)
- Lazy loading add karta hai

---

### Option B — Remote Image (CDN/URL se)
```astro
---
import { Image } from 'astro:assets';
---

<Image
  src="https://images.unsplash.com/photo-xxxxx"
  alt="Gaming keyboard"
  width={800}
  height={450}
  inferSize={true}
/>
```

---

### Option C — Simple HTML img tag (bina optimization ke)
```html
<img src="/images/keyboard.webp" alt="Keyboard" width="800" height="450" loading="lazy" />
```
Iske liye image `public/images/` mein daalo.

---

## 3. Blog Listing Page Update Karna

`src/pages/blog/index.astro` mein posts array ke andar nayi entry add karo:

```js
const posts = [
  // ... existing posts ...
  {
    slug: "best-gaming-mouse-2026",        // URL slug (file ka naam)
    title: "Best Gaming Mouse 2026",
    excerpt: "Short description here...",
    category: "Mouse",                      // "Mouse" ya "Keyboards"
    date: "July 11, 2026",
    readTime: "5 min read",
    icon: "🖱"
  },
];
```

---

## 4. Sitemap Update Karna

`public/sitemap.xml` mein nayi URL add karo:
```xml
<url>
  <loc>https://laptopsspecial.com/best-gaming-mouse-2026</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## 5. Workflow Summary

1. `src/pages/` mein nayi `.astro` file banao
2. Images ko `src/assets/` mein daalo
3. `blog/index.astro` ke posts array mein entry add karo
4. `public/sitemap.xml` update karo
5. `git add . && git commit -m "new post" && git push`
6. Vercel auto-deploy karega in ~30 seconds

---

## Image Format Guide

| Format | Use Case | Size |
|--------|----------|------|
| WebP   | Photos, screenshots | Smallest |
| AVIF   | Photos (best compression) | Even smaller |
| PNG    | Screenshots with text | Lossless |
| SVG    | Icons, diagrams | Vector |
| JPG    | Photos (compatibility) | Medium |

**Tip:** Har image pe `alt` text zaroor daalo — SEO aur accessibility ke liye.
