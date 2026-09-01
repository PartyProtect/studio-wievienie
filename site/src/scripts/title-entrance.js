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
    setCompletionTimer,
    showFinalTitle,
  } = runtime;

  const track = (...animations) => {
    activeAnimations.push(...animations.filter(Boolean));
  };

  const playStudio = (scene) => {
    const duration = 860;
    const delay = 45;

    track(
      scene.glyph.animate([
        { offset: 0, opacity: 0, transform: 'translateX(-46vw) translateY(2px) rotate(-3.2deg) scale(.985)' },
        { offset: 0.06, opacity: 1, transform: 'translateX(-43vw) translateY(2px) rotate(-3deg) scale(.986)' },
        { offset: 0.61, opacity: 1, transform: 'translateX(1.35vw) translateY(-1px) rotate(.65deg) scale(1.012,.965)' },
        { offset: 0.76, opacity: 1, transform: 'translateX(-.48vw) rotate(-.34deg) scale(.996,1.012)' },
        { offset: 0.89, opacity: 1, transform: 'translateX(.16vw) rotate(.12deg)' },
        { offset: 1, opacity: 1, transform: 'none' },
      ], {
        duration,
        delay,
        easing: 'cubic-bezier(.16,.82,.2,1)',
        fill: 'both',
      }),
      scene.contact.animate([
        { offset: 0, opacity: .035, transform: 'translateX(-46vw) scale(2.05,.42)' },
        { offset: .56, opacity: .12, transform: 'translateX(1.35vw) scale(1.34,.6)' },
        { offset: .76, opacity: .16, transform: 'translateX(-.48vw) scale(1.12,.76)' },
        { offset: 1, opacity: .11, transform: 'none' },
      ], {
        duration,
        delay,
        easing: 'cubic-bezier(.16,.82,.2,1)',
        fill: 'both',
      }),
    );

    later(() => {
      studioSource.dataset.titleEntrance = 'complete';

      const inkFade = scene.glyphPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 90, easing: 'ease-out', fill: 'forwards' },
      );
      const shadowFade = scene.shadowPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 145, easing: 'ease-out', fill: 'forwards' },
      );

      Promise.allSettled([inkFade.finished, shadowFade.finished]).then(() => scene.layer.remove());
    }, delay + duration + 55);
  };

  const keyProfile = [
    { height: 36, x: -10, rotation: -7.5, duration: 560, weight: 1.18 },
    { height: 29, x: 5, rotation: 5.2, duration: 470, weight: .92 },
    { height: 33, x: -6, rotation: -5.4, duration: 500, weight: 1 },
    { height: 41, x: 2, rotation: 6.4, duration: 545, weight: 1.12 },
    { height: 29, x: 5, rotation: 4.8, duration: 460, weight: .9 },
    { height: 33, x: -5, rotation: -4.8, duration: 490, weight: .98 },
    { height: 37, x: 10, rotation: 6.8, duration: 535, weight: 1.08 },
  ];

  /* The starts stay quick and ordered, but the gaps are deliberately uneven.
     It should feel played rather than scheduled: a short run of piano keys. */
  const keyOffsets = [0, 118, 222, 350, 458, 586, 718];

  const playKey = (scene, index, delay, viewportHeight) => {
    const profile = keyProfile[index];
    const glyph = scene.glyphs[index];
    const contact = scene.contacts[index];
    const startY = -(viewportHeight * profile.height / 100);
    const impactScaleX = 1 + .025 * profile.weight;
    const impactScaleY = 1 - .105 * profile.weight;

    track(
      glyph.animate([
        {
          offset: 0,
          opacity: 0,
          transform: `translate(${profile.x}px, ${startY}px) rotate(${profile.rotation}deg) scale(.965)`,
        },
        {
          offset: .045,
          opacity: 1,
          transform: `translate(${profile.x * .96}px, ${startY * .94}px) rotate(${profile.rotation * .94}deg) scale(.968)`,
        },
        {
          offset: .62,
          opacity: 1,
          transform: `translate(${profile.x * .12}px, -5px) rotate(${profile.rotation * .12}deg) scale(.995,1.015)`,
        },
        {
          offset: .76,
          opacity: 1,
          transform: `translate(0, 1.5px) rotate(0deg) scale(${impactScaleX},${impactScaleY})`,
        },
        {
          offset: .88,
          opacity: 1,
          transform: 'translateY(-2.2px) scale(.995,1.025)',
        },
        {
          offset: 1,
          opacity: 1,
          transform: 'none',
        },
      ], {
        duration: profile.duration,
        delay,
        easing: 'cubic-bezier(.16,.84,.22,1)',
        fill: 'both',
      }),
      contact.animate([
        {
          offset: 0,
          opacity: .025,
          transform: 'scale(.28,.7)',
        },
        {
          offset: .46,
          opacity: .055,
          transform: 'scale(.48,.82)',
        },
        {
          offset: .67,
          opacity: .1,
          transform: 'scale(.76,.92)',
        },
        {
          offset: .76,
          opacity: .2,
          transform: `scale(${1.22 + .11 * profile.weight},.6)`,
        },
        {
          offset: .88,
          opacity: .12,
          transform: 'scale(.9,.88)',
        },
        {
          offset: 1,
          opacity: .1,
          transform: 'none',
        },
      ], {
        duration: profile.duration,
        delay: Math.max(0, delay - 30),
        easing: 'cubic-bezier(.16,.84,.22,1)',
        fill: 'both',
      }),
    );
  };

  const playName = (scene) => {
    const baseDelay = 1110;

    keyProfile.forEach((profile, index) => {
      playKey(scene, index, baseDelay + keyOffsets[index], window.innerHeight);
    });

    const lastIndex = keyProfile.length - 1;
    const lastLanding = baseDelay + keyOffsets[lastIndex] + keyProfile[lastIndex].duration;

    later(() => {
      track(
        scene.glyphPlane.animate([
          { transform: 'translateY(0)' },
          { offset: .42, transform: 'translateY(-1.15px)' },
          { transform: 'translateY(0)' },
        ], {
          duration: 205,
          easing: 'cubic-bezier(.2,.8,.2,1)',
          fill: 'both',
        }),
        scene.shadowPlane.animate([
          { opacity: 1, transform: 'scaleX(1.012)' },
          { opacity: .96, transform: 'scaleX(1)' },
        ], {
          duration: 205,
          easing: 'ease-out',
          fill: 'forwards',
        }),
      );
    }, lastLanding - 30);

    later(() => {
      nameSource.dataset.titleEntrance = 'complete';

      /* The real word takes over while the photograph is still unfolding.
         It rises, holds its finished pose for a beat, then relaxes into the page. */
      track(nameSource.animate([
        {
          offset: 0,
          transform: 'translateY(-.8px) scale(1.003)',
          textShadow: '0 .035em .025em rgb(23 23 22 / 0.11)',
        },
        {
          offset: .18,
          transform: 'translateY(-2.7px) scale(1.015,1.007)',
          textShadow: '0 .045em .03em rgb(23 23 22 / 0.14)',
        },
        {
          offset: .76,
          transform: 'translateY(-2.7px) scale(1.015,1.007)',
          textShadow: '0 .045em .03em rgb(23 23 22 / 0.14)',
        },
        {
          offset: 1,
          transform: 'none',
          textShadow: '0 .03em .022em rgb(23 23 22 / 0.095)',
        },
      ], {
        duration: 800,
        easing: 'cubic-bezier(.2,.8,.2,1)',
        fill: 'both',
      }));

      const glyphFade = scene.glyphPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 100, easing: 'ease-out', fill: 'forwards' },
      );
      const shadowFade = scene.shadowPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 150, easing: 'ease-out', fill: 'forwards' },
      );

      Promise.allSettled([glyphFade.finished, shadowFade.finished]).then(() => scene.layer.remove());
    }, lastLanding + 120);
  };

  const start = () => {
    if (started) return;
    started = true;

    try {
      if (!Element.prototype.animate) throw new Error('Web Animations API unavailable');
      if (root.dataset.assembly !== 'playing') return;

      const studioScene = createWholeWordScene(studioSource);
      const nameScene = createLetterScene(nameSource);

      listenOnceToIntent();
      playStudio(studioScene);
      playName(nameScene);
      setCompletionTimer(4250);
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
