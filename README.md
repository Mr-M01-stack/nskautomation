# NSK Automation — Website (nskautomation.co.in)

Landing page for **NSK Automation**, Hosur — Automation Line & Machine Building.
Plain HTML/CSS/JS (no build tools, no frameworks). Live on **GitHub Pages** at
**https://www.nskautomation.co.in**.

## Project structure

```
E:\nsk-automation\
├── index.html          All sections (single page)
├── css/style.css       Theme — logo royal blue (#0d40d0) + azure accent (#3b82f6)
├── js/main.js          Mobile nav, scroll reveal, contact form (Formspree), video modal
├── repo/               ⭐ GitHub Pages deploy copy (the source of truth for live site)
│   ├── index.html · css · js · assets · CNAME · CONTENT.md (how-to-add content)
│   └── docs/DNS-SETUP.md
├── backup/             Flat v1, v2-flat-blue, 3d-experiment, full-res videos,
│   └── original-images etc. (never published)
├── preview-deploy/     Snapshot for Netlify Drop previews (not published)
├── assets/
│   ├── images/         WebP-optimized photos + logo.webp
│   └── videos/         720p H.264 clips (~34 MB total, played on demand)
└── README.md
```

## Design state

Flat **logo blue** theme (royal blue + azure). A CSS 3D-style experiment was tried and
reverted — kept in `backup/3d-experiment/`. The logo swap is permanent.

## Live site workflow (maintenance)

Site is hosted on GitHub Pages from the `repo/` folder, custom domain is
**www.nskautomation.co.in** (apex `nskautomation.co.in` redirects to `www`).

1. Edit files under `E:\nsk-automation\repo\` (copy a card block — see CONTENT.md).
2. `git add . && git commit -m "change" && git push origin main`
3. Live in 1–3 minutes. No FTP, no hosting login, no DNS changes.

Content additions (new machines, projects, videos, photos) are covered step-by-step in
`repo/CONTENT.md`.

## Deployment history

| Date | Stage |
|---|---|
| Build | Flat v1 → logo-blue restyle → corporate/dark industrial redesign (client approved) |
| Optimize | Images 5.7MB→1.6MB (WebP + lazy), videos 341MB→34MB (720p) |
| Go live | GitHub Pages + GoDaddy DNS (client account) — pending client DNS step |

## Assets

### Images (assets/images/)
WebP where transparency matters, JPEG for photos, all lazy-loaded below the fold.

### Videos (assets/videos/) — 720p H.264 MP4
| File | Played by |
|---|---|
| `pvc-welding-01/02/03.mp4` | PVC Welding card (Clip 1/2/3) |
| `tata-electronics-project.mp4` | Tata Electronics card (inline) |
| `paper-machine.mp4` | Paper Machine |
| `rotary-welding.mp4` | Rotary Welding |

Full-res originals are kept in `backup/full-res-videos/` — do not commit them
(they exceed GitHub's 100MB/file and 1GB site limit). Rubber cutting video stays
"Video coming soon" until an MP4 is provided (see CONTENT.md §3).

## Enquiry form

Posts to **Formspree** on submit → emails `nskautomation@nskautomation.co.in`.
The endpoint lives in `js/main.js` (`FORM_ENDPOINT`). To change the receiving address,
edit the destination in the Formspree dashboard. Gmail is mentioned as a fallback in the
contact section note.

## Contact details on the site
- Plot No: 126, Breeze Town, Viswanathapuram vil, Bagalur Road, Hosur – 635109
- +91 82176 06571 · +91 94433 79795
- nskautomation@nskautomation.co.in · nskautomationhsr@gmail.com
- nskautomation.co.in · GST: 33HUFPS8016A1ZR