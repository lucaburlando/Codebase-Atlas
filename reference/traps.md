# Traps already fixed in the engine — do not reintroduce them

Listed so you recognise them if you edit `assets/engine.html`. Every one cost a
screenshot round when this was built by hand.

1. **Grid children default to `min-width:auto`.** A long list inside a grid column forces
   the whole page wider than the viewport. Needs `minmax(0,1fr)` on the track and
   `min-width:0` on the child.
2. **Canvas boots blank** if sized from a `window.resize` listener. Size it from a
   `ResizeObserver` on the canvas parent, and ignore sizes under 2px.
3. **Labels, number badges and tooltips get covered** by blocks drawn later in the
   painter's-algorithm pass. They are queued and drawn after every block.
4. **Lane labels land on blocks.** Each label searches upward for a clear slot, tested
   against every block box *and* every label already placed.
5. **`file://` is blocked** for browser automation. Serve on localhost (`shoot.sh` does).
6. **The artifact host injects doctype/head/body.** The engine is page content only. For
   local preview `build.py` output works directly because the host wrapper is optional.
7. **Playwright's browser may not be installed.** `shoot.sh` finds an existing Chromium
   and exits 3 if there is none. Never install one.
8. **Killing the preview server**: `pgrep -f` matches your own shell wrapper. Verify the
   port is dead with `curl`, not with `pgrep`.
