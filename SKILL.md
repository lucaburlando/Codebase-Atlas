---
name: codebase-atlas
description: Build an interactive isometric map of a codebase — a clickable atlas that shows what each part does, how the parts connect, and animates the one journey that matters (a request, a build, a nightly job, an order). Use when the user asks to visualise, map, diagram, or explain a codebase or system architecture, wants an onboarding page for a repo, says "how does this all fit together", "make a map of this project", "visualise the architecture", "explain this repo to a non-engineer", or asks for a system diagram they can click through. Produces a single self-contained HTML artifact, not a static diagram.
metadata:
  version: 1.0.0
---

# Codebase Atlas

Turn a repository into a map a product person can read: blocks for the real parts,
lines for the real data paths, and a play button that walks one end-to-end journey.

**You write data, not a renderer.** `assets/engine.html` already contains the canvas
engine, the interactions, the responsive shell and the fixes for every trap listed in
`reference/traps.md`. Your job is `atlas.data.js` — the graph, the journey, and the words.

## Token discipline — the first constraint, not the last

- **Never spawn subagents. Never install anything** (no npx, npm, pip). Everything needed is bundled.
- **Never read a source file in full.** `scripts/recon.sh` plus one grep for definitions is the whole budget.
- **Never print the data file or the built page into the chat.**
- Write `atlas.data.js` in ONE Write call. Later changes are surgical `python3 - <<'PY'` replacements.
- Validate before you screenshot. Screenshots are the expensive check; the validator is free.
- Max 3 screenshot rounds. Fix everything you can see in one pass, not one finding per round.
- Final reply under 200 words.

## Workflow

**1 · Recon — one call, then stop looking**
```bash
$SKILL/scripts/recon.sh .          # $SKILL = this skill's base directory, given to you on invoke
```
Then ONE grep for definitions across the top ~8 files
(`grep -n '^def \|^class \|^function \|^export ' f1 f2 …`). Read CLAUDE.md / README only
if they exist — they carry the gotchas and any design tokens. That is all the input you get.

**2 · Decide the journey.** Every system has one path that explains it: a request, a
nightly job, a build, an order, a message. Find it in the code, not in your imagination.
It becomes 10–16 steps. If you cannot name it, ask the user before building anything.

**3 · Write `atlas.data.js`.** Schema and rules: `reference/schema.md`.
Copy rules — this is where the value is, not the graphics: `reference/copy.md`.
Grid layout without overlaps: `reference/layout.md`.

**4 · Theme it to the project.** Four are bundled — `themes/observatory.css` (default),
`foundry.css`, `shopfloor.css`, `drafting.css` (light). Pick the one that fits the subject,
or write ten lines of your own. If the project has its own design tokens, derive from them.
See `reference/theme.md`.

**5 · Build, validate, look.**
```bash
node    $SKILL/scripts/validate.js atlas.data.js            # free; fix everything it reports
python3 $SKILL/scripts/build.py    atlas.data.js atlas.html $SKILL/themes/observatory.css
        $SKILL/scripts/shoot.sh    atlas.html               # 3 viewports, kills its own server
```
Read the three screenshots. Check: no lane label sitting on a block, no block covering a
number badge, the journey legible mid-run, nothing clipped at 720px.

**6 · Ship.** Publish `atlas.html` as an Artifact. Then report, briefly: the journey you
chose, anything you inferred rather than verified, and what will make the map wrong in a
month (it is hand-authored — say so).

## The bar

A reader who has never seen the code should be able to say what the system does, which
part is load-bearing, and what happens when it breaks — without opening a single file.
If a block's panel only restates its filename, the block has failed.

A worked example (26 blocks, 30 edges, 12 steps — a fictional bookshop) is in
`examples/order-flow.data.js`. Read it when the schema is unclear — it is faster than asking.
