import { createTitleEntranceRuntime } from './title-entrance-core.js';

(() => {
  const root = document.documentElement;
  const studioSource = document.querySelector('[data-assemble="studio"]');
  const nameSource = document.querySelector('[data-assemble="wievien"]');

  if (!(studioSource instanceof HTMLElement) || !(nameSource instanceof HTMLElement)) return;

  let started = false;
  const runtime = createTitleEntranceRuntime({ root, studioSource, nameSource });
  const {
    activeAnimations,
    createLetterScene,
    createWholeWordScene,
    finish,
    later,
    listenOnceToIntent,
    makeGlyphFrames,
    makeShadowFrames,
    playPath,
    point,
    setCompletionTimer,
    showFinalTitle,
  } = runtime;

  const reactToImpact = (scene, indexes, strengthFor, duration, delayStep) => {
    indexes.forEach((index, order) => {
      const force = strengthFor(index, order);
      const delay = order * delayStep;
      const direction = index % 2 === 0 ? -1 : 1;

      activeAnimations.push(
        scene.glyphs[index].animate([
          { transform: 'none' },
          { offset: 0.3, transform: `translate(${direction * force}px, -1px) rotate(${direction * force * 0.1}deg)` },
          { offset: 0.64, transform: `translate(${direction * -force * 0.24}px, 0) rotate(${direction * -force * 0.026}deg)` },
          { transform: 'none' },
        ], { duration, delay, easing: 'cubic-bezier(.18,.8,.22,1)' }),
        scene.casts[index].animate([
          { translate: '0 0', scale: '1' },
          { offset: 0.3, translate: `${direction * force * 0.72}px 0`, scale: `${1 + force * 0.025} .9` },
          { offset: 0.64, translate: `${direction * -force * 0.18}px 0`, scale: '1.02 .97' },
          { translate: '0 0', scale: '1' },
        ], { duration, delay, easing: 'cubic-bezier(.18,.8,.22,1)' }),
        scene.contacts[index].animate([
          { translate: '0 0', scale: '1' },
          { offset: 0.3, translate: `${direction * force * 0.55}px 0`, scale: `${1.12 + force * 0.025} .58` },
          { offset: 0.64, translate: `${direction * -force * 0.14}px 0`, scale: '1.04 .82' },
          { translate: '0 0', scale: '1' },
        ], { duration, delay, easing: 'cubic-bezier(.18,.8,.22,1)' }),
      );
    });
  };

  const playStudio = (scene, vw, vh) => {
    const path = [
      point(0, -67 * vw, 0.8 * vh, 0, -7, 0.97, 1, 1.45),
      point(0.56, 1.9 * vw, 0.15 * vh, 0, 1.8, 1.025, 0.93, 0.55),
      point(0.72, -0.85 * vw, -0.08 * vh, 0, -0.9, 0.992, 1.025, 0.2),
      point(0.86, 0.28 * vw, 0.03 * vh, 0, 0.32, 1.004, 0.99, 0.08),
      point(1, 0, 0, 0, 0, 1, 1, 0),
    ];
    const metric = { left: 0, width: scene.rect.width, originY: scene.rect.height };
    const options = { delay: 180, duration: 1160, easing: 'cubic-bezier(.16,.78,.2,1)' };

    activeAnimations.push(
      scene.glyph.animate(makeGlyphFrames(path, metric), { ...options, fill: 'both' }),
      scene.cast.animate(makeShadowFrames(path, metric, 'cast'), { ...options, fill: 'both' }),
      scene.contact.animate(makeShadowFrames(path, metric, 'contact'), { ...options, fill: 'both' }),
    );

    later(() => {
      studioSource.dataset.titleEntrance = 'complete';
      const inkFade = scene.glyphPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 110, easing: 'ease-out', fill: 'forwards' },
      );
      const shadowFade = scene.shadowPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 230, easing: 'ease-out', fill: 'forwards' },
      );
      Promise.allSettled([inkFade.finished, shadowFade.finished]).then(() => scene.layer.remove());
    }, 1430);
  };

  const playName = (scene, vw, vh) => {
    const paths = [
      [
        point(0, -54 * vw, 0.4 * vh, 0, -11, 0.95, 1, 1.25, 0.22),
        point(0.16, -44 * vw, -0.9 * vh, 1.2 * vh, 6, 0.97, 0.98, 0.95, 0.24),
        point(0.31, -34 * vw, 0.3 * vh, 0, -6.5, 0.98, 0.97, 0.82, 0.76),
        point(0.46, -24 * vw, -0.75 * vh, 1 * vh, 5.5, 0.985, 0.985, 0.66, 0.24),
        point(0.61, -14 * vw, 0.2 * vh, 0, -4.5, 0.992, 0.975, 0.45, 0.76),
        point(0.76, -6 * vw, -0.45 * vh, 0.6 * vh, 3.2, 0.998, 0.99, 0.25, 0.24),
        point(0.9, -1.1 * vw, 0, 0, -1, 1.018, 0.93, 0.18, 0.76),
        point(1, 0, 0, 0, 0, 1, 1, 0, 0.5),
      ],
      [
        point(0, -15 * vw, -45 * vh, 45 * vh, -185, 0.7, 0.7, 0.2),
        point(0.58, 1.9 * vw, -3.6 * vh, 4 * vh, 17, 1.05, 1.04, 0.3),
        point(0.78, 1.1 * vw, 0.3 * vh, 0, 5.5, 1.13, 0.84, 0.1),
        point(1, 0, 0, 0, 0, 1, 1, 0),
      ],
      [
        point(0, -35 * vw, 0, 0, -560, 0.84, 0.84, 1.2),
        point(0.4, -18 * vw, -7 * vh, 8 * vh, -330, 0.92, 0.92, 0.75),
        point(0.72, -3.2 * vw, -3.5 * vh, 4 * vh, -62, 1, 1, 0.35),
        point(0.88, 0.72 * vw, 0.35 * vh, 0, 12, 1.05, 0.92, 0.12),
        point(1, 0, 0, 0, 0, 1, 1, 0),
      ],
      [
        point(0, 0, -72 * vh, 72 * vh, 26, 0.86, 0.86, 0),
        point(0.62, 0, 1.3 * vh, 0, -5, 1.08, 0.72, 0.15),
        point(0.78, 0, -5.6 * vh, 6 * vh, 2, 0.98, 1.06, 0),
        point(0.9, 0, 0.25 * vh, 0, -1, 1.03, 0.91, 0.08),
        point(1, 0, 0, 0, 0, 1, 1, 0),
      ],
      [
        point(0, 9 * vw, 39 * vh, 34 * vh, 188, 0.72, 0.72, 0.25),
        point(0.6, -0.9 * vw, -5.2 * vh, 6 * vh, -18, 1.05, 1.04, 0.12),
        point(0.82, 0.38 * vw, 0.28 * vh, 0, 5, 1.09, 0.87, 0.08),
        point(1, 0, 0, 0, 0, 1, 1, 0),
      ],
      [
        point(0, 25 * vw, -31 * vh, 34 * vh, 122, 0.82, 0.82, 0.3),
        point(0.4, 13 * vw, -19 * vh, 22 * vh, 60, 0.94, 0.94, 0.2),
        point(0.72, 2.2 * vw, -3.2 * vh, 4 * vh, 10, 1.01, 1.01, 0.1),
        point(0.88, -0.58 * vw, 0.32 * vh, 0, -7, 1.05, 0.92, 0.08),
        point(1, 0, 0, 0, 0, 1, 1, 0),
      ],
      [
        point(0, 61 * vw, 0, 0, 8, 1.06, 0.98, 2.1),
        point(0.56, -2.5 * vw, 0, 0, -2, 1.05, 0.95, 1.8),
        point(0.74, 1.55 * vw, 0, 0, 0.8, 1.01, 1, 0.9),
        point(0.9, -0.38 * vw, 0, 0, -0.3, 1, 1, 0.25),
        point(1, 0, 0, 0, 0, 1, 1, 0),
      ],
    ];

    const sequences = [
      { delay: 1720, duration: 1580, easing: 'cubic-bezier(.18,.74,.2,1)', shadowLead: 0 },
      { delay: 3050, duration: 820, easing: 'cubic-bezier(.16,.88,.22,1)', shadowLead: 170 },
      { delay: 3370, duration: 1040, easing: 'cubic-bezier(.2,.72,.18,1)', shadowLead: 80 },
      { delay: 4700, duration: 1040, easing: 'cubic-bezier(.14,.84,.22,1)', shadowLead: 260 },
      { delay: 5620, duration: 660, easing: 'cubic-bezier(.17,.86,.25,1)', shadowLead: 120 },
      { delay: 5800, duration: 900, easing: 'cubic-bezier(.2,.78,.2,1)', shadowLead: 160 },
      { delay: 6460, duration: 910, easing: 'cubic-bezier(.1,.76,.18,1)', shadowLead: 130 },
    ];

    paths.forEach((path, index) => playPath(scene, index, path, sequences[index]));

    later(() => {
      reactToImpact(scene, [2, 1, 0], (index, order) => 4 - order, 320, 28);
    }, 5350);

    later(() => {
      reactToImpact(scene, [5, 4, 3, 2, 1, 0], (index, order) => Math.max(1.2, 7 - order * 0.9), 330, 34);
    }, 7010);

    later(() => {
      activeAnimations.push(
        scene.glyphPlane.animate([
          { transform: 'translateY(0)' },
          { offset: 0.5, transform: 'translateY(-1.5px)' },
          { transform: 'translateY(0)' },
        ], { duration: 210, easing: 'cubic-bezier(.2,.8,.2,1)' }),
        scene.shadowPlane.animate([
          { opacity: 1, transform: 'scaleX(1.015)' },
          { opacity: 0.9, transform: 'scaleX(1)' },
        ], { duration: 230, easing: 'ease-out', fill: 'forwards' }),
      );
    }, 7410);

    later(() => {
      nameSource.dataset.titleEntrance = 'complete';
      nameSource.animate([
        { transform: 'translateY(-1.5px)', textShadow: '0.025em 0.08em 0.12em rgb(23 23 22 / 0.22)' },
        { transform: 'translateY(0)', textShadow: '0.02em 0.055em 0.08em rgb(23 23 22 / 0.15)' },
      ], { duration: 230, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' });
      const glyphFade = scene.glyphPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 120, easing: 'ease-out', fill: 'forwards' },
      );
      const shadowFade = scene.shadowPlane.animate(
        [{ opacity: 0.9 }, { offset: 0.22, opacity: 0.78 }, { opacity: 0 }],
        { duration: 520, easing: 'ease-out', fill: 'forwards' },
      );
      Promise.allSettled([glyphFade.finished, shadowFade.finished]).then(() => scene.layer.remove());
    }, 7640);
  };

  const start = () => {
    if (started) return;
    started = true;

    try {
      if (!Element.prototype.animate) throw new Error('Web Animations API unavailable');
      if (root.dataset.assembly !== 'playing') return;

      const studioScene = createWholeWordScene(studioSource);
      const nameScene = createLetterScene(nameSource);
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;

      listenOnceToIntent();
      playStudio(studioScene, vw, vh);
      playName(nameScene, vw, vh);
      setCompletionTimer(10700);
    } catch {
      showFinalTitle();
      finish(true);
    }
  };

  if (root.dataset.assembly === 'playing') {
    start();
    return;
  }

  const observer = new MutationObserver(() => {
    if (root.dataset.assembly === 'playing') {
      observer.disconnect();
      start();
    }
  });

  observer.observe(root, { attributes: true, attributeFilter: ['data-assembly'] });
})();
