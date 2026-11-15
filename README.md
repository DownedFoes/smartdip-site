# Smart Dip — Landing Page

Static marketing site for **Smart Dip** (`smartdip.ca`), built for free hosting on [Cloudflare Pages](https://pages.cloudflare.com/).

## Stack

- HTML
- [Tailwind CSS](https://tailwindcss.com/) via CDN
- Vanilla JavaScript
- Custom CSS for brand motion (marquee, floats, glass form)

No build step required.

## Project structure

```
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── logo-badge.png
    ├── logo-wordmark.png
    ├── product-french-onion.png
    ├── mascot-lounge.png
    └── mascot-thumbs-up.png
```

Swap any file in `images/` keeping the same filename — the HTML references stay the same.

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → connect the repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (or leave as root)
4. Save and deploy. Point a custom domain to `smartdip.ca` when ready.

You can also use **Direct Upload** (drag-and-drop the folder) without Git.

## Contact form

The inquiry form uses client-side validation and a thank-you success state (no backend). To capture submissions later, wire the form to Formspree, a Cloudflare Worker, or similar without changing the layout.
