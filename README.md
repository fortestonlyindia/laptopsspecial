# LaptopsSpecial — Astro.js

Fast, static rebuild of laptopsspecial.com tools using Astro.js.

## Tools Included
- `/` → Keyboard Tester (latency, scan rate, key history)
- `/mouse-rate-test` → Mouse Rate Test (polling rate, click stats, heatmap, export)

## Local Development

```bash
npm install
npm run dev
# Visit http://localhost:4321
```

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
# Follow prompts → auto-detects Astro
# Add custom domain in Vercel dashboard
```

### Option 2: GitHub + Vercel (Recommended)
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import repo
3. Vercel auto-detects Astro → click Deploy
4. Go to Settings → Domains → Add `laptopsspecial.com`
5. Update DNS at your registrar:
   - A record: `76.76.21.21`
   - CNAME `www`: `cname.vercel-dns.com`

## Project Structure
```
src/
  layouts/Base.astro    ← Nav + Footer + SEO
  pages/
    index.astro         ← Keyboard Tester
    mouse-rate-test.astro ← Mouse Rate Test
```

## Adding More Tools
Copy any page, update the `<Base>` props (title, description), build your tool in the `<style>` + `<script>` blocks. Zero framework overhead — pure browser JS.
