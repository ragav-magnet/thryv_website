# THRYV™ PARTNERS — Website (React + Vite)

React conversion of `thryv_website_production_v6.html`, with all original content preserved, a refreshed responsive design, motion effects and a new contact form.

## Quick start

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build locally
```

Requires Node 18+.

## Folder structure

```
thryv-website/
├── index.html                  # HTML shell, meta tags, Inter font
├── public/favicon.png          # original favicon (extracted from the HTML)
├── .env.example                # optional contact-form endpoint
└── src/
    ├── main.jsx                # entry point
    ├── App.jsx                 # page composition
    ├── assets/images/          # logo + footer mark (extracted from the HTML)
    ├── data/
    │   ├── siteConfig.js       # email, phone, nav links — edit contact details here
    │   └── content.js          # all page copy, section by section
    ├── hooks/
    │   ├── useActiveSection.js # nav highlight on scroll
    │   └── useContactInterest.js # "Talk about …" buttons pre-select the form topic
    ├── styles/
    │   ├── variables.css       # colour + spacing tokens (original palette)
    │   └── global.css          # base typography, container, utilities
    ├── components/
    │   ├── layout/Header/      # sticky header, animated nav pill, mobile menu
    │   ├── layout/Footer/      # footer with email + clickable phone
    │   └── ui/                 # reusable building blocks (each with its own CSS)
    │       ├── Button          # pill button with optional shimmer sweep
    │       ├── Reveal          # Reveal / Stagger / StaggerItem scroll animations
    │       ├── WordsPullUp     # word-by-word headline reveal
    │       ├── SpotlightCard   # cursor-following spotlight card
    │       ├── BorderBeam      # light beam travelling around a card border
    │       ├── Marquee         # infinite capability ticker
    │       ├── GridBackground  # masked grid/dot pattern + drifting colour orbs
    │       ├── SectionHeading  # eyebrow + animated title + lead
    │       ├── FormField       # accessible input/select/textarea with errors
    │       ├── ScrollProgress  # top reading-progress bar
    │       └── BackToTop       # floating back-to-top button
    └── sections/               # one folder per page section (JSX + CSS)
        ├── Hero, Questions, Offerings, DealHub, Approach,
        ├── Productivity, QuoteBand, About
        └── Contact/            # Contact.jsx + ContactForm.jsx (sits directly above the footer)
```

## Effects (21st.dev-style)

The animated components follow popular 21st.dev / Magic UI patterns — Blur Fade, Words Pull Up, Spotlight Card, Border Beam, Shimmer Button, Marquee, Grid Pattern, Scroll Progress — re-implemented with `framer-motion` and plain CSS so the project has no Tailwind/shadcn dependency and matches the Thryv palette. All motion respects the visitor's "reduce motion" setting.

## Contact form

Fields: name*, work email*, company, phone, topic, message*. Includes inline validation, a spam honeypot and a success state.

- **Default:** on submit it opens the visitor's email app with a pre-filled message to `vikas@thryvpartners.in`.
- **Direct submission:** copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` to a form service URL that accepts JSON POST (e.g. Formspree, Getform, or your own API). Rebuild after changing it.

## Contact details

Email (`vikas@thryvpartners.in`) and phone (`+91 9986368486`, `tel:` link) are set once in `src/data/siteConfig.js` and used in the Deal Hub buttons, contact section and footer.
