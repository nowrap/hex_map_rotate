# hex_map_rotate
A NodeJS rotator making hex maps compatible with [Pathfinder Kingmaker Adventure Path](https://pathfinderwiki.com/wiki/Kingmaker_(adventure_path)) capable of reading our MediaWiki and uploading the generated map.

It creates a SVG and a PDF based from the [Kingmaker Playerguide](https://paizo.com/products/btpy8dqh?Pathfinder-Adventure-Path-Kingmaker-Players-Guide).

## credits
The original perl based tool ([text-mapper](https://src.alexschroeder.ch/hex-mapping.git) by
Alex Schroeder, GPL v3+) is included as a git submodule and invoked as an external program.

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

## license
This repository mixes several licenses — one root `LICENSE` cannot cover all of it:

| Part | License |
|---|---|
| Tooling code — `*.js`, `package.json` | **MIT** (see [`LICENSE`](LICENSE)) |
| Generated maps — `greenbelt.svg`, `greenbelt_rotated.svg`, `greenbelt.pdf`, `greenbelt_temp.pdf` | **CC BY-SA 3.0** — they embed the Gnomeyland icons, so Share-Alike carries to the whole map. They are **not** MIT. |
| Gnomeyland terrain icons (`gnomeyland.txt`) | CC BY-SA 3.0 © Gregory B. MacKenzie 2012, Alex Schroeder 2013–2019 |
| Encounter-marker icons in `lib.txt` | from the [Noun Project](https://thenounproject.com/) (CC BY). Per-icon attribution is incomplete — see note below. |
| `lib/hex-mapping` submodule (text-mapper) | **GPL v3+**, Alex Schroeder. Invoked as an external program, not bundled — its copyleft does not extend to the MIT tooling here. |
| `map_kingmaker_template.pdf` | © Paizo Inc. / Ulisses Spiele, from the Kingmaker Player's Guide. Included for **personal use only**; not covered by any of the licenses above. |

> **Icon attribution gap:** `lib.txt` carries no per-icon author records, which CC BY strictly
> requires. If you redistribute the maps and can identify the original Noun Project authors,
> please add them; otherwise treat this as best-effort attribution to the Noun Project.

Pathfinder and Kingmaker are trademarks of Paizo Inc.; this project is unaffiliated with and
unendorsed by Paizo.
