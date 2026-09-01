from pathlib import Path
import re


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected one match, found {count}")
    return text.replace(old, new, 1)


def regex_once(text: str, pattern: str, replacement: str, label: str) -> str:
    updated, count = re.subn(pattern, replacement, text, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f"{label}: expected one match, found {count}")
    return updated


title_path = Path("site/src/scripts/title-entrance.js")
title = title_path.read_text()

impact_engine = r'''  const reactToImpact = (scene, indexes, strengthFor, duration, delayStep) => {
    indexes.forEach((index, order) => {
      const direction = -1;
      const force = strengthFor(index, order);
      const delay = order * delayStep;
      const lift = Math.min(7.5, 1.4 + force * 0.28);
      const squeezeX = 1 + force * 0.0065;
      const squeezeY = Math.max(0.82, 1 - force * 0.0105);

      activeAnimations.push(
        scene.glyphs[index].animate(
          [
            { transform: 'none' },
            {
              offset: 0.22,
              transform: `translate(${direction * force}px, ${-lift}px) rotate(${direction * force * 0.09}deg) scale(${squeezeX}, ${squeezeY})`,
            },
            {
              offset: 0.48,
              transform: `translate(${direction * force * 0.55}px, ${lift * 0.24}px) rotate(${direction * force * 0.045}deg) scale(.985, 1.03)`,
            },
            {
              offset: 0.72,
              transform: `translate(${direction * -force * 0.22}px, -0.4px) rotate(${direction * -force * 0.022}deg) scale(1.006, .992)`,
            },
            { transform: 'none' },
          ],
          { duration, delay, easing: 'cubic-bezier(.14,.8,.18,1)', fill: 'both' },
        ),
      );

      activeAnimations.push(
        scene.casts[index].animate(
          [
            { transform: 'none', opacity: 0.18 },
            {
              offset: 0.22,
              transform: `translate(${direction * force * 1.35}px, 3px) skewX(${direction * 12}deg) scale(1.24, .63)`,
              opacity: 0.36,
            },
            {
              offset: 0.52,
              transform: `translate(${direction * force * 0.5}px, 1px) skewX(${direction * 4}deg) scale(.92, 1.04)`,
              opacity: 0.21,
            },
            { transform: 'none', opacity: 0.18 },
          ],
          { duration, delay, easing: 'cubic-bezier(.14,.8,.18,1)', fill: 'both' },
        ),
      );

      activeAnimations.push(
        scene.contacts[index].animate(
          [
            { transform: 'none', opacity: 0.18 },
            {
              offset: 0.2,
              transform: `translateX(${direction * force * 0.72}px) scaleX(${1.55 + force * 0.025}) scaleY(.43)`,
              opacity: 0.46,
            },
            {
              offset: 0.5,
              transform: `translateX(${direction * force * 0.22}px) scaleX(.88) scaleY(.92)`,
              opacity: 0.2,
            },
            { transform: 'none', opacity: 0.18 },
          ],
          { duration, delay, easing: 'ease-out', fill: 'both' },
        ),
      );
    });
  };'''

title = regex_once(
    title,
    r"  const reactToImpact = .*?\n\n  const playStudio =",
    impact_engine + "\n\n  const playStudio =",
    "impact engine",
)

title = replace_once(
    title,
    """      point(0, -46 * vw, 0.45 * vh, 0, -5.5, 0.975, 1, 1.2),
      point(0.54, 1.55 * vw, 0.12 * vh, 0, 1.45, 1.022, 0.94, 0.48),
      point(0.72, -0.68 * vw, -0.06 * vh, 0, -0.72, 0.994, 1.02, 0.18),
      point(0.87, 0.22 * vw, 0.02 * vh, 0, 0.24, 1.003, 0.992, 0.06),""",
    """      point(0, -39 * vw, 0.32 * vh, 0, -4.8, 0.978, 1, 1.08),
      point(0.54, 1.35 * vw, 0.1 * vh, 0, 1.2, 1.018, 0.95, 0.42),
      point(0.72, -0.58 * vw, -0.05 * vh, 0, -0.62, 0.995, 1.017, 0.15),
      point(0.87, 0.19 * vw, 0.015 * vh, 0, 0.2, 1.002, 0.994, 0.05),""",
    "Studio path",
)
title = replace_once(
    title,
    "    const options = { delay: 70, duration: 980, easing: 'cubic-bezier(.14,.82,.18,1)' };",
    "    const options = { delay: 60, duration: 900, easing: 'cubic-bezier(.14,.82,.18,1)' };",
    "Studio timing",
)
title = replace_once(title, "    }, 1110);", "    }, 1010);", "Studio handoff")

title = replace_once(
    title,
    """        point(0, -38 * vw, 0.35 * vh, 0, -12, 0.95, 1, 1.25, 0.22),
        point(0.16, -30 * vw, -0.9 * vh, 1.2 * vh, 7, 0.97, 0.98, 0.95, 0.24),
        point(0.31, -22 * vw, 0.3 * vh, 0, -7, 0.98, 0.97, 0.82, 0.76),
        point(0.46, -14 * vw, -0.75 * vh, 1 * vh, 6, 0.985, 0.985, 0.66, 0.24),
        point(0.61, -7 * vw, 0.2 * vh, 0, -4.8, 0.992, 0.975, 0.45, 0.76),
        point(0.76, -2.4 * vw, -0.45 * vh, 0.6 * vh, 3.4, 0.998, 0.99, 0.25, 0.24),
        point(0.9, -0.45 * vw, 0, 0, -1.1, 1.025, 0.91, 0.2, 0.76),""",
    """        point(0, -28 * vw, 0.25 * vh, 0, -12, 0.95, 1, 1.18, 0.22),
        point(0.16, -22 * vw, -0.9 * vh, 1.2 * vh, 7.5, 0.97, 0.98, 0.9, 0.24),
        point(0.31, -16 * vw, 0.3 * vh, 0, -7.5, 0.98, 0.97, 0.75, 0.76),
        point(0.46, -10 * vw, -0.75 * vh, 1 * vh, 6.5, 0.985, 0.985, 0.58, 0.24),
        point(0.61, -5 * vw, 0.2 * vh, 0, -5.2, 0.992, 0.975, 0.38, 0.76),
        point(0.76, -1.55 * vw, -0.45 * vh, 0.6 * vh, 3.7, 0.998, 0.99, 0.2, 0.24),
        point(0.9, -0.28 * vw, 0, 0, -1.2, 1.03, 0.9, 0.17, 0.76),""",
    "W staging",
)
title = replace_once(
    title,
    "      { delay: 1320, duration: 1380, easing: 'linear', shadowLead: 0 },",
    "      { delay: 1160, duration: 1320, easing: 'linear', shadowLead: 0 },",
    "W timing",
)
title = replace_once(
    title,
    "      { delay: 2780, duration: 700, easing: 'cubic-bezier(.16,.88,.22,1)', shadowLead: 150 },",
    "      { delay: 2600, duration: 680, easing: 'cubic-bezier(.16,.88,.22,1)', shadowLead: 150 },",
    "first i timing",
)
title = replace_once(
    title,
    "      { delay: 3100, duration: 900, easing: 'cubic-bezier(.2,.72,.18,1)', shadowLead: 90 },",
    "      { delay: 2890, duration: 880, easing: 'cubic-bezier(.2,.72,.18,1)', shadowLead: 90 },",
    "first e timing",
)
title = replace_once(
    title,
    "      { delay: 4140, duration: 1020, easing: 'cubic-bezier(.14,.84,.22,1)', shadowLead: 300 },",
    "      { delay: 3890, duration: 1020, easing: 'cubic-bezier(.14,.84,.22,1)', shadowLead: 320 },",
    "v timing",
)
title = replace_once(
    title,
    "      { delay: 5120, duration: 620, easing: 'cubic-bezier(.17,.86,.25,1)', shadowLead: 120 },",
    "      { delay: 4890, duration: 610, easing: 'cubic-bezier(.17,.86,.25,1)', shadowLead: 120 },",
    "second i timing",
)
title = replace_once(
    title,
    "      { delay: 5340, duration: 820, easing: 'cubic-bezier(.2,.78,.2,1)', shadowLead: 150 },",
    "      { delay: 5100, duration: 810, easing: 'cubic-bezier(.2,.78,.2,1)', shadowLead: 150 },",
    "second e timing",
)
title = replace_once(
    title,
    "      { delay: 5960, duration: 900, easing: 'cubic-bezier(.1,.76,.18,1)', shadowLead: 180 },",
    "      { delay: 5700, duration: 920, easing: 'cubic-bezier(.1,.76,.18,1)', shadowLead: 210 },",
    "n timing",
)

title = replace_once(
    title,
    "      reactToImpact(scene, [2, 1, 0], (index, order) => 9 - order * 1.7, 430, 42);\n    }, 4770);",
    "      reactToImpact(scene, [2, 1, 0], (index, order) => 17 - order * 3.2, 540, 48);\n    }, 4510);",
    "v impact",
)
title = replace_once(
    title,
    "      reactToImpact(scene, [5, 4, 3, 2, 1, 0], (index, order) => Math.max(3, 12.5 - order * 1.65), 460, 40);\n    }, 6470);",
    "      reactToImpact(scene, [5, 4, 3, 2, 1, 0], (index, order) => Math.max(5, 21 - order * 3.1), 560, 46);\n    }, 6200);",
    "n impact",
)
title = replace_once(title, "    }, 7130);", "    }, 7000);", "collective settle")
title = replace_once(title, "    }, 7470);", "    }, 7410);", "title handoff")
title = replace_once(title, "      setCompletionTimer(9400);", "      setCompletionTimer(9300);", "completion timer")
title_path.write_text(title)

css_path = Path("site/src/styles/title-entrance.css")
css = css_path.read_text()
for old, new, label in [
    ("  color: rgb(23 23 22 / 0.13);", "  color: rgb(23 23 22 / 0.15);", "cast density"),
    ("  filter: blur(5.3px);", "  filter: blur(5.7px);", "cast softness"),
    ("  background: rgb(23 23 22 / 0.46);", "  background: rgb(23 23 22 / 0.54);", "contact density"),
    ("  filter: blur(4.4px);", "  filter: blur(3.9px);", "contact sharpness"),
    ("animation: assembly-small-settle 500ms 7750ms", "animation: assembly-small-settle 500ms 7760ms", "header reveal"),
    ("animation: title-image-frame-in 1120ms 7650ms", "animation: title-image-frame-in 1120ms 7580ms", "image frame reveal"),
    ("animation: title-image-content-in 1280ms 7650ms", "animation: title-image-content-in 1280ms 7580ms", "image content reveal"),
    ("[data-assemble='guides'] { animation-delay: 7520ms", "[data-assemble='guides'] { animation-delay: 7460ms", "guides"),
    ("assembly-guide-top { animation-delay: 7560ms", "assembly-guide-top { animation-delay: 7500ms", "top guide"),
    ("assembly-guide-right { animation-delay: 7740ms", "assembly-guide-right { animation-delay: 7680ms", "right guide"),
    ("assembly-guide-cross { animation-delay: 7920ms", "assembly-guide-cross { animation-delay: 7860ms", "cross guide"),
    ("[data-assemble='fields'] { animation-delay: 7840ms", "[data-assemble='fields'] { animation-delay: 7790ms", "fields"),
    ("[data-assemble='cta'] { animation-delay: 8060ms", "[data-assemble='cta'] { animation-delay: 8010ms", "cta"),
    ("[data-assemble='caption'] { animation-delay: 8100ms", "[data-assemble='caption'] { animation-delay: 8050ms", "caption"),
    ("[data-assemble='index'] { animation-delay: 8240ms", "[data-assemble='index'] { animation-delay: 8190ms", "index"),
    ("nth-child(1) { animation-delay: 8360ms", "nth-child(1) { animation-delay: 8310ms", "door one"),
    ("nth-child(2) { animation-delay: 8470ms", "nth-child(2) { animation-delay: 8420ms", "door two"),
    ("nth-child(3) { animation-delay: 8580ms", "nth-child(3) { animation-delay: 8530ms", "door three"),
    ("nth-child(4) { animation-delay: 8690ms", "nth-child(4) { animation-delay: 8640ms", "door four"),
]:
    css = replace_once(css, old, new, label)
css_path.write_text(css)

for temporary in [
    Path("site/.title-impact-trigger"),
    Path(".github/workflows/apply-title-impact.yml"),
    Path(".github/scripts/apply-title-impact.py"),
]:
    if temporary.exists():
        temporary.unlink()
