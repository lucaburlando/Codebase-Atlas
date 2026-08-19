# Fitting the look to the project

`theme.css` is a single `:root{…}` block that overrides the engine defaults. Keep it small.

```css
:root{
  --ground:#0F0D0B; --floor:#1B1713; --plate:#15120F;   /* page, floor grid, panels */
  --brass:#C8A24A; --parch:#EAE0CB; --stone:#8B8172;    /* drawn lines, text, muted text */
  --dim:#5E564B; --coral:#E2542F; --rule:#2A241D;       /* faint text, the accent, borders */
  --serif:'Iowan Old Style',Georgia,serif;              /* display + panel prose */
  --mono:ui-monospace,'SF Mono',Menlo,monospace;        /* all chrome, labels, data */
}
```
Those are the defaults (warm black ground, brass drawing lines, one vermilion accent).
Your `theme.css` only needs the tokens you want to change.
Lane colours live in `G[lane].c` in the data file, not here.

## The bundled themes

| File | Register | Fits |
|---|---|---|
| `themes/foundry.css` | oxidised brass on warm black, vermilion (the built-in default) | pipelines, content systems, anything with a voice |
| `themes/drafting.css` | ink on paper, graphite, deep teal (the light one) | documents, compilers, anything precise |

Anything else is ten lines of your own.

## Choosing

1. **If the project has design tokens** (a theme file, a design-system.md, a CLAUDE.md
   design section) — derive from them. The atlas should look like it belongs to the product.
2. **Otherwise pick a register from the subject's own world** and commit to it in one
   sentence before you build. A payments ledger, a game engine, a compiler and a photo app
   should not look alike. Examples: oxidised brass on warm black for a nightly pipeline;
   phosphor green on slate for a systems tool; ink on drafting-paper for a document engine.

## Non-negotiable

- No webfont links — the artifact CSP blocks them. System stacks only.
- The accent does one job: "this is live / this is selected". Do not spend it elsewhere.
- Lane colours must stay distinguishable at 30% opacity — that is the dimmed state.
- Commit to one visual world and paint every colour explicitly; the page renders on an
  unknown host background.
- Avoid the AI defaults: cream + terracotta + serif, purple-blue gradient hero, Inter
  everywhere, rounded cards with an accent rail, emoji as section markers.
