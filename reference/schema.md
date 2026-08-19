# atlas.data.js — the whole schema

Five top-level consts. Plain JS, no exports. `build.py` inlines the file into the engine.

## `G` — the lanes (5–8 of them)
```js
const G={
  source:{s:'MAIL IN', n:'Where mail comes in', c:'#6E9187'},
  //      ^floor tag   ^full name in the rail   ^lane colour
};
```
`s` must be short (≤12 chars) — it is drawn on the floor and long labels collide.
`n` is the plain-language name a non-engineer would use. Never the package name.

## `N` — the blocks (25–40)
```js
{id:'parser', c:'P', n:'HTML extractor', g:'ingest',
 x:8, y:3, w:3, h:2, z:36,
 w1:'What it does, 1-3 plain sentences. No jargon, no class names.',
 h1:'How it is built: the libraries, the one non-obvious decision, the gotcha.',
 f:[['ingest/parser.py',67],['ingest/unsubscribe.py',127]],   // path, line count
 s:['trafilatura','html2text']}                                // stack chips
```
- `x,y,w,h` — grid footprint. **No two blocks may overlap**; the validator enforces it.
- `z` — height. Set it from real line count: `z ≈ 18 + lines/28`, capped ~80.
  Height is information: the tallest block must genuinely be the one carrying the most code.
- `c` — 1–2 char code, shown only when zoomed out.

## `COPY` — the words, keyed by block id
```js
const COPY={
 parser:['EXTRACT',                                   // label drawn on the block, ≤12 chars
   'Strips the mail down to the article',             // hover line, ≤62 chars
   'Every later stage reads what this produced. Bad text here cannot be recovered.',  // why it matters
   'The show talks about footers and unsubscribe links. The loudest possible failure.'] // if it breaks
};
```
See `copy.md`. These four strings are the reason anyone keeps the page open.

## `E` — the edges
```js
const E=[ ['sched','runner',1], ['llm','script',0] ];
//         from     to      ^1 = part of the main journey (gets an ambient moving mark)
```
Only real paths. If you cannot point at the call, leave the line out.

## `STEPS` — the journey (10–16)
```js
const STEPS=[
 ['sched','06:40 local time. The scheduler fires this account job.', null],
 ['runner','The run controller builds the account context and starts the pipeline.', ['sched','runner']],
];
//  ^block  ^caption in plain words, what just happened               ^the edge to animate (must exist in E)
```

## `META` — the chrome
```js
const META={
 title:'Northgate Order Flow',        // <title>: 2-4 word name, no explainer after a dash
 name:'Northgate', tag:'Order Flow',  // wordmark
 run:'▶ WATCH ONE MORNING',      // primary button — name the journey, never "run the pipeline"
 stats:[['MOVING PARTS','#blocks'],['STEPS','#steps'],['LINES OF CODE','18,599']],
 intro:{eyebrow:'THE WHOLE THING', h:'One morning, end to end', p:['…','…']},
 key:[['Taller block','more code inside it'], …],   // how to read the map
 movementsLabel:'THE FIVE MOVEMENTS',
 movements:[['Collect','everything that arrived','dispatch'], …],  // label, gloss, block id
 legend:['TALLER = MORE CODE','LINE = A PATH AN ORDER TAKES','MOVING MARK = ONE ORDER'], // canvas legend
 chapters:[[0,'BROWSE'],[2,'CHECKOUT'],[5,'ORDER']],   // step index -> chapter name
 cta:'Press <strong>…</strong> to follow one …',
 done:'Closing line shown when the journey finishes.'
};
```
`'#blocks'` and `'#steps'` are substituted with real counts at boot.
`chapters` names the phases of the journey in the project's own vocabulary: each entry is
`[first step index, name]`. `legend` labels the three marks on the canvas.
