#!/usr/bin/env python3
"""Bundles the app into one self-contained HTML file.

    python3 tools/build.py

The result (dist/tig-keszito.html) has no external requests at all, so it runs
by double-clicking it, from a USB stick, or from any static host.
"""

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "dist" / "tig-keszito.html"


def read(relative: str) -> str:
    return (ROOT / relative).read_text(encoding="utf-8")


def inline_scripts(html: str) -> str:
    def replace(match: "re.Match[str]") -> str:
        source = read(match.group(1))
        # A literal </script> inside the code would close the tag early.
        source = source.replace("</script", "<\\/script")
        return f"<script>\n{source}\n</script>"

    return re.sub(r'<script src="([^"]+)"></script>', replace, html)


def inline_styles(html: str) -> str:
    def replace(match: "re.Match[str]") -> str:
        return f"<style>\n{read(match.group(1))}\n</style>"

    return re.sub(r'<link rel="stylesheet" href="([^"]+)">', replace, html)


def main() -> int:
    html = read("index.html")
    html = inline_styles(html)
    html = inline_scripts(html)

    leftovers = re.findall(r'(?:src|href)="(?!data:)([^"]+)"', html)
    if leftovers:
        print("External references remain:", leftovers, file=sys.stderr)
        return 1

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    print(f"{OUT.relative_to(ROOT)}  {OUT.stat().st_size / 1024 / 1024:.2f} MB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
