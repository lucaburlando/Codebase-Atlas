#!/usr/bin/env bash
# usage: shoot.sh <file.html> [outdir]   — serves, screenshots 3 viewports, kills the server.
set -e
F="$(realpath "$1")"; D="$(dirname "$F")"; B="$(basename "$F")"; O="${2:-$D}"
CH="$(command -v chromium chromium-browser google-chrome google-chrome-stable 2>/dev/null | head -1)"
[ -z "$CH" ] && CH="$(ls -d "$HOME"/.cache/ms-playwright/chromium-*/chrome-linux*/chrome 2>/dev/null | tail -1)"
[ -z "$CH" ] && CH="$(ls -d /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome 2>/dev/null | head -1)"
if [ -z "$CH" ]; then echo "no chromium found — install nothing, skip the visual check and say so"; exit 3; fi
P=$((8900+RANDOM%80))
( cd "$D"; exec python3 -m http.server $P >/dev/null 2>&1 ) & SRV=$!
sleep 1
for V in "1600x900:wide" "1440x860:laptop" "720x900:narrow"; do
  SIZE="${V%%:*}"; NAME="${V##*:}"
  "$CH" --headless=new --disable-gpu --no-sandbox --virtual-time-budget=2500 \
    --window-size="${SIZE/x/,}" --screenshot="$O/shot-$NAME.png" \
    "http://127.0.0.1:$P/$B" 2>/dev/null || true
done
kill "$SRV" 2>/dev/null || true; sleep 0.3
if curl -s -m 1 -o /dev/null "http://127.0.0.1:$P/"; then echo "WARNING: server still up on $P"; else echo "server stopped"; fi
ls -1 "$O"/shot-*.png
