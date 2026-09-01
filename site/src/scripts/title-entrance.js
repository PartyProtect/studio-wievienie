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
    finish,
    later,
    listenOnceToIntent,
    setCompletionTimer,
    showFinalTitle,
  } = runtime;

  const track = (...animations) => {
    activeAnimations.push(...animations.filter(Boolean));
  };

  const px = (value) => `${Math.round(value * 1000) / 1000}px`;

  const createMonogramScene = (scene) => {
    const metric = scene.metrics[0];
    const monogram = document.createElement('div');
    monogram.className = 'title-ww-monogram';
    monogram.setAttribute('aria-hidden', 'true');
    Object.assign(monogram.style, {
      left: px(metric.left),
      top: px(metric.top),
      width: px(metric.width * 1.55),
      height: px(metric.height),
      perspective: px(Math.max(430, metric.height * 5.2)),
    });

    const front = document.createElement('span');
    front.className = 'title-ww-letter title-ww-front';
    front.textContent = 'W';

    const rear = document.createElement('span');
    rear.className = 'title-ww-letter title-ww-rear';
    rear.textContent = 'W';
    rear.style.left = px(metric.width * .46);

    const contact = document.createElement('span');
    contact.className = 'title-ww-contact';
    Object.assign(contact.style, {
      left: px(metric.left + metric.width * .08),
      top: px(Math.min(scene.sourceRect.height - 3, metric.top + metric.height - 4)),
      width: px(metric.width * 1.3),
    });

    monogram.append(front, rear);
    scene.layer.append(contact, monogram);
    return { monogram, front, rear, contact };
  };

  const playMonogram = (scene) => {
    const { monogram, front, rear, contact } = createMonogramScene(scene);
    const firstGlyph = scene.glyphs[0];
    const firstContact = scene.contacts[0];

    /* Start with a readable WW already present. The turn supplies motion, not
       legibility: no edge-on sliver and no fade-from-nothing logo spawn. */
    track(
      monogram.animate([
        {
          offset: 0,
          opacity: .92,
          transform: 'perspective(520px) translateX(-7px) rotateY(-58deg) rotateZ(-4deg) scale(.955)',
        },
        {
          offset: .48,
          opacity: 1,
          transform: 'perspective(520px) translateX(1.5px) rotateY(11deg) rotateZ(1.1deg) scale(1.008)',
        },
        {
          offset: .73,
          opacity: 1,
          transform: 'perspective(520px) translateX(-.55px) rotateY(-3.2deg) rotateZ(-.28deg) scale(.998)',
        },
        {
          offset: 1,
          opacity: 1,
          transform: 'perspective(520px) translateX(0) rotateY(0deg) rotateZ(0deg) scale(1)',
        },
      ], {
        duration: 620,
        delay: 80,
        easing: 'cubic-bezier(.17,.76,.18,1)',
        fill: 'both',
      }),
      contact.animate([
        { offset: 0, opacity: .035, transform: 'scale(.58,.76)' },
        { offset: .46, opacity: .11, transform: 'scale(1.08,.68)' },
        { offset: .74, opacity: .14, transform: 'scale(.96,.76)' },
        { offset: 1, opacity: .105, transform: 'scale(1,.8)' },
      ], {
        duration: 620,
        delay: 70,
        easing: 'cubic-bezier(.17,.76,.18,1)',
        fill: 'both',
      }),
    );

    /* As soon as the monogram faces us, the rear W releases while the front W
       crossfades into the exact measured first glyph. The next keys begin before
       the handoff fully finishes, so there is no logo/pause/word sequence. */
    track(
      rear.animate([
        { offset: 0, opacity: .68, transform: 'translate3d(0,0,-3px) rotateZ(0deg) scale(1)' },
        { offset: .32, opacity: .58, transform: 'translate3d(2px,-2px,-1px) rotateZ(1deg) scale(.997)' },
        { offset: 1, opacity: 0, transform: 'translate3d(17px,-20px,7px) rotateZ(8deg) scale(.95)' },
      ], {
        duration: 340,
        delay: 625,
        easing: 'cubic-bezier(.2,.72,.22,1)',
        fill: 'forwards',
      }),
      front.animate([
        { offset: 0, opacity: 1, transform: 'translateZ(0) scale(1)' },
        { offset: .45, opacity: .86, transform: 'translateZ(1px) scale(1.004)' },
        { offset: 1, opacity: 0, transform: 'translateZ(0) scale(1)' },
      ], {
        duration: 275,
        delay: 650,
        easing: 'ease-out',
        fill: 'forwards',
      }),
      firstGlyph.animate([
        { offset: 0, opacity: 0, transform: 'perspective(420px) rotateY(4deg) scale(.986)' },
        { offset: .42, opacity: .72, transform: 'perspective(420px) rotateY(1deg) scale(1.006,.997)' },
        { offset: 1, opacity: 1, transform: 'none' },
      ], {
        duration: 285,
        delay: 650,
        easing: 'cubic-bezier(.2,.76,.2,1)',
        fill: 'both',
      }),
      firstContact.animate([
        { offset: 0, opacity: .035, transform: 'scale(.76,.82)' },
        { offset: .58, opacity: .14, transform: 'scale(1.08,.72)' },
        { offset: 1, opacity: .1, transform: 'none' },
      ], {
        duration: 285,
        delay: 640,
        easing: 'cubic-bezier(.2,.76,.2,1)',
        fill: 'both',
      }),
      contact.animate([
        { opacity: .105, transform: 'scale(1,.8)' },
        { opacity: 0, transform: 'scale(.82,.8)' },
      ], {
        duration: 285,
        delay: 680,
        easing: 'ease-out',
        fill: 'forwards',
      }),
    );

    later(() => {
      monogram.remove();
      contact.remove();
    }, 1030);
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

  const keyOffsets = [0, 104, 220, 332, 456, 586];

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
        { offset: 0, opacity: .025, transform: 'scale(.28,.7)' },
        { offset: .46, opacity: .055, transform: 'scale(.48,.82)' },
        { offset: .67, opacity: .1, transform: 'scale(.76,.92)' },
        { offset: .76, opacity: .2, transform: `scale(${1.22 + .11 * profile.weight},.6)` },
        { offset: .88, opacity: .12, transform: 'scale(.9,.88)' },
        { offset: 1, opacity: .1, transform: 'none' },
      ], {
        duration: profile.duration,
        delay: Math.max(0, delay - 30),
        easing: 'cubic-bezier(.16,.84,.22,1)',
        fill: 'both',
      }),
    );
  };

  const playName = (scene) => {
    playMonogram(scene);

    const baseDelay = 760;
    keyOffsets.forEach((offset, offsetIndex) => {
      const glyphIndex = offsetIndex + 1;
      playKey(scene, glyphIndex, baseDelay + offset, window.innerHeight);
    });

    const lastIndex = keyProfile.length - 1;
    const lastLanding = baseDelay + keyOffsets[keyOffsets.length - 1] + keyProfile[lastIndex].duration;

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
          offset: .72,
          transform: 'translateY(-2.7px) scale(1.015,1.007)',
          textShadow: '0 .045em .03em rgb(23 23 22 / 0.14)',
        },
        {
          offset: 1,
          transform: 'none',
          textShadow: '0 .03em .022em rgb(23 23 22 / 0.095)',
        },
      ], {
        duration: 760,
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
    }, lastLanding + 110);
  };

  const start = () => {
    if (started) return;
    started = true;

    try {
      if (!Element.prototype.animate) throw new Error('Web Animations API unavailable');
      if (root.dataset.assembly !== 'playing') return;

      /* Studio belongs to the composition from the first frame. Only Wievien
         performs, so the eye has a stable anchor while the WW resolves. */
      studioSource.dataset.titleEntrance = 'complete';
      const nameScene = createLetterScene(nameSource);

      listenOnceToIntent();
      playName(nameScene);
      setCompletionTimer(3700);
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