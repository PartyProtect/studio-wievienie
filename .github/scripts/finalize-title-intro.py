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


css_path = Path("site/src/styles/title-entrance.css")
css = css_path.read_text()
css = replace_once(
    css,
    """html[data-assembly='pending'] [data-assemble='studio'],
html[data-assembly='playing'] [data-assemble='studio'],
html[data-assembly='pending'] [data-assemble='wievien'],
html[data-assembly='playing'] [data-assemble='wievien'] {
  visibility: hidden !important;
  opacity: 1 !important;
  animation: none !important;
  transform: none !important;
}

html[data-assembly='playing'] [data-assemble='studio'][data-title-entrance='complete'],
html[data-assembly='playing'] [data-assemble='wievien'][data-title-entrance='complete'] {
  visibility: visible !important;
}""",
    """html[data-assembly='pending'] [data-assemble='studio'],
html[data-assembly='playing'] [data-assemble='studio'],
html[data-assembly='pending'] [data-assemble='wievien'],
html[data-assembly='playing'] [data-assemble='wievien'] {
  visibility: visible !important;
  opacity: 0 !important;
  animation: none !important;
  transform: none !important;
}

html[data-assembly='playing'] [data-assemble='studio'][data-title-entrance='complete'],
html[data-assembly='playing'] [data-assemble='wievien'][data-title-entrance='complete'] {
  opacity: 1 !important;
}""",
    "accessible source title",
)
css_path.write_text(css)

core_path = Path("site/src/scripts/title-entrance-core.js")
core = core_path.read_text()
if "layer.setAttribute('aria-hidden', 'true');" not in core:
    core = regex_once(
        core,
        r"(const layer = document\.createElement\('div'\);\n\s+layer\.className = [^\n]+;\n)",
        r"\1    layer.setAttribute('aria-hidden', 'true');\n",
        "motion layer aria-hidden",
    )
core_path.write_text(core)

title_path = Path("site/src/scripts/title-entrance.js")
title = title_path.read_text()
title = replace_once(
    title,
    """  const activeAnimations = [];
  let completionTimer;
""",
    """  const activeAnimations = [];
  let completionTimer;
  let skipRequested = false;

  const handleIntroSkip = () => {
    skipRequested = true;
    window.StudioWievienTitleEntranceState?.finish?.();
  };

  window.addEventListener('studio-wievien:intro-skip', handleIntroSkip, { once: true });
""",
    "skip listener",
)
title = replace_once(
    title,
    """    completionTimer = window.setTimeout(() => {
      window.StudioWievienTitleEntranceState?.finish?.();
    }, delay);
""",
    """    completionTimer = window.setTimeout(() => {
      window.removeEventListener('studio-wievien:intro-skip', handleIntroSkip);
      window.StudioWievienTitleEntranceState?.finish?.();
    }, delay);
""",
    "skip cleanup",
)
title = replace_once(
    title,
    """    if (result.status === 'ok') {
      window.StudioWievienTitleEntranceState = {
""",
    """    if (result.status === 'ok') {
      if (skipRequested) {
        result.finish();
        return;
      }

      window.StudioWievienTitleEntranceState = {
""",
    "early skip handoff",
)
title = replace_once(
    title,
    """    if (result.status === 'cancelled') return;

    setCompletionTimer(0);
""",
    """    if (result.status === 'cancelled') {
      window.removeEventListener('studio-wievien:intro-skip', handleIntroSkip);
      return;
    }

    window.removeEventListener('studio-wievien:intro-skip', handleIntroSkip);
    setCompletionTimer(0);
""",
    "cancel cleanup",
)
title_path.write_text(title)

layout_path = Path("site/src/layouts/BaseLayout.astro")
layout = layout_path.read_text()
layout = replace_once(
    layout,
    """      let assemblyTimer;
      let fontGateTimer;

      const finishAssembly = () => {
""",
    """      let assemblyTimer;
      let fontGateTimer;
      let intentController;

      const finishAssembly = () => {
        intentController?.abort();
""",
    "intent controller",
)
layout = replace_once(
    layout,
    """          root.dataset.assembly = 'playing';

          try {
""",
    """          root.dataset.assembly = 'playing';

          intentController = new AbortController();
          const interruptAssembly = () => {
            window.dispatchEvent(new CustomEvent('studio-wievien:intro-skip'));
            finishAssembly();
          };
          const intentOptions = { signal: intentController.signal, passive: true };

          for (const eventName of ['pointerdown', 'wheel', 'touchmove', 'keydown']) {
            window.addEventListener(eventName, interruptAssembly, intentOptions);
          }
          document.addEventListener('visibilitychange', () => {
            if (document.hidden) interruptAssembly();
          }, { signal: intentController.signal });

          try {
""",
    "intent interrupt binding",
)
layout_path.write_text(layout)

old_component = Path("site/src/components/AssemblyCrew.astro")
new_component = Path("site/src/components/TitleEntrance.astro")
new_component.write_text(old_component.read_text())
old_component.unlink()

index_path = Path("site/src/pages/index.astro")
index = index_path.read_text()
index = replace_once(
    index,
    "import AssemblyCrew from '@/components/AssemblyCrew.astro';",
    "import TitleEntrance from '@/components/TitleEntrance.astro';",
    "component import",
)
index = replace_once(index, "<AssemblyCrew />", "<TitleEntrance />", "component use")
index_path.write_text(index)

for temporary in [
    Path("site/.finalize-title-intro-trigger"),
    Path(".github/workflows/finalize-title-intro.yml"),
    Path(".github/scripts/finalize-title-intro.py"),
]:
    if temporary.exists():
        temporary.unlink()
