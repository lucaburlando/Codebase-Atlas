# Writing the words

The graphics are done for you. The words are the deliverable.

## The four strings, per block

1. **Label** (≤12 chars, on the block) — what a user would call it. `SCRIPT`, not `S3`.
   `FEEDS`, not `ingest.rss`. `BILLING`, not `StripeWebhookHandler`.
2. **Hover line** (≤62 chars) — one clause. The map must be skimmable without clicking.
3. **Why it matters** — the product consequence. Money, trust, speed, conversion, quality.
   Not "handles parsing" but "every later stage reads what this produced".
4. **If it breaks** — what a *user* sees. Not the exception class.
   "Duplicate episodes in the feed. Listeners notice within a day."

## Rules

- Name things the way a user would, never the way the code does. A person manages
  notifications, not webhook config.
- One idea per sentence. Short sentences. Active voice.
- No adjectives doing the work of facts. "Robust", "powerful", "seamless" are noise.
- Numbers must be real. If you did not measure it, do not state it. Say what you inferred.
- The step captions tell a story with a clock in it: what happens, in order, to one unit
  of work. Present tense.
- If a block's text only restates its filename, delete the block or learn what it does.

## The test

Read one block's panel aloud to someone who has never seen the repo. If they cannot say
why that block exists, rewrite it.
