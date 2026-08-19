# Fitting the look to the project

`theme.css` is a single `:root{…}` block that overrides the engine defaults. Keep it small.

```css
:root{
  --ground:#0B1014; --floor:#151E25; --plate:#101820;   /* page, floor grid, panels */
  --brass:#6A8296; --parch:#E7E4DC; --stone:#8996A2;    /* drawn lines, text, muted text */
  --dim:#57646E; --coral:#E3B341; --rule:#1F2B34;       /* faint text, the accent, borders */
  --serif:'Iowan Old Style',Georgia,serif;              /* display + panel prose */
  --mono:ui-monospace,'SF Mono',Menlo,monospace;        /* all chrome, labels, data */
}
```
Those are the defaults (a petrol ground with steel drawing lines and one signal-gold accent).
Your `theme.css` only needs the tokens you want to change.
Lane colours live in `G[lane].c` in the data file, not here.

## The bundled themes

| File | Register | Fits |
|---|---|---|
| `themes/observatory.css` | petrol ground, steel lines, signal gold (default) | pipelines, schedulers, nocturnal systems |
| `themes/foundry.css` | oxidised brass on warm black, vermilion | content systems, publishing, anything with a voice |
| `themes/shopfloor.css` | cool slate, safety orange, sans chrome | logistics, commerce, operations |
| `themes/drafting.css` | ink on paper, graphite, deep teal (light) | documents, compilers, anything precise |

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
