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

  const px = (value) => `${Math.round(value * 1000) / 1000}px`;

  /* Studio is no longer the spectacle. It arrives while the monogram resolves,
     giving Wievien the first beat and preserving Studio as quiet context. */
  const playStudio = (scene) => {
    const duration = 760;
    const delay = 650;

    track(
      scene.glyph.animate([
        { offset: 0, opacity: 0, transform: 'translate(-13px, 9px) rotate(-1.4deg) scale(.982)' },
        { offset: .2, opacity: .32, transform: 'translate(-9px, 6px) rotate(-1deg) scale(.987)' },
        { offset: .7, opacity: 1, transform: 'translate(1px, -1.2px) rotate(.16deg) scale(1.003)' },
        { offset: .86, opacity: 1, transform: 'translate(-.4px, .35px) rotate(-.06deg)' },
        { offset: 1, opacity: 1, transform: 'none' },
      ], {
        duration,
        delay,
        easing: 'cubic-bezier(.18,.82,.2,1)',
        fill: 'both',
      }),
      scene.contact.animate([
        { offset: 0, opacity: 0, transform: 'translateX(-10px) scale(.72,.78)' },
        { offset: .5, opacity: .045, transform: 'translateX(-3px) scale(.9,.86)' },
        { offset: .75, opacity: .09, transform: 'translateX(1px) scale(1.04,.78)' },
        { offset: 1, opacity: .075, transform: 'none' },
      ], {
        duration,
        delay,
        easing: 'cubic-bezier(.18,.82,.2,1)',
        fill: 'both',
      }),
    );

    later(() => {
      studioSource.dataset.titleEntrance = 'complete';

      const inkFade = scene.glyphPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 95, easing: 'ease-out', fill: 'forwards' },
      );
      const shadowFade = scene.shadowPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 130, easing: 'ease-out', fill: 'forwards' },
      );

      Promise.allSettled([inkFade.finished, shadowFade.finished]).then(() => scene.layer.remove());
    }, delay + duration + 45);
  };

  const createMonogramScene = (scene) => {
    const metric = scene.metrics[0];
    const monogram = document.createElement('div');
    monogram.className = 'title-ww-monogram';
    monogram.setAttribute('aria-hidden', 'true');
    Object.assign(monogram.style, {
      left: px(metric.left),
      top: px(metric.top),
      width: px(metric.width * 1.7),
      height: px(metric.height),
      perspective: px(Math.max(430, metric.height * 5.2)),
    });

    const front = document.createElement('span');
    front.className = 'title-ww-letter title-ww-front';
    front.textContent = 'W';

    const rear = document.createElement('span');
    rear.className = 'title-ww-letter title-ww-rear';
    rear.textContent = 'W';
    rear.style.left = px(metric.width * .58);

    const contact = document.createElement('span');
    contact.className = 'title-ww-contact';
    Object.assign(contact.style, {
      left: px(metric.left + metric.width * .08),
      top: px(Math.min(scene.sourceRect.height - 3, metric.top + metric.height - 4)),
      width: px(metric.width * 1.46),
    });

    monogram.append(front, rear);
    scene.layer.append(contact, monogram);
    return { monogram, front, rear, contact };
  };

  const playMonogram = (scene) => {
    const { monogram, front, rear, contact } = createMonogramScene(scene);
    const firstGlyph = scene.glyphs[0];
    const firstContact = scene.contacts[0];

    track(
      monogram.animate([
        {
          offset: 0,
          opacity: 0,
          transform: 'perspective(520px) translateX(-13px) rotateY(-106deg) rotateZ(-8deg) scale(.91)',
        },
        {
          offset: .1,
          opacity: 1,
          transform: 'perspective(520px) translateX(-10px) rotateY(-88deg) rotateZ(-7deg) scale(.925)',
        },
        {
          offset: .56,
          opacity: 1,
          transform: 'perspective(520px) translateX(2px) rotateY(17deg) rotateZ(1.8deg) scale(1.012)',
        },
        {
          offset: .76,
          opacity: 1,
          transform: 'perspective(520px) translateX(-.8px) rotateY(-5deg) rotateZ(-.55deg) scale(.997)',
        },
        {
          offset: .9,
          opacity: 1,
          transform: 'perspective(520px) translateX(.25px) rotateY(1.2deg) rotateZ(.12deg) scale(1.001)',
        },
        {
          offset: 1,
          opacity: 1,
          transform: 'perspective(520px) translateX(0) rotateY(0deg) rotateZ(0deg) scale(1)',
        },
      ], {
        duration: 720,
        delay: 140,
        easing: 'cubic-bezier(.17,.76,.18,1)',
        fill: 'both',
      }),
      contact.animate([
        { offset: 0, opacity: 0, transform: 'scale(.42,.72)' },
        { offset: .22, opacity: .035, transform: 'scale(.56,.76)' },
        { offset: .58, opacity: .105, transform: 'scale(1.12,.66)' },
        { offset: .78, opacity: .145, transform: 'scale(.96,.74)' },
        { offset: 1, opacity: .11, transform: 'scale(1,.8)' },
      ], {
        duration: 720,
        delay: 115,
        easing: 'cubic-bezier(.17,.76,.18,1)',
        fill: 'both',
      }),
    );

    /* The rear W gets a short readable beat, then peels away while the front W
       hands directly into the authored first glyph. */
    track(
      rear.animate([
        { offset: 0, opacity: .72, transform: 'translate3d(0,0,-4px) rotateZ(0deg) scale(1)' },
        { offset: .28, opacity: .7, transform: 'translate3d(3px,-2px,-2px) rotateZ(1.4deg) scale(.995)' },
        { offset: 1, opacity: 0, transform: 'translate3d(22px,-25px,8px) rotateZ(10deg) scale(.93)' },
      ], {
        duration: 390,
        delay: 770,
        easing: 'cubic-bezier(.2,.72,.22,1)',
        fill: 'forwards',
      }),
      front.animate([
        { offset: 0, opacity: 1, transform: 'translateZ(0) scale(1)' },
        { offset: .38, opacity: .92, transform: 'translateZ(2px) scale(1.008)' },
        { offset: 1, opacity: 0, transform: 'translateZ(0) scale(1)' },
      ], {
        duration: 300,
        delay: 790,
        easing: 'ease-out',
        fill: 'forwards',
      }),
      firstGlyph.animate([
        { offset: 0, opacity: 0, transform: 'perspective(420px) rotateY(8deg) scale(.97)' },
        { offset: .28, opacity: .55, transform: 'perspective(420px) rotateY(3deg) scale(1.012,.992)' },
        { offset: .72, opacity: 1, transform: 'perspective(420px) rotateY(-.8deg) scale(1.004,1.01)' },
        { offset: 1, opacity: 1, transform: 'none' },
      ], {
        duration: 320,
        delay: 795,
        easing: 'cubic-bezier(.2,.76,.2,1)',
        fill: 'both',
      }),
      firstContact.animate([
        { offset: 0, opacity: .04, transform: 'scale(.72,.8)' },
        { offset: .62, opacity: .15, transform: 'scale(1.12,.7)' },
        { offset: 1, opacity: .1, transform: 'none' },
      ], {
        duration: 320,
        delay: 785,
        easing: 'cubic-bezier(.2,.76,.2,1)',
        fill: 'both',
      }),
      contact.animate([
        { opacity: .11, transform: 'scale(1,.8)' },
        { opacity: 0, transform: 'scale(.78,.78)' },
      ], {
        duration: 310,
        delay: 835,
        easing: 'ease-out',
        fill: 'forwards',
      }),
    );

    later(() => {
      monogram.remove();
      contact.remove();
    }, 1220);
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

  /* The first W now comes from the monogram. The remaining six keys begin while
     that handoff is still visible, with deliberately uneven spacing. */
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

    const baseDelay = 940;
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

      const studioScene = createWholeWordScene(studioSource);
      const nameScene = createLetterScene(nameSource);

      listenOnceToIntent();
      playStudio(studioScene);
      playName(nameScene);
      setCompletionTimer(3900);
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
