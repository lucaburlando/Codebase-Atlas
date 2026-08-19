# Laying out the grid

The map is isometric: `screen.x = (x-y)·31`, `screen.y = (x+y)·15.5 − z`. Two consequences:
**+x goes right-and-down, +y goes left-and-down.** A flow reads best along +x.

## Method

1. Put the main journey on one diagonal band: lanes at increasing `x`, each stage ~4 apart
   (`x = 0, 4, 8, 12, 16, 20, 25, 29, 32, 36`).
2. Parallel siblings inside a stage vary `y` (`y = 0, 3, 6`).
3. Supporting systems (web app, admin, ops) go in a second band at `y = 11…15`.
4. Ledgers and stores (database, cost log, history) sit low (`z` 16–22) near what writes them.
5. Standard footprints: `w:3,h:2` for most, `w:4,h:3` for the one centrepiece block.
6. Leave one empty grid cell between neighbours; blocks that touch read as one shape.

## Rules the validator enforces

- No two footprints may overlap. Blocks are drawn back-to-front by `x+y`, so an overlap
  means one block eats another and it is invisible in the code.
- Every edge endpoint and every journey step must name a real block id.

## Heights

`z ≈ 18 + lines/28`, capped around 80. The tallest block should be the one you would
warn a new engineer about first. If your tallest block is a config file, your heights lie.
