---
name: clone-website
description: Reverse-engineer and clone one or more websites in one shot — extracts assets, CSS, and content section-by-section and proactively dispatches parallel builder agents in worktrees as it goes. Use this whenever the user wants to clone, replicate, rebuild, reverse-engineer, or copy any website. Also triggers on phrases like "make a copy of this site", "rebuild this page", "pixel-perfect clone". Provide one or more target URLs as arguments. Automatically integrates /impeccable at every quality gate for production-grade output.
argument-hint: "<url1> [<url2> ...]"
user-invocable: true
version: 1.0.0
---

# Clone Website

You are about to reverse-engineer and rebuild **$ARGUMENTS** as pixel-perfect clones, with production-grade UI quality enforced at every stage by `/impeccable`.

When multiple URLs are provided, process them independently and in parallel where possible, keeping each site's extraction artifacts in dedicated folders (e.g., `docs/research/<hostname>/`).

This is not a two-phase process (inspect then build). You are a **foreman walking the job site** — as you inspect each section, you write a meticulous spec file, then hand that file to a specialist builder agent. Extraction and construction happen in parallel. Impeccable runs as an automatic quality gate, not as an optional polish step.

---

## Mandatory: Load Impeccable First

Before doing anything else:

```
/impeccable
```

This runs impeccable's setup — `context.mjs`, register detection, and design reference loading. You need this context to enforce design quality during extraction and to correctly route impeccable sub-commands later. If `context.mjs` reports `NO_PRODUCT_MD`, create a minimal `PRODUCT.md` that describes the project as a pixel-perfect clone of `$ARGUMENTS`, then continue.

---

## Scope Defaults

The target is whatever page `$ARGUMENTS` resolves to. Clone exactly what's visible at that URL. Unless the user specifies otherwise:

- **Fidelity:** Pixel-perfect — exact match in colors, spacing, typography, animations
- **In scope:** Visual layout, component structure, interactions, responsive design, mock data
- **Out of scope:** Real backend/database, authentication, real-time features, SEO, a11y audit
- **Customization:** None — pure emulation

If the user provides additional instructions, honor them over these defaults.

---

## Guiding Principles

These truths separate a successful clone from a "close enough" mess.

### 1. Completeness Beats Speed

Every builder agent receives **everything** it needs: screenshot, exact CSS values, downloaded assets with local paths, real text content, component structure. If a builder has to guess anything — a color, a font size, a padding value — extraction failed. Take the extra minute to extract one more property rather than shipping an incomplete brief.

### 2. Small Tasks, Perfect Results

When an agent gets "build the entire features section," it approximates. When it gets a focused component with exact CSS values, it nails it.

Judge each section's complexity. Simple banner with a heading and a button? One agent. Complex section with 3 card variants, unique hover states, and internal layouts? One agent per variant plus one for the section wrapper.

**Complexity budget rule:** If a builder prompt exceeds ~150 lines of spec content, the section is too complex for one agent. Split it. This is mechanical — don't override it.

### 3. Real Content, Real Assets

Extract actual text, images, videos, and SVGs from the live site. This is a clone, not a mockup. Use `element.textContent`, download every `<img>` and `<video>`, extract inline `<svg>` elements as React components. Generate content only when something is clearly server-generated and session-unique.

**Layered assets matter.** A section that looks like one image is often multiple layers — a background gradient, a foreground UI mockup PNG, an overlay icon. Inspect every container's full DOM tree and enumerate ALL `<img>` elements and background images within it, including absolutely-positioned overlays.

### 4. Foundation First

Nothing can be built until the foundation exists: global CSS with the target site's design tokens (colors, fonts, spacing), TypeScript types for content structures, and global assets (fonts, favicons). Sequential and non-negotiable. Everything after this can be parallel.

### 5. Extract How It Looks AND How It Behaves

A website is not a screenshot — it's a living thing. Elements move, change, appear, and disappear in response to scrolling, hovering, clicking, resizing, and time. Extract **appearance** (exact computed CSS via `getComputedStyle()`) AND **behavior** (what changes, what triggers it, how the transition happens).

Not "it looks like 16px" — extract the actual computed value. Not "the nav changes on scroll" — document the exact trigger (scroll position, IntersectionObserver threshold), before/after states (both CSS value sets), and transition (duration, easing, CSS vs JS).

### 6. Identify the Interaction Model Before Building

Building click-based tabs when the original is scroll-driven (or vice versa) requires a complete rewrite. Before writing any builder prompt for an interactive section, definitively answer: **Is this driven by clicks, scrolls, hovers, time, or some combination?**

How to determine this:
1. **Don't click first.** Scroll through the section slowly and observe if things change on their own.
2. If they do, it's scroll-driven. Extract the mechanism: `IntersectionObserver`, `scroll-snap`, `position: sticky`, `animation-timeline`, or JS scroll listeners.
3. If nothing changes on scroll, THEN click/hover to test for click/hover-driven interactivity.
4. Document explicitly in the spec: "INTERACTION MODEL: scroll-driven with IntersectionObserver."

### 7. Extract Every State, Not Just the Default

Many components have multiple visual states. Extract ALL states, not just page-load state. For tabbed content: click each tab, extract content and images per state, record transitions. For scroll-dependent elements: capture computed styles at position 0 AND past the trigger threshold.

### 8. Spec Files Are the Source of Truth

Every component gets a specification file in `docs/research/components/` BEFORE any builder is dispatched. This is NOT optional. The builder receives spec file contents inline in its prompt. The file also persists as an auditable artifact. If you dispatch a builder without a spec file, the builder guesses — and guesses compound.

### 9. Build Must Always Compile

Every builder agent must verify `npx tsc --noEmit` passes before finishing. After merging worktrees, verify `npm run build` passes. A broken build is never acceptable, even temporarily.

### 10. Impeccable Governs Quality at Every Phase

The `/impeccable` skill is not a post-processing step — it runs at defined gates throughout the pipeline. Its **Absolute Bans** apply to every builder agent unconditionally:

- No side-stripe borders (`border-left/right > 1px` as a colored accent)
- No gradient text (`background-clip: text` + gradient)
- No decorative glassmorphism
- No hero-metric templates (big number, small label, gradient accent)
- No identical card grids (same-sized icon+heading+text repeated)
- No tiny uppercase tracked eyebrow above every section
- No numbered section markers (`01 / 02 / 03`) as default scaffolding
- No text that overflows its container

When a builder produces output that violates these rules, reject and fix before merging.

---

## Pre-Flight

1. **Browser automation is required.** Check for available browser MCP tools (Chrome MCP, Playwright MCP, Browserbase MCP, Puppeteer MCP). Use whichever is available — prefer Chrome MCP if multiple exist. If none are detected, ask the user which tool they have. This skill cannot work without browser automation.
2. Parse `$ARGUMENTS` as one or more URLs. Validate each; if any are invalid, ask the user to correct them before proceeding. Verify each URL is accessible via browser MCP.
3. Verify the base project builds: `npm run build`. The Next.js + shadcn/ui + Tailwind v4 scaffold should already be in place.
4. Create output directories if they don't exist: `docs/research/`, `docs/research/components/`, `docs/design-references/`, `scripts/`. For multiple clones, also prepare `docs/research/<hostname>/` and `docs/design-references/<hostname>/`.

---

## Phase 1: Reconnaissance

Navigate to the target URL with browser MCP.

### Screenshots
- Take **full-page screenshots** at desktop (1440px) and mobile (390px) viewports
- Save to `docs/design-references/` with descriptive names
- These are your master reference — builders receive section-specific crops later

### Global Extraction

**Fonts** — Inspect `<link>` tags for Google Fonts or self-hosted fonts. Check computed `font-family` on key elements (headings, body, code, labels). Document every family, weight, and style actually used. Configure in `src/app/layout.tsx` using `next/font/google` or `next/font/local`.

**Colors** — Extract the site's color palette from computed styles across the page. Update `src/app/globals.css` with the target's actual colors in OKLCH format in `:root` and `.dark` CSS variable blocks. Map to shadcn token names where they fit. Add custom properties for colors that don't map to shadcn tokens.

> **Impeccable color rule:** Convert all extracted hex/rgb colors to OKLCH. When writing the globals.css `:root` block, apply impeccable's "Tinted neutrals" guidance — add 0.005–0.015 chroma toward the brand's hue. Don't default-tint toward warm or cool. Verify body text hits ≥4.5:1 contrast against its background.

**Favicons & Meta** — Download favicons, apple-touch-icons, OG images, webmanifest to `public/seo/`. Update `layout.tsx` metadata.

**Global UI patterns** — Identify any site-wide CSS or JS: custom scrollbar hiding, scroll-snap on the page container, global keyframe animations, backdrop filters, gradients used as overlays, smooth scroll libraries (Lenis, Locomotive Scroll — check for `.lenis`, `.locomotive-scroll`, or custom scroll container classes). Add these to `globals.css` and note any libraries that need to be installed.

### Mandatory Interaction Sweep

A dedicated pass AFTER screenshots and BEFORE anything else. Purpose: discover every behavior on the page — many invisible in a static screenshot.

**Scroll sweep:** Scroll the page slowly from top to bottom. At each section, pause and observe:
- Does the header change appearance? Record the scroll position where it triggers.
- Do elements animate into view? Record which ones and the animation type.
- Does a sidebar or tab indicator auto-switch as you scroll? Record the mechanism.
- Are there scroll-snap points? Record which containers.
- Is there a smooth scroll library active? Check for non-native scroll behavior.

**Click sweep:** Click every element that looks interactive:
- Every button, tab, pill, link, card
- Record what happens: content change? modal? dropdown?
- For tabs/pills: click EACH ONE and record the content per state

**Hover sweep:** Hover over every element that might have hover states:
- Buttons, cards, links, images, nav items
- Record what changes: color, scale, shadow, underline, opacity

**Responsive sweep:** Test at 3 viewport widths:
- Desktop: 1440px — Tablet: 768px — Mobile: 390px
- At each width, note which sections change layout and at approximately which breakpoint

Save all findings to `docs/research/BEHAVIORS.md`. This is your behavior bible — reference it for every component spec.

### Page Topology
Map out every distinct section from top to bottom. Give each a working name. Document:
- Their visual order
- Fixed/sticky overlays vs. flow content
- Overall page layout (scroll container, column structure, z-index layers)
- Dependencies between sections
- **The interaction model** of each section (static, click-driven, scroll-driven, time-driven)

Save as `docs/research/PAGE_TOPOLOGY.md` — your assembly blueprint.

---

## Phase 2: Foundation Build

Sequential. Do this yourself (not delegated) since it touches many files.

1. **Update fonts** in `layout.tsx` to match the target site's actual fonts. Apply impeccable's typography rules: cap font-family count at 3, pair on a contrast axis (serif + sans, geometric + humanist), apply `text-wrap: balance` on h1-h3.
2. **Update globals.css** with the target's color tokens in OKLCH, spacing values, keyframe animations, utility classes, and any global scroll behaviors (Lenis, smooth scroll CSS, scroll-snap on body). Cap body line length at 65–75ch via CSS. Build a semantic z-index scale.
3. **Create TypeScript interfaces** in `src/types/` for content structures you've observed
4. **Extract SVG icons** — find all inline `<svg>` elements, deduplicate, save as named React components in `src/components/icons.tsx`
5. **Download global assets** — write and run a Node.js script (`scripts/download-assets.mjs`) that downloads all images, videos, and binary assets to `public/`. Use batched parallel downloads (4 at a time) with proper error handling.
6. Verify: `npm run build` passes

### Asset Discovery Script Pattern

```javascript
JSON.stringify({
  images: [...document.querySelectorAll('img')].map(img => ({
    src: img.src || img.currentSrc,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
    parentClasses: img.parentElement?.className,
    siblings: img.parentElement ? [...img.parentElement.querySelectorAll('img')].length : 0,
    position: getComputedStyle(img).position,
    zIndex: getComputedStyle(img).zIndex
  })),
  videos: [...document.querySelectorAll('video')].map(v => ({
    src: v.src || v.querySelector('source')?.src,
    poster: v.poster,
    autoplay: v.autoplay,
    loop: v.loop,
    muted: v.muted
  })),
  backgroundImages: [...document.querySelectorAll('*')].filter(el => {
    const bg = getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none';
  }).map(el => ({
    url: getComputedStyle(el).backgroundImage,
    element: el.tagName + '.' + el.className?.split(' ')[0]
  })),
  svgCount: document.querySelectorAll('svg').length,
  fonts: [...new Set([...document.querySelectorAll('*')].slice(0, 200).map(el => getComputedStyle(el).fontFamily))],
  favicons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() }))
});
```

### Impeccable Gate: Design System Extraction

After globals.css is written, run:

```
/impeccable extract
```

This formalizes the extracted design tokens into a reusable system and generates/updates `DESIGN.md`. The output from this step is what impeccable uses in all subsequent quality gates. If impeccable's `detect.mjs` finds existing anti-patterns in your globals.css output (gradient text, AI-tell color choices), fix them now — before any components are built.

---

## Phase 3: Component Specification & Dispatch

The core loop. For each section in your page topology (top to bottom): **extract → spec file → dispatch builders**.

### Step 1: Extract

For each section, use browser MCP to extract everything:

**Screenshot** the section in isolation. Save to `docs/design-references/`.

**Extract CSS** for every element in the section:

```javascript
(function(selector) {
  const el = document.querySelector(selector);
  if (!el) return JSON.stringify({ error: 'Element not found: ' + selector });
  const props = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','backgroundColor','background',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','gap',
    'gridTemplateColumns','gridTemplateRows',
    'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
    'boxShadow','overflow','overflowX','overflowY',
    'position','top','right','bottom','left','zIndex',
    'opacity','transform','transition','cursor',
    'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
    'whiteSpace','textOverflow','WebkitLineClamp'
  ];
  function extractStyles(element) {
    const cs = getComputedStyle(element);
    const styles = {};
    props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
    return styles;
  }
  function walk(element, depth) {
    if (depth > 4) return null;
    const children = [...element.children];
    return {
      tag: element.tagName.toLowerCase(),
      classes: element.className?.toString().split(' ').slice(0, 5).join(' '),
      text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 200) : null,
      styles: extractStyles(element),
      images: element.tagName === 'IMG' ? { src: element.src, alt: element.alt, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight } : null,
      childCount: children.length,
      children: children.slice(0, 20).map(c => walk(c, depth + 1)).filter(Boolean)
    };
  }
  return JSON.stringify(walk(el, 0), null, 2);
})('SELECTOR');
```

**Extract multi-state styles** — for elements with multiple states (scroll-triggered, hover, active tab), capture BOTH states:

```javascript
// State A: capture styles at current state (e.g., scroll position 0)
// Trigger the state change (scroll, click, hover via browser MCP)
// State B: re-run the extraction script on the same element
// The diff IS the behavior specification
```

Record the diff explicitly: "Property X changes from VALUE_A to VALUE_B, triggered by TRIGGER, with transition: TRANSITION_CSS."

**Extract real content** — all text, alt attributes, aria labels, placeholder text. For tabbed/stateful content, **click each tab and extract content per state**.

**Identify assets** — which downloaded images/videos from `public/`, which icon components from `icons.tsx`. Check for layered images (multiple `<img>` or background-images stacked in the same container).

**Assess complexity** — how many distinct sub-components does this section contain?

### Step 2: Write the Component Spec File

Create a spec file in `docs/research/components/` BEFORE dispatching any builder:

**File path:** `docs/research/components/<component-name>.spec.md`

```markdown
# <ComponentName> Specification

## Overview
- **Target file:** `src/components/<ComponentName>.tsx`
- **Screenshot:** `docs/design-references/<screenshot-name>.png`
- **Interaction model:** <static | click-driven | scroll-driven | time-driven>

## DOM Structure
<Describe the element hierarchy — what contains what>

## Computed Styles (exact values from getComputedStyle)

### Container
- display: ...
- padding: ...
- maxWidth: ...
(every relevant property with exact values)

### <Child element 1>
- fontSize: ...
- color: ...
(every relevant property)

## States & Behaviors

### <Behavior name, e.g., "Scroll-triggered floating mode">
- **Trigger:** <exact mechanism>
- **State A (before):** maxWidth: 100vw, boxShadow: none, borderRadius: 0
- **State B (after):** maxWidth: 1200px, boxShadow: 0 4px 20px rgba(0,0,0,0.1), borderRadius: 16px
- **Transition:** transition: all 0.3s ease
- **Implementation approach:** <CSS transition + scroll listener | IntersectionObserver | etc.>

### Hover states
- **<Element>:** <property>: <before> → <after>, transition: <value>

## Per-State Content (if applicable)

### State: "<Tab name>"
- Title: "..."
- Cards: [{ title, description, image, link }, ...]

## Assets
- Background image: `public/images/<file>.webp`
- Overlay image: `public/images/<file>.png`
- Icons used: <ArrowIcon>, <SearchIcon> from icons.tsx

## Text Content (verbatim)
<All text content, copy-pasted from the live site>

## Responsive Behavior
- **Desktop (1440px):** <layout description>
- **Tablet (768px):** <what changes>
- **Mobile (390px):** <what changes>
- **Breakpoint:** layout switches at ~<N>px

## Impeccable Compliance Check
- [ ] No side-stripe borders
- [ ] No gradient text
- [ ] No glassmorphism (unless purposeful and rare)
- [ ] No hero-metric template
- [ ] No identical card grid
- [ ] No eyebrow above every section
- [ ] No numbered scaffolding (01/02/03) unless content is genuinely sequential
- [ ] No text overflow at any breakpoint
- [ ] Body text contrast ≥ 4.5:1
- [ ] Motion has `@media (prefers-reduced-motion)` alternative
```

Fill every section. If a section doesn't apply, write "N/A" — but think twice before marking States & Behaviors N/A. Even a footer might have hover states on links.

### Step 3: Dispatch Builders

Based on complexity, dispatch builder agent(s) in worktrees:

**Simple section** (1-2 sub-components): One builder agent gets the entire section.

**Complex section** (3+ distinct sub-components): One agent per sub-component + one for the section wrapper. Sub-component builders go first.

**What every builder agent receives:**
- The full contents of its component spec file (inline in the prompt — never "go read the spec file")
- Path to the section screenshot in `docs/design-references/`
- Which shared components to import (`icons.tsx`, `cn()`, shadcn primitives)
- The target file path
- Instruction to verify with `npx tsc --noEmit` before finishing
- The specific breakpoint values and what changes for responsive behavior
- The full Impeccable Compliance Check from the spec — each builder must self-verify before finishing
- Motion implementation must include `@media (prefers-reduced-motion: reduce)` alternatives for every animation — no exceptions

**Don't wait.** As soon as you've dispatched the builder(s) for one section, move to extracting the next. Builders work in parallel in their worktrees while you continue extraction.

### Step 4: Merge

As builder agents complete:
- Merge their worktree branches into main
- Resolve any conflicts intelligently — you have full context on what each agent built
- After each merge, verify the build still passes: `npm run build`
- **Before merging, scan the component against impeccable's Absolute Bans.** If any violation is found, reject the merge and have the builder fix it. A component that passes `tsc` but violates Absolute Bans is still wrong.
- Fix type errors immediately

The extract → spec → dispatch → merge cycle continues until all sections are built.

---

## Phase 4: Page Assembly

After all sections are built and merged, wire everything together in `src/app/page.tsx`:

- Import all section components
- Implement the page-level layout from your topology doc (scroll containers, column structures, sticky positioning, z-index layering)
- Connect real content to component props
- Implement page-level behaviors: scroll snap, scroll-driven animations, dark-to-light transitions, intersection observers, smooth scroll (Lenis etc.)
- Verify: `npm run build` passes clean

### Impeccable Gate: Technical Audit

After assembly, run:

```
/impeccable audit
```

This performs systematic checks across 5 dimensions: accessibility, performance, theming, responsive design, and anti-patterns. It produces a scored report. Treat any P0 (critical) issues as blocking — fix them before proceeding to Visual QA. P1 issues should be fixed now unless the user explicitly says to defer. P2+ issues go on the polish list.

---

## Phase 5: Visual QA Diff

After the technical audit passes, do NOT declare the clone complete. Take side-by-side comparison screenshots:

1. Open the original site and your clone side-by-side (or take screenshots at the same viewport widths)
2. Compare section by section, top to bottom, at desktop (1440px)
3. Compare again at mobile (390px)
4. For each discrepancy:
   - Check the component spec file — was the value extracted correctly?
   - If the spec was wrong: re-extract from browser MCP, update the spec, fix the component
   - If the spec was right but the builder got it wrong: fix the component to match the spec
5. Test all interactive behaviors: scroll through the page, click every button/tab, hover over interactive elements
6. Verify smooth scroll feels right, header transitions work, tab switching works, animations play

### Impeccable Gate: Critique

After visual QA, run:

```
/impeccable critique
```

This runs a UX design review with heuristic scoring. It evaluates visual hierarchy, information architecture, cognitive load, spacing, typography, color, and interaction design. Any P0 or P1 findings must be fixed. A pixel-perfect clone that fails impeccable critique means the original has issues worth correcting — fix them now rather than cloning problems.

### Impeccable Gate: Polish

After critique findings are resolved, run:

```
/impeccable polish
```

This performs a meticulous final pass — spacing, alignment, copy consistency, interaction state gaps, edge cases, loading/transition smoothness. This is the last gate before declaring the clone complete.

---

## Targeted Impeccable Commands (use as needed during pipeline)

These are available throughout the pipeline when specific issues arise. Don't wait for the final gates to fix them.

| Issue | Command |
|---|---|
| Responsive layout breaking | `/impeccable adapt <component>` |
| Animations feel off or are missing | `/impeccable animate <component>` |
| Typography hierarchy unclear | `/impeccable typeset <component>` |
| Colors feel wrong or flat | `/impeccable colorize <component>` |
| Spacing and rhythm issues | `/impeccable layout <component>` |
| Copy is vague or redundant | `/impeccable clarify <component>` |
| Clone looks generic / AI-generated | `/impeccable bolder <component>` |
| Clone is visually overwhelming | `/impeccable quieter <component>` |
| Pre-shipping production hardening | `/impeccable harden <component>` |
| In-browser visual iteration | `/impeccable live` |

---

## Pre-Dispatch Checklist

Before dispatching ANY builder agent, verify every box:

- [ ] Spec file written to `docs/research/components/<name>.spec.md` with ALL sections filled
- [ ] Every CSS value in the spec is from `getComputedStyle()`, not estimated
- [ ] Interaction model is identified and documented (static / click / scroll / time)
- [ ] For stateful components: every state's content and styles are captured
- [ ] For scroll-driven components: trigger threshold, before/after styles, and transition are recorded
- [ ] For hover states: before/after values and transition timing are recorded
- [ ] All images in the section are identified (including overlays and layered compositions)
- [ ] Responsive behavior is documented for at least desktop and mobile
- [ ] Text content is verbatim from the site, not paraphrased
- [ ] Impeccable Compliance Check in the spec is filled and all boxes pass
- [ ] The builder prompt is under ~150 lines of spec; if over, split the section

---

## What NOT to Do

Each lesson here came from failed clones:

- **Don't build click-based tabs when the original is scroll-driven (or vice versa).** Determine the interaction model FIRST by scrolling before clicking. This is the #1 most expensive mistake.
- **Don't extract only the default state.** Click every tab, scroll past every threshold, capture every state.
- **Don't miss overlay/layered images.** Check every container's DOM tree for multiple `<img>` elements and positioned overlays.
- **Don't build mockup components for content that's actually videos/animations.** Check if a section uses `<video>`, Lottie, or canvas first.
- **Don't approximate CSS classes.** "It looks like `text-lg`" is wrong. Extract the actual computed value.
- **Don't violate Impeccable Absolute Bans.** Gradient text, side-stripe borders, identical card grids — these are never acceptable regardless of what the original site does. If the original uses them, implement equivalent visual weight without the banned technique.
- **Don't skip the impeccable gates.** `extract` after foundation, `audit` after assembly, `critique` and `polish` after visual QA. These are not optional — they are what separates a clone from a production-grade clone.
- **Don't reference docs from builder prompts.** Each builder gets the CSS spec inline — never "see DESIGN_TOKENS.md for colors." The builder needs zero external reads.
- **Don't bundle unrelated sections into one agent.** A CTA section and a footer are different components.
- **Don't skip responsive extraction.** If you only inspect at desktop width, the clone breaks at tablet and mobile.
- **Don't forget smooth scroll libraries.** Check for Lenis, Locomotive Scroll. Default browser scrolling feels noticeably different.
- **Don't ship motion without reduced-motion alternatives.** Every animation needs `@media (prefers-reduced-motion: reduce)`.

---

## Completion Report

When done, report:

- Total sections built
- Total components created
- Total spec files written (should equal component count)
- Total assets downloaded (images, videos, SVGs, fonts)
- Build status (`npm run build` result)
- Impeccable gate results:
  - `extract` — design system formalized (yes/no)
  - `audit` — scores across 5 dimensions, P0/P1 count
  - `critique` — heuristic score, P0/P1 count
  - `polish` — final pass complete (yes/no)
- Visual QA results (any remaining discrepancies)
- Any known gaps or limitations
