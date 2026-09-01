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
  };

  const playStudio = (scene, vw, vh) => {
    const path = [
      point(0, -39 * vw, 0.32 * vh, 0, -4.8, 0.978, 1, 1.08),
      point(0.54, 1.35 * vw, 0.1 * vh, 0, 1.2, 1.018, 0.95, 0.42),
      point(0.72, -0.58 * vw, -0.05 * vh, 0, -0.62, 0.995, 1.017, 0.15),
      point(0.87, 0.19 * vw, 0.015 * vh, 0, 0.2, 1.002, 0.994, 0.05),
      point(1, 0, 0, 0, 0, 1, 1, 0),
    ];
    const metric = { left: 0, width: scene.rect.width, originY: scene.rect.height };
    const options = { delay: 60, duration: 900, easing: 'cubic-bezier(.14,.82,.18,1)' };

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
    }, 1010);
  };

  const playName = (scene, vw, vh) => {
    const paths = [
      [
        point(0, -28 * vw, 0.25 * vh, 0, -12, 0.95, 1, 1.18, 0.22),
        point(0.16, -22 * vw, -0.9 * vh, 1.2 * vh, 7.5, 0.97, 0.98, 0.9, 0.24),
        point(0.31, -16 * vw, 0.3 * vh, 0, -7.5, 0.98, 0.97, 0.75, 0.76),
        point(0.46, -10 * vw, -0.75 * vh, 1 * vh, 6.5, 0.985, 0.985, 0.58, 0.24),
        point(0.61, -5 * vw, 0.2 * vh, 0, -5.2, 0.992, 0.975, 0.38, 0.76),
        point(0.76, -1.55 * vw, -0.45 * vh, 0.6 * vh, 3.7, 0.998, 0.99, 0.2, 0.24),
        point(0.9, -0.28 * vw, 0, 0, -1.2, 1.03, 0.9, 0.17, 0.76),
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
      { delay: 1160, duration: 1320, easing: 'linear', shadowLead: 0 },
      { delay: 2600, duration: 680, easing: 'cubic-bezier(.16,.88,.22,1)', shadowLead: 150 },
      { delay: 2890, duration: 880, easing: 'cubic-bezier(.2,.72,.18,1)', shadowLead: 90 },
      { delay: 3890, duration: 1020, easing: 'cubic-bezier(.14,.84,.22,1)', shadowLead: 320 },
      { delay: 4890, duration: 610, easing: 'cubic-bezier(.17,.86,.25,1)', shadowLead: 120 },
      { delay: 5100, duration: 810, easing: 'cubic-bezier(.2,.78,.2,1)', shadowLead: 150 },
      { delay: 5700, duration: 920, easing: 'cubic-bezier(.1,.76,.18,1)', shadowLead: 210 },
    ];

    paths.forEach((path, index) => playPath(scene, index, path, sequences[index]));

    later(() => {
      reactToImpact(scene, [2, 1, 0], (index, order) => 17 - order * 3.2, 540, 48);
    }, 4510);

    later(() => {
      reactToImpact(scene, [5, 4, 3, 2, 1, 0], (index, order) => Math.max(5, 21 - order * 3.1), 560, 46);
    }, 6200);

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
    }, 7000);

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
    }, 7410);
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
      setCompletionTimer(9300);
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
