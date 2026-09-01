from pathlib import Path


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected one match, found {count}")
    return text.replace(old, new, 1)


layout_path = Path("site/src/layouts/BaseLayout.astro")
layout = layout_path.read_text()
layout = replace_once(
    layout,
    "['pointerdown', 'wheel', 'touchmove', 'keydown']",
    "['pointerdown', 'wheel', 'touchmove', 'keydown', 'resize', 'orientationchange']",
    "layout-change interrupt",
)
layout_path.write_text(layout)

for path_name in [
    "site/src/scripts/title-entrance.js",
    "site/src/scripts/title-entrance-core.js",
]:
    path = Path(path_name)
    text = path.read_text()
    if ".dataset.letterEntrance = 'complete';" in text:
        text = text.replace(
            ".dataset.letterEntrance = 'complete';",
            ".dataset.titleEntrance = 'complete';\n    wievienSource.dataset.letterEntrance = 'complete';",
        )
    path.write_text(text)

css_path = Path("site/src/styles/title-entrance.css")
css = css_path.read_text()
old = """html[data-assembly='playing'] [data-assemble='studio'][data-title-entrance='complete'],
html[data-assembly='playing'] [data-assemble='wievien'][data-title-entrance='complete'] {
  opacity: 1 !important;
}"""
new = """html[data-assembly='playing'] [data-assemble='studio'][data-title-entrance='complete'],
html[data-assembly='playing'] [data-assemble='wievien'][data-title-entrance='complete'],
html[data-assembly='playing'] [data-assemble='wievien'][data-letter-entrance='complete'] {
  opacity: 1 !important;
}"""
if old in css:
    css = replace_once(css, old, new, "completion selector")
css_path.write_text(css)

for temporary in [
    Path("site/.fix-intro-contract-trigger"),
    Path(".github/workflows/fix-intro-contract.yml"),
    Path(".github/scripts/fix-intro-contract.py"),
]:
    if temporary.exists():
        temporary.unlink()
