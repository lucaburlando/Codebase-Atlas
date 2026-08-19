#!/usr/bin/env bash
# One call. Everything you are allowed to know before you start drawing.
cd "${1:-.}"
echo "=== BIGGEST FILES (size ranks the map: big file = tall block) ==="
find . -type f \( -name '*.py' -o -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' \
  -o -name '*.go' -o -name '*.rs' -o -name '*.rb' -o -name '*.java' -o -name '*.swift' \) \
  -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/vendor/*' -not -path '*/dist/*' \
  -not -path '*/build/*' -not -path '*/.venv/*' -not -path '*/__pycache__/*' \
  | xargs wc -l 2>/dev/null | sort -rn | sed -n '2,46p'
echo; echo "=== DIRECTORIES ==="
find . -type d -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/.venv/*' \
  -not -path '*/__pycache__/*' -not -path '*/dist/*' | sed -n '1,40p'
echo; echo "=== PROJECT DOCS PRESENT ==="
ls -1 CLAUDE.md README.md README* design-system.md 2>/dev/null
ls -1 docs/decisions/*.md docs/plans/*.md 2>/dev/null | head -12
echo; echo "NEXT: one grep for definitions across the top ~8 files, then stop looking."
