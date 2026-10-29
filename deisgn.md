MOMOS & STUFF — FULL REDESIGN SPECIFICATION
Antigravity implementation brief | React + Tailwind CSS
Complete redesign, not a polish pass. The existing landing page is rejected. Rebuild its visual design and section composition from scratch. The result should feel like a premium, art-directed food brand: distinctive in the first second, appetizing, modern, warm, confident, and client-ready.

1. MISSION AND NON-NEGOTIABLES
Create a memorable landing page for Momos & Stuff using the supplied logo and authentic content/media from the Instagram scrape dataset.

The experience must feel premium and professionally art-directed—not a generic restaurant template. It should be cozy, warm, playful, food-focused, visually bold, responsive, accessible, fast, and genuinely functional.

Mandatory:
1. Delete/rebuild the current landing-page UI from scratch. Do not simply recolor the existing page or preserve its old section layout.
2. Preserve the project, dependencies, configuration, logo, Instagram dataset, media, environment/configuration files, package manifest, and useful utilities. Inspect before removing anything. Replace only obsolete landing-page components/styles after checking they are not shared elsewhere.
3. Use React.js + Tailwind CSS and the existing Vite setup if present.
4. Discover the connected Motion MCP's actual tools and capabilities before using it. Never guess its API or claim to use it without invoking it.
5. Use Framer Motion as a dependable animation layer, plus CSS and inline SVG for precise effects.
6. The menu section must contain NO IMAGES OR VIDEOS. No product photos, thumbnails, image backgrounds, video thumbnails, or image cards. Make it visually rich using typography, layout, icons, dividers, sequence numbers, category tabs, tiny CSS/SVG accents, and motion.
7. Use the provided logo accurately. Do not redraw, recolor, crop, stretch, or distort it.
8. At the bottom footer, animate “Momos & Stuff” with a tasteful Pixel Drift effect. The text must remain accessible, return to a crisp readable state, and never permanently fragment.
9. Inspect the Instagram scrape dataset recursively and use authentic assets in relevant non-menu sections.
10. Do not invent prices, offers, awards, reviews, opening hours, contact details, addresses, delivery partners, or brand history. Use verified data or omit unavailable details.
11. Run the site, inspect it in a browser, test it, and iterate until polished at desktop and mobile sizes.
2. FIRST ACTION: AUDIT, THEN REBUILD
Before changing the UI:
1. Inspect the project folder recursively, including configuration and current source files.
2. Identify entry point, routing, CSS, components, package scripts, installed libraries, and MCP availability.
3. Locate the logo and all Instagram scrape files. The dataset may include JSON, CSV, TXT, HTML, media, thumbnails, reels, captions, or other exports.
4. Read the actual data schema before writing extraction logic.
5. Create an asset inventory with path, type, likely use, source post URL/caption when available, and quality notes.
6. Extract verified menu items, prices, descriptions, captions, profile URL, location, opening hours, phone, WhatsApp, and ordering links only if present.
7. Organize media into a clear structure if useful, without deleting original data. Prefer local media to fragile remote URLs.
8. Make a short implementation plan, then replace the existing landing-page design.
Safe rebuild rule: “Delete the landing page and create it again” means replace the old landing-page UI, obsolete components, and related styles when safe. It does not mean deleting the whole repository. Preserve the logo, scrape data, media, package configuration, environment files, and useful infrastructure.
3. CREATIVE DIRECTION: “THE LITTLE BLUE DUMPLING CLUB”
Create a distinctive visual world around the logo: an editorial food brand with soft blue paper-like surfaces, deep navy type, warm cream space, expressive oversized typography, rounded but controlled shapes, and real food photography used as a few intentional focal points.

The design should have the confidence of a boutique café identity and the friendliness of a neighborhood comfort-food brand.
Visual principles
- One strong idea per section. Avoid making every section a grid of identical cards.
- Use negative space, asymmetric layouts, large headlines, and editorial alignment.
- Create contrast through scale, composition, and color—not piles of shadows or gradients.
- Use organic shapes sparingly: pale-blue fields, a steam line, a dotted orbit, or a circular stamp.
- Use the real logo as a brand mark, not a decorative background pasted everywhere.
- Keep decoration behind content and never let it reduce readability.
- Use authentic food/store media outside the menu section; avoid generic stock photos.
- Avoid excessive glassmorphism, neon gradients, random emoji, generic AI-startup aesthetics, and cartoonish bounce effects.
Suggested palette
Sample the supplied logo and refine these values before final styling.
:root {
  --blue: #A9DCE8;
  --blue-soft: #EAF7F8;
  --blue-deep: #79C6D9;
  --navy: #153B58;
  --navy-soft: #254D68;
  --cream: #FFF9F0;
  --paper: #FFFEFB;
  --coral: #F29A83;
  --mint: #BFE3D1;
  --body: #40515A;
  --muted: #78878D;
  --line: rgba(21, 59, 88, 0.16);
}
Blue, navy, and cream dominate. Coral and mint are tiny accents. Maintain accessible contrast.
Typography
- Display: DM Sans, Manrope, or Plus Jakarta Sans, bold weights and slightly tight tracking.
- Body: DM Sans or Inter.
- Oversized responsive headings with controlled line breaks.
- Small uppercase editorial labels with modest letter spacing.
- Maximum two font families.
Shape and surface system
- Warm cream main background, alternating white and pale-blue surfaces.
- Card radius 18–28px; pill controls fully rounded.
- Thin low-contrast navy borders.
- Soft, rare shadows—no floating-card overload.
- Consistent centered max-width and horizontal padding.
- Intentional grid, not arbitrary positioning.
4. PAGE STRUCTURE AND SECTION-BY-SECTION ART DIRECTION
Build one complete landing page. Each section needs its own composition and a specific motion idea. Do not repeat the same reveal on every element.
4.1 Announcement ribbon
A slim top strip. Use a verified offer only if the dataset contains one. Otherwise use a short brand line such as “A little comfort, folded fresh” only if it suits the brand voice. Never invent a promotion.

Design: compact height; navy background with cream text or pale blue with navy text; one tiny decorative dot/steam glyph.

Motion:
- Enter with opacity 0→1 and y 8px→0 over 250–350ms.
- Decorative dot scales 0.8→1 over 300ms.
- Avoid an infinite marquee unless useful and pausable.
- Show statically for reduced-motion users.
4.2 Navigation
Layout: logo left; concise anchors for Menu, Our Story, Moments, Visit; one CTA such as “Explore the menu” or a verified “Order now”. On mobile, use logo + menu toggle + accessible drawer.

Motion:
- Nav enters with opacity 0→1 and y 8px→0 over 350ms.
- Links reveal with 40–60ms stagger.
- Hover underline animates using transform: scaleX() from left origin; don't animate width.
- CTA rises 1–2px on hover and arrow shifts 3–4px.
- After 24–40px scroll, transition to a more opaque surface and subtle shadow/border, without a dramatic height jump.
- Mobile drawer enters with opacity and x 12px→0 over 220–280ms.
- Drawer closes on Escape, close button, and link selection. Preserve accessible focus behavior.
- No hidden navigation or horizontal overflow.
4.3 Hero — first-sight impact
This is the most important section. Make the first viewport look art-directed and distinctive.

Composition:
- Warm cream background with a pale-blue organic shape or oversized blue field on one side.
- Large editorial headline, e.g. “Little bites. Big comfort.” Refine copy to fit the verified brand voice.
- Short supporting sentence, maximum two lines.
- Primary CTA: “Explore the menu”.
- Secondary CTA to a verified Instagram or ordering URL.
- One striking authentic food photo or local reel frame on the visual side. This is allowed here, but not inside the menu section.
- Optional small circular brand stamp, steam illustration, or tiny detail. Avoid clutter.
- Use the real logo in the nav and optionally a small secondary position, not as a repeated giant watermark.
Hero motion sequence:
1. Background surfaces appear immediately; never delay first paint.
2. Eyebrow label fades in and rises 8px over 300ms.
3. Headline reveals line-by-line inside overflow-hidden wrappers. Each line moves y 105%→0%, opacity 0→1, with 90–130ms stagger. Duration 600–750ms, smooth ease-out. Ensure wrappers do not clip descenders.
4. Supporting text fades in after the heading, 100ms delay, 400ms duration.
5. CTAs rise 8px and fade in with 70ms stagger. No bounce.
6. Hero food image uses a masked reveal: clip-path from narrow inset to full rounded image over 750–950ms; scale 1.04→1 during reveal.
7. Decorative steam SVG draws using path-length/stroke-dash animation over 800–1200ms. Subtle, once only.
8. If a floating label is used, drift only 3–5px over 4–6 seconds with gentle ease-in-out. Disable or reduce it on mobile/reduced motion if distracting.
9. Once entrance completes, keep the hero stable—no aggressive perpetual motion.
Interactions: CTA scrolls smoothly to menu; secondary opens a real URL; image hover scale max 1.015 over 300ms; clear navy keyboard focus ring.

Responsive: desktop two-column editorial composition; mobile text first, then image. Headline must not overlap decorations. CTA should be visible without decoration crowding.
4.4 Brand notes / quick highlights
A slim editorial band under the hero. Use three short statements separated by thin rules or small blue dots. Factual claims must be supported by the dataset; otherwise use non-factual brand values.

Motion:
- Section label fades in.
- Three text items reveal sequentially, each y 10px→0 and opacity 0→1, stagger 100ms.
- Divider lines draw scaleX 0→1 over 300–450ms on entry.
- Trigger once when 15–25% of section is visible.
- Keep the composition editorial, not generic icon cards.
4.5 Menu — absolutely NO IMAGES
Hard rule: no images or videos anywhere inside the menu section. No food photos, thumbnails, background images, video elements, or image-based category tiles.

The menu should feel like a beautifully designed printed menu brought to life digitally.

Composition:
- Heading such as “Find your kind of comfort.”
- Short introduction.
- Category filters as rounded outline pills with clear active state.
- Two-column list on desktop; one column on mobile.
- Each item is a row, not a photo card:
  - Small sequence number or minimal category symbol.
  - Item name in confident typography.
  - Short verified description if available.
  - Exact price aligned consistently at the far edge if verified.
  - Thin divider or dotted leader between content and price.
- Featured row may use pale-blue background, a tiny “Featured” label only when justified, or a left border. Never claim “bestseller” without evidence.
- Only include categories and dishes present in source data.
- If prices are missing, omit them instead of inventing.
- Add “Ask about the menu” or a contact CTA only if a real channel exists.
- If few items exist, present them elegantly; never pad with fictional dishes.
- If no verified menu exists, keep a clear owner-editable data source and do not publish made-up products.
Animation details:
1. Heading reveals by line, 450–600ms.
2. Category pills enter with opacity 0→1 and y 8px→0, 45ms stagger, 250–350ms.
3. Hover transitions border/background over 180–220ms. Active pill uses a sliding pale-blue indicator if reliable, otherwise a simple opacity/scale transition. Maintain contrast.
4. Menu rows reveal opacity 0→1 and y 10px→0, 50–70ms stagger, 300–420ms. Do not animate each letter.
5. Hover adds a pale-blue background tint and nudges the number/tiny arrow 2–3px; never scale the entire row.
6. Dividers draw scaleX 0→1, origin left, over 250–350ms, slightly behind row reveal.
7. Category change uses quick crossfade: outgoing opacity 1→0, incoming 0→1, around 150–220ms. Avoid large layout jumps.
8. Keep prices aligned; do not animate digits or count them up.
9. Filters must work, support keyboard, and expose active state via aria-pressed or equivalent.
10. The menu stays readable and usable with animation disabled.
Menu visual signature: typography, rules, aligned prices, tiny category labels, one pale-blue panel. Zero images and zero videos.
4.6 Signature editorial moment — image outside menu
Use one striking real food image or short video from the dataset after the menu. This provides appetite and visual rhythm after the typography-led section.

Composition: large rounded image occupying 55–65% of the section; concise text beside it; small editorial label or accent rule. Use verified product names/claims. Do not repeat the hero layout exactly; reverse the image side or use an asymmetrical 60/40 split.

Motion:
- Image starts with clip inset around 12–16%, reveals to 0 over 700–900ms.
- Scale 1.035→1 during reveal.
- Text enters y 14px→0 and opacity 0→1 over 350–450ms, after 100ms delay.
- Thin decorative line draws left-to-right over 400ms.
- Hover image scale max 1.02 over 350ms.
- No constant parallax. If used, limit to a few pixels and disable on mobile/reduced motion.
4.7 Our story — warm and grounded
Use only details supported by the Instagram profile/posts. If no verified founding story exists, do not invent founders, dates, or origin stories. Instead write a short brand statement about sharing comfort food, clearly as brand copy.

Composition: pale-blue or white surface, compact eyebrow, large heading, short paragraph, and one authentic store/preparation/packaging/food image if available. Add a small SVG steam/doodle accent.

Motion:
- Eyebrow fades in over 250ms.
- Heading reveals line-by-line with 70–100ms stagger, total 500–650ms.
- Paragraph fades/rises 8px over 350ms.
- Image reveals with vertical mask over 650–800ms.
- SVG line draws once over 700–1000ms.
- Decorative circle, if used, scales in once; no infinite bouncing.
- Text and image timings should vary slightly, not feel like a generic synchronized preset.
4.8 Instagram moments — curated gallery
Select authentic, good-quality scrape assets. Do not show broken media or unrelated stock.

Composition: editorial heading and verified profile CTA; varied but coherent grid with one larger tile and smaller tiles, or a horizontal strip with different aspect ratios. Link tiles to original post/reel URLs when available. Captions should be short. Never fabricate likes, engagement counts, reviews, or testimonials. Use fewer tiles rather than repeat images. If there are not enough good assets, omit the gallery or use a minimal social CTA.

Motion:
1. Heading fades/rises.
2. Tiles reveal with 60–90ms stagger; opacity 0→1 and clip inset 8–12%→0 over 450–650ms.
3. Hover/focus image scale max 1.035 over 300ms.
4. Navy caption overlay fades opacity 0→1 over 180–240ms.
5. Arrow/external-link icon shifts 3px on hover.
6. Clip only the image frame, not the link focus ring.
7. Keyboard access and visible focus are mandatory.
8. Avoid auto-advancing carousel unless needed; include controls and pause behavior if used.
4.9 Video moment — only if suitable footage exists
If the dataset contains suitable video, use one curated reel. Otherwise omit the section.

Requirements: muted, looped, playsInline, poster, no autoplay sound, lazy-load below fold, accessible pause/play control for persistent motion, short label/description, no multiple eager-loading videos.

Motion:
- Video frame mask reveal 650–800ms.
- Play/pause control fades in and rises 4px over 180ms.
- Hover control background changes over 180ms.
- Do not force scroll interaction or alter playback speed.
- For reduced motion, use the poster by default if appropriate.
4.10 Visit / contact
Display only verified data: address/map link, hours, phone/WhatsApp, ordering link, Instagram profile. Omit unavailable details. If only social media is verified, make that the main action.

Composition: bold heading, concise copy, clean contact panel with text-led rows and simple Lucide icons. CTA only when a valid destination exists. Contact information must remain selectable and easy to copy.

Motion:
- Panel fades/rises 12px over 350–450ms.
- Contact rows reveal with 50ms stagger.
- Icons scale 0.92→1 over 200ms; no spinning.
- CTA arrow nudges 3–4px on hover.
- Never animate or obscure contact text.
4.11 Final CTA
Composition: large deep-navy or pale-blue rounded panel; short heading such as “Your next comfort-food moment starts here”; one CTA to menu or verified order/contact destination; optional small organic shape/steam line. Do not repeat the whole hero.

Motion:
- Panel enters opacity 0→1 and y 14px→0 over 450ms.
- Heading reveals over 450–550ms.
- Button enters 80ms later.
- Steam line draws once over 800ms.
- CTA hover changes background/border over 180–220ms and arrow shifts 3px.
- No flashing, oversized scaling, or perpetual floating.
4.12 Footer — mandatory Pixel Drift wordmark
Footer should feel like a designed signature, not a default link dump.

Composition: deep navy background with cream text (or a pale-blue panel with navy text if better balanced), large Momos & Stuff wordmark, a few real anchor links, verified social/contact links, dynamic copyright year, and generous breathing room.
Pixel Drift — intended effect
Create a premium, controlled effect where the footer text briefly decomposes into tiny square pixels, drifts a short distance, then reassembles. It should feel like digital dust/shimmer, not a violent glitch. The name must stay readable and never permanently fragment.

Preferred implementation:
- Keep the accessible brand name as real HTML text.
- Add a visual effect layer with small square particles clipped/masked to the text area, or use carefully built CSS/SVG/canvas if reliable.
- The original accessible text remains present as a stable fallback.
- Particle layer uses aria-hidden="true" and pointer-events: none.
- Avoid hundreds of DOM nodes if a compact SVG/canvas can do the job.
- Use stable/deterministic particle positions rather than new random positions on every render.
- Do not run continuously.
Trigger: best is one pass when footer enters the viewport, with optional replay on hover/focus. Never restart on every scroll event.

Timeline:
- 0–180ms: intact wordmark, fully readable.
- 180–420ms: selected tiny square particles emerge from letter edges/parts; base text may briefly reduce to about 0.65 opacity but remains legible.
- 420–850ms: particles drift locally, roughly 6–18px horizontally and 4–14px vertically, with a slight stagger and varied opacity. Nothing flies across the page.
- 650–1050ms: particles return toward original positions and fade into the intact wordmark.
- 1050–1250ms: settle; restore full opacity and crisp text.
Use ease-out for separation and ease-in-out for return. The effect should be elegant, restrained, and quick.

Pixel Drift accessibility/performance:
- Keep real text accessible and selectable.
- Decorative particle layer is aria-hidden.
- One pass on viewport entry; optional replay on hover/focus.
- No intense flicker or large particle clouds.
- For prefers-reduced-motion: reduce, show static wordmark.
- On mobile, reduce particle count and travel distance.
- If a complex particle implementation is fragile, build a smaller CSS/SVG effect. Readability and stability are more important than complexity.
5. GLOBAL MOTION DESIGN SYSTEM
Motion must guide attention, communicate interaction, or add brand character. Do not animate everything.
Timing
- Micro-interactions: 140–220ms.
- Hover: 180–280ms.
- Small entrance reveals: 250–450ms.
- Large image/section reveals: 550–900ms.
- SVG drawing: 650–1200ms.
- Pixel Drift: about 1.0–1.25 seconds.
- Stagger: 40–100ms.
Easing
- Entrance: [0.22, 1, 0.36, 1] or equivalent smooth ease-out.
- Hover: ease-in-out.
- Pixel return: smooth ease-in-out.
- Avoid spring bounce unless a tiny natural response truly benefits the interaction.
Scroll reveal rules
- Use Intersection Observer or Framer Motion viewport triggers.
- Default to once: true.
- Prefer animating opacity and transform, not layout dimensions.
- Typical travel distance 8–18px.
- Mix line reveals, image masks, line drawings, and static content so sections do not feel cloned.
- Never hide all content until JavaScript animation runs; provide a visible baseline/fallback.
- No scroll hijacking or mandatory animation sequence.
Hover/press states
- Buttons: subtle color transition, 1–2px lift, arrow shift 3–4px.
- Images outside menu: scale max ~1.035.
- Menu rows: subtle background tint and 2–3px accent movement.
- Links: underline or color shift.
- Press: tiny scale to 0.985 if helpful, no overshoot.
- Provide keyboard focus equivalents. Essential content must not depend on hover.
SVG drawing
Use simple inline SVG paths with stroke-dash/path-length animation. Keep line width light and color in the brand palette. Run once; keep away from text and clicks; mark decorative SVG aria-hidden="true".
Reduced motion
Respect prefers-reduced-motion. Simplify/disable parallax, repeated floating, Pixel Drift particles, nonessential masks, and long staggers. All content and controls remain visible and usable.
6. MOTION MCP INTEGRATION
The Motion MCP is already connected in Antigravity.
1. Discover the exact tools/capabilities exposed by the connected server.
2. Read their descriptions and required inputs.
3. Use relevant tools only where documented capabilities help motion design or implementation.
4. Adapt any examples/presets to this brand's palette and restrained motion system.
5. Never guess tool names or parameters. Never claim MCP use unless the tool was actually invoked.
6. If unavailable or not suitable for a task, proceed with Framer Motion, CSS, and SVG; do not block the build.
7. Inspect the final motion in-browser and tune timing, overlaps, and responsiveness.
Prioritize the hero line reveal, image mask reveal, menu filter/row states, gallery reveal/hover, and footer Pixel Drift. The MCP should improve craft, not add gratuitous movement.
7. TECHNICAL IMPLEMENTATION
Required stack
- React.js
- Tailwind CSS
- Existing Vite setup if present
- Framer Motion
- Lucide React icons as needed
- Inline SVG for custom decorative line art
Avoid unnecessary libraries. Reuse useful installed packages.
Suggested structure
Adapt to the repository rather than forcing a new architecture.
src/
  components/
    AnnouncementBar.jsx
    Navbar.jsx
    MobileMenu.jsx
    Hero.jsx
    BrandNotes.jsx
    MenuSection.jsx
    MenuCategoryTabs.jsx
    MenuRow.jsx
    SignatureMoment.jsx
    StorySection.jsx
    InstagramGallery.jsx
    VideoMoment.jsx
    VisitSection.jsx
    FinalCTA.jsx
    Footer.jsx
    PixelDriftWordmark.jsx
    SectionReveal.jsx
  data/
    siteContent.js
    menuItems.js
    instagramContent.json
  hooks/
    useReducedMotionPreference.js
  App.jsx
  main.jsx
  index.css
public/
  assets/
    brand/
    food/
    gallery/
    reels/
    menu/
The menu/ folder may contain source files, but do not render any image from it in the menu section.
Code quality
- Keep repeated data in arrays/configuration files.
- Use stable keys.
- Use semantic landmarks (header, nav, main, section, footer).
- Use anchors for navigation and buttons for actions.
- All CTAs work; never use fake href="#".
- Keep external URLs in one config where practical.
- Add meaningful alt text to real food images outside the menu; decorative images use empty alt.
- Use reusable reveal components only where appropriate; not every section should animate identically.
- Avoid global CSS that breaks components.
- Clean up observers/listeners and ensure React Strict Mode safety.
8. CONTENT AND INSTAGRAM ASSET RULES
- Treat the scrape dataset as the source of truth for business facts.
- Preserve original asset paths/source URLs in an inventory.
- Choose a few strong relevant images rather than filling every section.
- Never repeat the same image just to fill a grid.
- If source media is low quality, use fewer images and stronger typography.
- Broken video falls back to poster or is omitted.
- Never invent reviews, awards, hours, address, phone, prices, offers, or delivery partners.
- Use exact verified product names/prices.
- Missing facts are omitted or left as clearly marked owner-editable placeholders in code; do not publish fictional values.
- Never render menu images.
9. RESPONSIVE DESIGN
Test at 360px, 390–430px, 768px, 1024px, 1440px, and 1920px.

Requirements:
- No horizontal overflow.
- Hero typography wraps intentionally.
- Mobile CTAs are visible and tappable.
- Image-free menu remains readable; prices align and do not collide with descriptions.
- Gallery crops look good and links remain accessible.
- Mobile menu opens/closes correctly and returns focus appropriately.
- Decorations never cover text or controls.
- Reduce particle count/travel on small screens.
- Touch users can access gallery links without hover.
- Tap targets generally at least 44×44px.
10. ACCESSIBILITY, PERFORMANCE, SEO
Accessibility
- Logical heading hierarchy and semantic landmarks.
- Visible keyboard focus.
- Accessible names for icon-only controls.
- Keyboard-operable filters with active state announced.
- Real wordmark text available to assistive technology; particle effects decorative.
- Reduced-motion support and sufficient contrast.
- No flashing or rapid flicker.
- Never put important text inside an image.
Performance
- Use local assets where possible.
- Compress large images; use WebP/AVIF where practical.
- Set dimensions/aspect ratios to prevent layout shift.
- Prioritize hero media; lazy-load below-fold media.
- Do not load multiple videos immediately.
- Animate transforms/opacity where possible.
- Avoid expensive blur, huge particle counts, and repeated layout measurements.
- Check console and terminal for errors, missing assets, and React warnings.
SEO
- Descriptive page title and meta description.
- Favicon based on supplied logo if practical.
- Open Graph metadata using a real brand image.
- Structured restaurant/local business data only when reliable details exist.
- Do not invent a location in metadata.
11. REQUIRED BROWSER QA AND ITERATION
Do not declare completion after initial code generation.
1. Start the dev server using existing scripts.
2. Open the site in the browser using available Antigravity browser tools. Use Motion MCP as relevant, and browser automation if available.
3. Inspect the desktop first viewport. Hero must feel impressive, balanced, and art-directed.
4. Inspect the menu and confirm it contains zero images and zero video elements.
5. Test category filters.
6. Test all nav anchors and CTAs.
7. Test mobile drawer, Escape, close button, and link selection.
8. Test gallery media and links.
9. Verify footer Pixel Drift triggers, reassembles to crisp text, and remains accessible.
10. Test reduced-motion behavior.
11. Inspect at 360px, 390px, 768px, 1024px, and 1440px.
12. Check overflow, wrapping, crops, spacing, animation overlap, and console errors.
13. Fix weak hierarchy, generic cards, excessive motion, and awkward whitespace.
14. Repeat browser inspection after fixes.
If browser automation is unavailable, do the strongest available manual browser inspection. Never claim tests were run if they were not.
12. FINAL ACCEPTANCE CHECKLIST
- [ ] Existing landing page UI has been replaced, not merely recolored.
- [ ] Logo, source data, media, and project configuration preserved.
- [ ] Instagram scrape inspected recursively.
- [ ] Authentic media used selectively outside menu.
- [ ] Menu contains absolutely no images or videos.
- [ ] Menu uses strong typography, dividers, aligned prices, working filters, and responsive rows.
- [ ] Hero creates a strong first impression with a clear CTA.
- [ ] Every major section has a distinct, purposeful animation.
- [ ] Timing, easing, triggers, hover/focus behavior, and reduced motion implemented thoughtfully.
- [ ] Footer “Momos & Stuff” Pixel Drift runs in a controlled way and resolves to readable text.
- [ ] Motion MCP inspected and used only where its real capabilities support the work.
- [ ] No invented business facts, prices, offers, reviews, or contact information.
- [ ] All links and CTAs work.
- [ ] Mobile, tablet, and desktop are polished.
- [ ] No broken media, console errors, or horizontal overflow.
- [ ] Website was run and visually inspected after implementation.
13. FINAL CREATIVE STANDARD
Make this feel like a boutique food brand that has invested in design: bold first-screen typography, logo-inspired blue and cream, confident navy, beautiful authentic food imagery in carefully selected non-menu sections, an unusually well-designed image-free menu, small expressive SVG details, editorial whitespace, responsive interactions, and a memorable Pixel Drift footer wordmark.

Do not settle for “clean enough.” Do not reuse the rejected layout. Do not decorate every gap with animation. Composition, typography, color, authentic imagery, and motion must work together. Every detail should feel deliberate, premium, professional, and client-ready.