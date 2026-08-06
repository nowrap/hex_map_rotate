# hex_map_rotate
A NodeJS rotator making hex maps compatible with [Pathfinder Kingmaker Adventure Path](https://pathfinderwiki.com/wiki/Kingmaker_(adventure_path)) capable of reading our MediaWiki and uploading the generated map.

It creates a SVG and a PDF based from the [Kingmaker Playerguide](https://paizo.com/products/btpy8dqh?Pathfinder-Adventure-Path-Kingmaker-Players-Guide).

## credits
The original perl based tool is from https://alexschroeder.ch/cgit/hex-mapping and included as a git submodule.

All map icons are the **Gnomeyland SVG Map Icons**, Copyright Gregory B. MacKenzie 2012,
Alex Schroeder 2013–2019, licensed under
[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
They come with the hex-mapping submodule.

## dependencies
For ubuntu you need nodejs and these two perl packages:
```console
apt install libmodern-perl-perl libmojolicious-perl
```
