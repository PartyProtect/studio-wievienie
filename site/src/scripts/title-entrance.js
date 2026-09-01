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

  const createDestinationShadow = (scene) => {
    const plane = document.createElement('div');
    plane.className = 'title-target-shadow-plane';

    const word = document.createElement('div');
    word.className = 'title-target-word';
    const ink = document.createElement('span');
    ink.className = 'title-target-word-ink';
    ink.textContent = 'Wievien';
    word.appendChild(ink);

    const contact = document.createElement('div');
    contact.className = 'title-target-contact';
    Object.assign(contact.style, {
      left: `${scene.sourceRect.width * 0.035}px`,
      top: `${Math.max(0, scene.sourceRect.height - 3)}px`,
      width: `${scene.sourceRect.width * 0.93}px`,
    });

    const pulses = scene.metrics.map((metric, index) => {
      const pulse = document.createElement('div');
      pulse.className = `title-target-pulse title-target-pulse-${index}`;
      Object.assign(pulse.style, {
        left: `${metric.left + metric.width * 0.08}px`,
        top: `${Math.min(scene.sourceRect.height - 2, metric.top + metric.height - 3)}px`,
        width: `${Math.max(8, metric.width * 0.86)}px`,
      });
      return pulse;
    });

    plane.append(word, contact, ...pulses);
    scene.layer.insertBefore(plane, scene.shadowPlane);
    return { plane, word, contact, pulses };
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
    const destination = createDestinationShadow(scene);
    const destinationTransform = 'translate(4px, 7px) skewX(-28deg) scale(1.01, .235)';

    activeAnimations.push(
      destination.plane.animate(
        [
          { opacity: 0 },
          { offset: 0.3, opacity: 0.22 },
          { offset: 0.72, opacity: 0.78 },
          { opacity: 1 },
        ],
        { duration: 520, delay: 1010, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'both' },
      ),
      destination.word.animate(
        [
          { transform: 'translate(7px, 9px) skewX(-31deg) scale(.96, .17)', filter: 'blur(5px)', opacity: 0.38 },
          { offset: 0.68, transform: 'translate(5px, 7.5px) skewX(-29deg) scale(.995, .22)', filter: 'blur(3.6px)', opacity: 0.72 },
          { transform: destinationTransform, filter: 'blur(3px)', opacity: 0.82 },
        ],
        { duration: 560, delay: 1000, easing: 'cubic-bezier(.18,.76,.22,1)', fill: 'both' },
      ),
      destination.contact.animate(
        [
          { opacity: 0, transform: 'translateX(7px) scale(.82, .45)' },
          { offset: 0.65, opacity: 0.16, transform: 'translateX(5px) scale(.96, .58)' },
          { opacity: 0.22, transform: 'translateX(4px) scale(1, .66)' },
        ],
        { duration: 560, delay: 1000, easing: 'ease-out', fill: 'both' },
      ),
    );

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
      { delay: 1500, duration: 1320, easing: 'linear', shadowLead: 0 },
      { delay: 2940, duration: 680, easing: 'cubic-bezier(.16,.88,.22,1)', shadowLead: 150 },
      { delay: 3230, duration: 880, easing: 'cubic-bezier(.2,.72,.18,1)', shadowLead: 90 },
      { delay: 4230, duration: 1020, easing: 'cubic-bezier(.14,.84,.22,1)', shadowLead: 320 },
      { delay: 5230, duration: 610, easing: 'cubic-bezier(.17,.86,.25,1)', shadowLead: 120 },
      { delay: 5440, duration: 810, easing: 'cubic-bezier(.2,.78,.2,1)', shadowLead: 150 },
      { delay: 6040, duration: 920, easing: 'cubic-bezier(.1,.76,.18,1)', shadowLead: 210 },
    ];

    paths.forEach((path, index) => playPath(scene, index, path, sequences[index]));

    const impactOffsets = [0.9, 0.78, 0.88, 0.62, 0.82, 0.88, 0.56];
    const anticipationLeads = [90, 100, 110, 380, 120, 130, 300];
    const pulseStretch = [1.25, 1.15, 1.2, 1.65, 1.2, 1.25, 2.25];

    sequences.forEach((sequence, index) => {
      const impactAt = sequence.delay + sequence.duration * impactOffsets[index];
      const lead = anticipationLeads[index];
      const pulse = destination.pulses[index];
      activeAnimations.push(
        pulse.animate(
          [
            { opacity: 0.025, transform: `translateX(${index === 6 ? 18 : 4}px) scale(.68, .68)` },
            { offset: 0.42, opacity: index === 3 || index === 6 ? 0.16 : 0.09, transform: `translateX(${index === 6 ? 9 : 3}px) scale(${1 + pulseStretch[index] * 0.12}, .56)` },
            { offset: 0.7, opacity: 0.42, transform: `translateX(2px) scale(${pulseStretch[index]}, .34)` },
            { opacity: 0.07, transform: 'translateX(4px) scale(1, .7)' },
          ],
          {
            duration: lead + 320,
            delay: Math.max(0, impactAt - lead),
            easing: 'cubic-bezier(.16,.78,.2,1)',
            fill: 'both',
          },
        ),
      );
    });

    later(() => {
      reactToImpact(scene, [2, 1, 0], (index, order) => 17 - order * 3.2, 540, 48);
      activeAnimations.push(
        destination.word.animate(
          [
            { transform: destinationTransform, filter: 'blur(3px)', opacity: 0.82 },
            { offset: 0.28, transform: 'translate(1px, 7px) skewX(-30deg) scale(1.025, .205)', filter: 'blur(2.5px)', opacity: 0.94 },
            { offset: 0.65, transform: 'translate(5px, 7px) skewX(-27deg) scale(.995, .245)', filter: 'blur(3.2px)', opacity: 0.78 },
            { transform: destinationTransform, filter: 'blur(3px)', opacity: 0.82 },
          ],
          { duration: 520, easing: 'cubic-bezier(.16,.78,.2,1)', fill: 'both' },
        ),
      );
    }, 4850);

    later(() => {
      reactToImpact(scene, [5, 4, 3, 2, 1, 0], (index, order) => Math.max(5, 21 - order * 3.1), 560, 46);
      activeAnimations.push(
        destination.word.animate(
          [
            { transform: destinationTransform, filter: 'blur(3px)', opacity: 0.82 },
            { offset: 0.24, transform: 'translate(-3px, 7px) skewX(-33deg) scale(1.045, .19)', filter: 'blur(2.25px)', opacity: 1 },
            { offset: 0.58, transform: 'translate(5px, 7px) skewX(-25deg) scale(.985, .25)', filter: 'blur(3.4px)', opacity: 0.78 },
            { transform: destinationTransform, filter: 'blur(3px)', opacity: 0.82 },
          ],
          { duration: 620, easing: 'cubic-bezier(.12,.76,.18,1)', fill: 'both' },
        ),
        destination.contact.animate(
          [
            { transform: 'translateX(4px) scale(1, .66)', opacity: 0.22 },
            { offset: 0.24, transform: 'translateX(-2px) scale(1.18, .42)', opacity: 0.34 },
            { offset: 0.6, transform: 'translateX(5px) scale(.96, .72)', opacity: 0.19 },
            { transform: 'translateX(4px) scale(1, .66)', opacity: 0.22 },
          ],
          { duration: 620, easing: 'cubic-bezier(.12,.76,.18,1)', fill: 'both' },
        ),
      );
    }, 6550);

    later(() => {
      activeAnimations.push(
        scene.glyphPlane.animate(
          [
            { transform: 'translateY(0)' },
            { offset: 0.5, transform: 'translateY(-1.5px)' },
            { transform: 'translateY(0)' },
          ],
          { duration: 210, easing: 'cubic-bezier(.2,.8,.2,1)' },
        ),
        scene.shadowPlane.animate(
          [
            { opacity: 1, transform: 'scaleX(1.015)' },
            { opacity: 0.9, transform: 'scaleX(1)' },
          ],
          { duration: 230, easing: 'ease-out', fill: 'forwards' },
        ),
        destination.plane.animate(
          [
            { transform: 'scaleX(1.012)', opacity: 1 },
            { transform: 'scaleX(1)', opacity: 0.94 },
          ],
          { duration: 260, easing: 'ease-out', fill: 'forwards' },
        ),
      );
    }, 7380);

    later(() => {
      nameSource.dataset.titleEntrance = 'complete';
      nameSource.animate(
        [
          { transform: 'translateY(-1.5px)', textShadow: '0.025em 0.08em 0.12em rgb(23 23 22 / 0.22)' },
          { transform: 'translateY(0)', textShadow: '0.02em 0.055em 0.08em rgb(23 23 22 / 0.15)' },
        ],
        { duration: 230, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' },
      );

      scene.glyphPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 120, easing: 'ease-out', fill: 'forwards' },
      );
      scene.shadowPlane.animate(
        [{ opacity: 0.9 }, { offset: 0.22, opacity: 0.68 }, { opacity: 0 }],
        { duration: 430, easing: 'ease-out', fill: 'forwards' },
      );
    }, 7790);

    later(() => {
      const fade = destination.plane.animate(
        [
          { opacity: 0.94, transform: 'translateY(0) scaleX(1)' },
          { offset: 0.25, opacity: 0.72, transform: 'translateY(.5px) scaleX(.998)' },
          { opacity: 0, transform: 'translateY(2px) scaleX(.97)' },
        ],
        { duration: 560, easing: 'ease-out', fill: 'forwards' },
      );
      fade.finished.then(() => scene.layer.remove()).catch(() => scene.layer.remove());
    }, 8340);
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
      setCompletionTimer(10350);
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