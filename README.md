# hex_map_rotate
A NodeJS rotator making hex maps compatible with [Pathfinder Kingmaker Adventure Path](https://pathfinderwiki.com/wiki/Kingmaker_(adventure_path)) capable of reading our MediaWiki and uploading the generated map.

It creates a SVG and a PDF based from the [Kingmaker Playerguide](https://paizo.com/products/btpy8dqh?Pathfinder-Adventure-Path-Kingmaker-Players-Guide).

## credits
The original perl based tool is from https://alexschroeder.ch/cgit/hex-mapping and included as a git submodule.

`greenbelt.txt` includes two icon libraries:

- **Gnomeyland SVG Map Icons** — the terrain icons. Copyright Gregory B. MacKenzie 2012,
  Alex Schroeder 2013–2019, licensed under
  [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
  Included from `campaignwiki.org/contrib/gnomeyland.txt`.
- **`lib.txt`** — the encounter markers (hydra, wild boar, old oak, and the rest).
  Icons from the [noun project](https://thenounproject.com/), served from `creo-ignem.net`.

## dependencies
For ubuntu you need nodejs and these perl packages:
```console
apt install libmodern-perl-perl libmojolicious-perl liblist-moreutils-perl liblwp-protocol-https-perl
```
`liblwp-protocol-https-perl` pulls in `LWP::UserAgent` and TLS support, needed for the
`include https://…` lines in the map source.
