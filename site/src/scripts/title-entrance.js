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
    return { monogram, front, rear, contact, metric };
  };

  const playMonogram = (scene, wLanding) => {
    const { monogram, front, rear, contact, metric } = createMonogramScene(scene);
    const firstGlyph = scene.glyphs[0];
    const firstContact = scene.contacts[0];
    const lift = Math.max(24, metric.height * .34);
    const turnEnd = 660;
    const dropDuration = 330;
    const dropStart = wLanding - dropDuration;

    /* WW is readable immediately, but it lives above the empty first-letter slot.
       It turns in place, then waits there while ievien plays below. */
    track(
      monogram.animate([
        {
          offset: 0,
          opacity: .92,
          transform: `perspective(520px) translate(-7px, ${px(-lift)}) rotateY(-56deg) rotateZ(-4deg) scale(.955)`,
        },
        {
          offset: .48,
          opacity: 1,
          transform: `perspective(520px) translate(1.5px, ${px(-lift - 1)}) rotateY(11deg) rotateZ(1.1deg) scale(1.008)`,
        },
        {
          offset: .73,
          opacity: 1,
          transform: `perspective(520px) translate(-.55px, ${px(-lift)}) rotateY(-3.2deg) rotateZ(-.28deg) scale(.998)`,
        },
        {
          offset: 1,
          opacity: 1,
          transform: `perspective(520px) translate(0, ${px(-lift)}) rotateY(0deg) rotateZ(0deg) scale(1)`,
        },
      ], {
        duration: 580,
        delay: 80,
        easing: 'cubic-bezier(.17,.76,.18,1)',
        fill: 'both',
      }),
    );

    /* The spare W peels away as soon as the monogram faces us. The surviving W
       remains suspended, deliberately withholding the first letter until last. */
    track(
      rear.animate([
        { offset: 0, opacity: .68, transform: 'translate3d(0,0,-3px) rotateZ(0deg) scale(1)' },
        { offset: .32, opacity: .58, transform: 'translate3d(2px,-2px,-1px) rotateZ(1deg) scale(.997)' },
        { offset: 1, opacity: 0, transform: 'translate3d(18px,-22px,7px) rotateZ(8deg) scale(.95)' },
      ], {
        duration: 340,
        delay: 555,
        easing: 'cubic-bezier(.2,.72,.22,1)',
        fill: 'forwards',
      }),
    );

    /* Final note: after ievien has landed, the remaining W drops into its slot.
       The decorative W and measured real W crossfade only during the impact. */
    later(() => {
      track(
        monogram.animate([
          {
            offset: 0,
            opacity: 1,
            transform: `perspective(520px) translate(0, ${px(-lift)}) rotateY(0deg) rotateZ(0deg) scale(1)`,
          },
          {
            offset: .62,
            opacity: 1,
            transform: 'perspective(520px) translate(0, 3px) rotateY(0deg) rotateZ(0deg) scale(1.035,.91)',
          },
          {
            offset: .78,
            opacity: 1,
            transform: 'perspective(520px) translate(0, -2px) rotateY(0deg) rotateZ(0deg) scale(.995,1.025)',
          },
          {
            offset: 1,
            opacity: 0,
            transform: 'perspective(520px) translate(0, 0) rotateY(0deg) rotateZ(0deg) scale(1)',
          },
        ], {
          duration: dropDuration,
          easing: 'cubic-bezier(.14,.8,.18,1)',
          fill: 'forwards',
        }),
        firstGlyph.animate([
          { offset: 0, opacity: 0, transform: 'translateY(-4px) scale(.985)' },
          { offset: .58, opacity: .22, transform: 'translateY(2px) scale(1.03,.92)' },
          { offset: .78, opacity: .78, transform: 'translateY(-1.5px) scale(.997,1.02)' },
          { offset: 1, opacity: 1, transform: 'none' },
        ], {
          duration: dropDuration,
          easing: 'cubic-bezier(.14,.8,.18,1)',
          fill: 'both',
        }),
        firstContact.animate([
          { offset: 0, opacity: .025, transform: 'scale(.36,.78)' },
          { offset: .48, opacity: .07, transform: 'scale(.62,.84)' },
          { offset: .64, opacity: .24, transform: 'scale(1.38,.55)' },
          { offset: .8, opacity: .13, transform: 'scale(.92,.86)' },
          { offset: 1, opacity: .1, transform: 'none' },
        ], {
          duration: dropDuration,
          easing: 'cubic-bezier(.14,.8,.18,1)',
          fill: 'both',
        }),
        contact.animate([
          { offset: 0, opacity: .02, transform: 'scale(.48,.8)' },
          { offset: .6, opacity: .14, transform: 'scale(1.08,.65)' },
          { offset: 1, opacity: 0, transform: 'scale(.82,.8)' },
        ], {
          duration: dropDuration,
          easing: 'cubic-bezier(.14,.8,.18,1)',
          fill: 'forwards',
        }),
      );
    }, dropStart);

    later(() => {
      monogram.remove();
      contact.remove();
    }, wLanding + 90);
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

  /* ievien runs first. The W is withheld above the word and lands as the final
     note, so completion has an actual event rather than simply running out of letters. */
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
    const baseDelay = 650;
    keyOffsets.forEach((offset, offsetIndex) => {
      const glyphIndex = offsetIndex + 1;
      playKey(scene, glyphIndex, baseDelay + offset, window.innerHeight);
    });

    const lastIevienIndex = keyProfile.length - 1;
    const ievienLanding = baseDelay + keyOffsets[keyOffsets.length - 1] + keyProfile[lastIevienIndex].duration;
    const wLanding = ievienLanding + 115;

    playMonogram(scene, wLanding);

    /* The complete word gets one crisp elastic punch on the W impact. This is
       intentionally short: POP, tiny recoil, settle. */
    later(() => {
      nameSource.dataset.titleEntrance = 'complete';

      track(nameSource.animate([
        {
          offset: 0,
          transform: 'translateY(0) scale(1)',
          textShadow: '0 .03em .022em rgb(23 23 22 / 0.095)',
        },
        {
          offset: .22,
          transform: 'translateY(-3.4px) scale(1.032,.975)',
          textShadow: '0 .052em .032em rgb(23 23 22 / 0.16)',
        },
        {
          offset: .48,
          transform: 'translateY(1px) scale(.994,1.018)',
          textShadow: '0 .025em .018em rgb(23 23 22 / 0.085)',
        },
        {
          offset: .7,
          transform: 'translateY(-1.1px) scale(1.009,.996)',
          textShadow: '0 .037em .024em rgb(23 23 22 / 0.11)',
        },
        {
          offset: 1,
          transform: 'none',
          textShadow: '0 .03em .022em rgb(23 23 22 / 0.095)',
        },
      ], {
        duration: 430,
        easing: 'cubic-bezier(.18,.86,.22,1)',
        fill: 'both',
      }));

      const glyphFade = scene.glyphPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 115, easing: 'ease-out', fill: 'forwards' },
      );
      const shadowFade = scene.shadowPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 165, easing: 'ease-out', fill: 'forwards' },
      );

      Promise.allSettled([glyphFade.finished, shadowFade.finished]).then(() => scene.layer.remove());
    }, wLanding + 10);
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
      setCompletionTimer(3750);
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
