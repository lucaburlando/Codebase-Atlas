# Codebase Atlas

A [Claude Code](https://claude.com/claude-code) skill that turns a repository into an
interactive isometric map: one block per real part of the system, lines for the paths data
actually takes, and a play button that walks the one journey that matters — a request, a
build, a nightly job, an order.

Built for the person who has to understand a system without reading it: a product manager,
a new joiner, a founder explaining their own stack to somebody else.

Screenshots of the bundled example — a fictional bookshop, from search box to doorstep —
are in [`docs/`](docs), one per theme. Start with
[`screenshot-theme-observatory-default.png`](docs/screenshot-theme-observatory-default.png).

## What makes it different from a diagram

- **Height is information.** A taller block holds more code. The tallest block is the one
  you would warn a new engineer about first.
- **Every block answers two product questions**, not just "what is this": *why it matters*
  and *what a user sees if it breaks*.
- **The journey animates.** Twelve to sixteen steps, grouped into chapters, with a numbered
  trail left behind, so the path is legible after it finishes.
- **One self-contained HTML file.** No build step, no dependencies, no network calls.

## Install

```bash
git clone https://github.com/lucaburlando/Codebase-Atlas.git ~/.claude/skills/codebase-atlas
```

Then, in any repository:

```
/codebase-atlas
```

It also triggers on requests like "map this codebase", "visualise the architecture", or
"explain this repo to a non-engineer".

## How it works

The model does **not** write a renderer. `assets/engine.html` already contains the canvas
engine, the interactions and the responsive shell. The model writes one data file:

```js
const G     = { … }   // lanes: floor tag, full name, colour
const N     = [ … ]   // blocks: grid position, height, files, stack
const COPY  = { … }   // per block: label, one-liner, why it matters, if it breaks
const E     = [ … ]   // edges: real call and data paths
const STEPS = [ … ]   // the journey, one caption per step
const META  = { … }   // title, stats, chapters, opening panel
```

Then:

```bash
node   scripts/validate.js  atlas.data.js               # free correctness check
python3 scripts/build.py    atlas.data.js atlas.html theme.css
       scripts/shoot.sh     atlas.html                  # 3 viewports, kills its own server
```

`validate.js` catches the mistakes that are invisible in code and expensive to find in a
screenshot: blocks whose footprints overlap, edges pointing at blocks that do not exist,
journey steps naming an edge that was never declared, missing copy, labels too long to fit.

## Themes

Four are bundled. Pass one to the build, or write your own — a theme is ten lines.

```bash
python3 scripts/build.py atlas.data.js atlas.html themes/foundry.css
```

| Theme | Look | Fits | Screenshot |
|---|---|---|---|
| **Observatory** *(default)* | petrol ground, steel drawing lines, signal gold | pipelines, schedulers, nocturnal systems | [`docs/screenshot-theme-observatory-default.png`](docs/screenshot-theme-observatory-default.png) |
| **Foundry** | oxidised brass on warm black, vermilion | content systems, publishing, anything with a voice | [`docs/screenshot-theme-foundry.png`](docs/screenshot-theme-foundry.png) |
| **Shopfloor** | cool slate, safety orange, sans chrome | logistics, commerce, operations | [`docs/screenshot-theme-shopfloor.png`](docs/screenshot-theme-shopfloor.png) |
| **Drafting** | ink on paper, graphite, deep teal (light) | documents, compilers, anything precise | [`docs/screenshot-theme-drafting-light.png`](docs/screenshot-theme-drafting-light.png) |

The canvas reads the same CSS tokens as the page, so the drawing follows the theme instead
of staying in the default palette.

## Writing your own

```css
:root{
  --ground:#0B1015; --plate:#111920; --rule:#1E2A33;
  --brass:#5E7C8C;  --parch:#DCE4EA; --stone:#7C8B96;
  --coral:#FF6A2B;  /* the one accent: live, selected, now */
  --serif:'Avenir Next',system-ui,sans-serif;
  --mono:ui-monospace,Menlo,monospace;
}
```

Roles, not names: `--brass` draws the lines, `--coral` is the accent that means *now*,
`--parch` is body text. Only override what you want to change.

## Layout

```
SKILL.md                    workflow and token rules
assets/engine.html          the renderer
scripts/recon.sh            bounded reconnaissance, one call
scripts/validate.js         correctness check
scripts/build.py            engine + data + theme -> one file
scripts/shoot.sh            headless screenshots, no installs
reference/                  schema · copy · layout · theme · traps
themes/                     four ready-made looks
examples/order-flow.*       a complete worked example
```

## Honest limitations

- **The map is hand-authored.** It is true on the day it is made and will drift as the code
  changes. It is a teaching object, not generated documentation.
- **The example is fictional.** Northgate is invented, so no real system is disclosed. For a
  real repository every line count must come from `wc -l` and every path must exist.
- **Screenshots need a Chromium that is already installed.** The skill never installs one;
  if there is none, it says so and skips the visual check.

## Licence

MIT. See [LICENSE](LICENSE).
