(() => {
  const root = document.documentElement;
  const studioSource = document.querySelector('[data-assemble="studio"]');
  const nameSource = document.querySelector('[data-assemble="wievien"]');

  if (!(studioSource instanceof HTMLElement) || !(nameSource instanceof HTMLElement)) return;

  let started = false;
  let completed = false;
  let completionTimer = 0;
  const activeAnimations = [];
  const cleanupListeners = [];
  const layers = [];
  const timers = [];

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const px = (value) => `${Math.round(value * 1000) / 1000}px`;

  const later = (callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timers.push(timer);
    return timer;
  };

  const track = (...animations) => {
    activeAnimations.push(...animations.filter(Boolean));
    return animations[0];
  };

  const showFinalTitle = () => {
    studioSource.dataset.titleEntrance = 'complete';
    nameSource.dataset.titleEntrance = 'complete';
  };

  const dispatchComplete = () => {
    window.dispatchEvent(new CustomEvent('wievien:intro-complete'));
  };

  const finish = (instant = false) => {
    if (completed) return;
    completed = true;
    window.clearTimeout(completionTimer);
    timers.forEach((timer) => window.clearTimeout(timer));

    activeAnimations.forEach((animation) => {
      try {
        if (instant) animation.cancel();
        else animation.finish();
      } catch {
        // The target may already have finished or left the document.
      }
    });

    showFinalTitle();

    layers.forEach((layer) => {
      if (!(layer instanceof HTMLElement) || !layer.isConnected) return;
      if (instant) {
        layer.remove();
        return;
      }

      const fade = layer.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 160, easing: 'ease-out', fill: 'forwards' },
      );
      fade.finished.then(() => layer.remove()).catch(() => layer.remove());
    });

    cleanupListeners.forEach((remove) => remove());
    dispatchComplete();
  };

  const listenForIntent = () => {
    const skip = () => finish(true);
    const add = (type, options = { once: true, capture: true }) => {
      window.addEventListener(type, skip, options);
      cleanupListeners.push(() => window.removeEventListener(type, skip, { capture: true }));
    };

    add('wheel', { once: true, passive: true, capture: true });
    add('touchstart', { once: true, passive: true, capture: true });
    add('pointerdown');
    add('keydown');

    const resize = () => finish(true);
    window.addEventListener('resize', resize, { once: true });
    cleanupListeners.push(() => window.removeEventListener('resize', resize));

    const hide = () => {
      if (document.hidden) finish(true);
    };
    document.addEventListener('visibilitychange', hide, { once: true });
    cleanupListeners.push(() => document.removeEventListener('visibilitychange', hide));
  };

  const applyTypography = (element, computed) => {
    Object.assign(element.style, {
      fontFamily: computed.fontFamily,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      fontStyle: computed.fontStyle,
      fontStretch: computed.fontStretch,
      fontVariant: computed.fontVariant,
      fontKerning: computed.fontKerning,
      fontFeatureSettings: computed.fontFeatureSettings,
      fontVariationSettings: computed.fontVariationSettings,
      lineHeight: computed.lineHeight,
      letterSpacing: computed.letterSpacing,
    });
  };

  const createLayer = (source, extraClass = '') => {
    const rect = source.getBoundingClientRect();
    const layer = document.createElement('div');
    layer.className = `title-motion-layer ${extraClass}`.trim();
    layer.setAttribute('aria-hidden', 'true');
    layer.setAttribute('role', 'presentation');
    Object.assign(layer.style, {
      left: px(rect.left),
      top: px(rect.top),
      width: px(rect.width),
      height: px(rect.height),
    });
    document.body.appendChild(layer);
    layers.push(layer);
    return { layer, rect, computed: getComputedStyle(source) };
  };

  const createWholeWordScene = (source) => {
    const { layer, rect, computed } = createLayer(source, 'title-motion-studio');
    applyTypography(layer, computed);

    const shadowPlane = document.createElement('div');
    shadowPlane.className = 'title-motion-shadow-plane';
    const glyphPlane = document.createElement('div');
    glyphPlane.className = 'title-motion-glyph-plane';

    const cast = document.createElement('div');
    cast.className = 'title-motion-cast';
    cast.style.transformOrigin = `${rect.width / 2}px ${rect.height}px`;
    const castInk = document.createElement('span');
    castInk.className = 'title-motion-shadow-ink';
    castInk.textContent = source.textContent || '';
    applyTypography(castInk, computed);
    cast.appendChild(castInk);

    const contact = document.createElement('div');
    contact.className = 'title-motion-contact';
    Object.assign(contact.style, {
      left: px(rect.width * 0.04),
      top: px(rect.height - 5),
      width: px(rect.width * 0.92),
    });

    const glyph = document.createElement('div');
    glyph.className = 'title-motion-glyph';
    glyph.style.transformOrigin = `${rect.width / 2}px ${rect.height}px`;
    const ink = document.createElement('span');
    ink.className = 'title-motion-ink';
    ink.textContent = source.textContent || '';
    applyTypography(ink, computed);
    glyph.appendChild(ink);

    shadowPlane.append(cast, contact);
    glyphPlane.appendChild(glyph);
    layer.append(shadowPlane, glyphPlane);

    return { layer, rect, glyph, cast, contact, glyphPlane, shadowPlane };
  };

  const createLetterScene = (source) => {
    const textNode = Array.from(source.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    const word = source.textContent?.trim() || '';
    if (!textNode || word !== 'Wievien') throw new Error('Unexpected title content');

    const { layer, rect: sourceRect, computed } = createLayer(source, 'title-motion-wievien');
    applyTypography(layer, computed);

    const shadowPlane = document.createElement('div');
    shadowPlane.className = 'title-motion-shadow-plane';
    const glyphPlane = document.createElement('div');
    glyphPlane.className = 'title-motion-glyph-plane';
    const glyphs = [];
    const casts = [];
    const contacts = [];
    const metrics = [];

    for (let index = 0; index < word.length; index += 1) {
      const range = document.createRange();
      range.setStart(textNode, index);
      range.setEnd(textNode, index + 1);
      const rect = range.getBoundingClientRect();
      range.detach?.();

      const left = rect.left - sourceRect.left;
      const top = rect.top - sourceRect.top;
      const right = sourceRect.right - rect.right;
      const bottom = sourceRect.bottom - rect.bottom;
      const bleed = 4;
      const clip = `inset(${Math.max(0, top - bleed)}px ${Math.max(0, right - bleed)}px ${Math.max(0, bottom - bleed)}px ${Math.max(0, left - bleed)}px)`;
      const origin = `${left + rect.width / 2}px ${top + rect.height}px`;

      const cast = document.createElement('div');
      cast.className = `title-motion-cast title-motion-cast-${index}`;
      cast.style.transformOrigin = origin;
      const castInk = document.createElement('span');
      castInk.className = 'title-motion-shadow-ink';
      castInk.textContent = word;
      castInk.style.clipPath = clip;
      applyTypography(castInk, computed);
      cast.appendChild(castInk);

      const contact = document.createElement('div');
      contact.className = `title-motion-contact title-motion-contact-${index}`;
      Object.assign(contact.style, {
        left: px(left + rect.width * 0.08),
        top: px(Math.min(sourceRect.height - 3, top + rect.height - 4)),
        width: px(Math.max(7, rect.width * 0.84)),
      });

      const glyph = document.createElement('div');
      glyph.className = `title-motion-glyph title-motion-glyph-${index}`;
      glyph.style.transformOrigin = origin;
      const ink = document.createElement('span');
      ink.className = 'title-motion-ink';
      ink.textContent = word;
      ink.style.clipPath = clip;
      applyTypography(ink, computed);
      glyph.appendChild(ink);

      shadowPlane.append(cast, contact);
      glyphPlane.appendChild(glyph);
      glyphs.push(glyph);
      casts.push(cast);
      contacts.push(contact);
      metrics.push({ left, top, width: rect.width, height: rect.height, originY: top + rect.height });
    }

    layer.append(shadowPlane, glyphPlane);
    return { layer, sourceRect, glyphPlane, shadowPlane, glyphs, casts, contacts, metrics };
  };

  const point = (
    offset,
    x,
    y,
    z,
    rotation,
    scaleX = 1,
    scaleY = 1,
    stretch = 0,
    originX = 0.5,
  ) => ({ offset, x, y, z, rotation, scaleX, scaleY, stretch, originX });

  const revealAtCue = (frames) => {
    if (!frames.length) return frames;
    const first = frames[0];
    const nextOffset = frames[1]?.offset ?? 1;
    const revealOffset = Math.min(0.025, nextOffset * 0.35);
    return [
      { ...first, offset: 0, opacity: 0 },
      { ...first, offset: revealOffset, opacity: first.opacity ?? 1 },
      ...frames.slice(1),
    ];
  };

  const makeGlyphFrames = (path, metric) => revealAtCue(path.map((frame) => ({
    offset: frame.offset,
    transform: `translate(${px(frame.x)}, ${px(frame.y)}) rotate(${frame.rotation}deg) scale(${frame.scaleX}, ${frame.scaleY})`,
    transformOrigin: `${px(metric.left + metric.width * frame.originX)} ${px(metric.originY)}`,
    opacity: 1,
  })));

  const makeShadowFrames = (path, metric, kind) => {
    const maxAltitude = Math.max(window.innerHeight * 0.78, 1);
    const groundOffset = Math.max(7, metric.height * 0.065);

    const frames = path.map((frame) => {
      const altitude = Math.max(0, frame.z);
      const distance = clamp(altitude / maxAltitude, 0, 1);
      const impact = frame.scaleY < 0.92 ? 1 : 0;
      const projectedX = frame.x + altitude * 0.067 + 5;
      const opacity = clamp(0.07 + (1 - distance) * 0.17 + impact * 0.065, 0.035, 0.34);

      if (kind === 'cast') {
        const scaleX = frame.scaleX * (1 - distance * 0.4) * (1 + frame.stretch * 0.55 + impact * 0.2);
        const scaleY = 0.235 * (1 - distance * 0.34) * (impact ? 0.68 : 1);
        return {
          offset: frame.offset,
          transform: `translate(${px(projectedX)}, ${px(groundOffset)}) skewX(-29deg) rotate(${frame.rotation * 0.115}deg) scale(${scaleX}, ${scaleY})`,
          transformOrigin: `${px(metric.left + metric.width * frame.originX)} ${px(metric.originY)}`,
          opacity,
        };
      }

      const scaleX = (1 - distance * 0.72) * (1 + frame.stretch + impact * 0.42);
      const scaleY = (0.4 + (1 - distance) * 0.6) * (impact ? 0.5 : 1);
      return {
        offset: frame.offset,
        transform: `translateX(${px(projectedX)}) scale(${scaleX}, ${scaleY})`,
        opacity: Math.min(0.36, opacity + 0.025),
      };
    });

    return revealAtCue(frames);
  };

  const playPath = (scene, index, path, options) => {
    const metric = scene.metrics[index];
    const shadowDelay = Math.max(0, options.delay - (options.shadowLead || 0));

    track(
      scene.glyphs[index].animate(makeGlyphFrames(path, metric), {
        duration: options.duration,
        delay: options.delay,
        easing: options.easing,
        fill: 'both',
      }),
      scene.casts[index].animate(makeShadowFrames(path, metric, 'cast'), {
        duration: options.duration + (options.shadowLead || 0),
        delay: shadowDelay,
        easing: options.easing,
        fill: 'both',
      }),
      scene.contacts[index].animate(makeShadowFrames(path, metric, 'contact'), {
        duration: options.duration + (options.shadowLead || 0),
        delay: shadowDelay,
        easing: options.easing,
        fill: 'both',
      }),
    );
  };

  const playStudio = (scene, vw, vh) => {
    const path = [
      point(0, -67 * vw, 0.8 * vh, 0, -7, 0.97, 1, 1.45),
      point(0.56, 1.9 * vw, 0.15 * vh, 0, 1.8, 1.025, 0.93, 0.55),
      point(0.72, -0.85 * vw, -0.08 * vh, 0, -0.9, 0.992, 1.025, 0.2),
      point(0.86, 0.28 * vw, 0.03 * vh, 0, 0.32, 1.004, 0.99, 0.08),
      point(1, 0, 0, 0, 0, 1, 1, 0),
    ];
    const metric = { left: 0, width: scene.rect.width, height: scene.rect.height, originY: scene.rect.height };
    const duration = 1160;
    const delay = 180;
    const easing = 'cubic-bezier(.16,.78,.2,1)';

    track(
      scene.glyph.animate(makeGlyphFrames(path, metric), { duration, delay, easing, fill: 'both' }),
      scene.cast.animate(makeShadowFrames(path, metric, 'cast'), { duration: duration + 70, delay: delay - 70, easing, fill: 'both' }),
      scene.contact.animate(makeShadowFrames(path, metric, 'contact'), { duration: duration + 70, delay: delay - 70, easing, fill: 'both' }),
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
      { delay: 4700, duration: 1040, easing: 'cubic-bezier(.14,.84,.22,1)', shadowLead: 300 },
      { delay: 5620, duration: 660, easing: 'cubic-bezier(.17,.86,.25,1)', shadowLead: 120 },
      { delay: 5800, duration: 900, easing: 'cubic-bezier(.2,.78,.2,1)', shadowLead: 160 },
      { delay: 6460, duration: 910, easing: 'cubic-bezier(.1,.76,.18,1)', shadowLead: 170 },
    ];

    paths.forEach((path, index) => playPath(scene, index, path, sequences[index]));

    /* The falling v lands hard enough to disturb the three letters already waiting. */
    later(() => {
      [2, 1, 0].forEach((index, order) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const delay = order * 28;
        track(
          scene.glyphs[index].animate([
            { transform: 'none' },
            { offset: 0.34, transform: `translate(${direction * (4 - order)}px, -1px) rotate(${direction * 0.7}deg)` },
            { offset: 0.68, transform: `translate(${direction * -1.5}px, 0) rotate(${direction * -0.25}deg)` },
            { transform: 'none' },
          ], { duration: 320, delay, easing: 'cubic-bezier(.2,.8,.2,1)' }),
          scene.casts[index].animate([
            { translate: '0 0', scale: '1' },
            { offset: 0.34, translate: `${direction * (3 - order * 0.55)}px 0`, scale: '1.08 .9' },
            { translate: '0 0', scale: '1' },
          ], { duration: 320, delay, easing: 'cubic-bezier(.2,.8,.2,1)' }),
          scene.contacts[index].animate([
            { translate: '0 0', scale: '1' },
            { offset: 0.34, translate: `${direction * (2.4 - order * 0.45)}px 0`, scale: '1.18 .56' },
            { translate: '0 0', scale: '1' },
          ], { duration: 320, delay, easing: 'cubic-bezier(.2,.8,.2,1)' }),
        );
      });
    }, 5350);

    /* The final n is the closer. Its braking force travels back through the entire word. */
    later(() => {
      [5, 4, 3, 2, 1, 0].forEach((index, order) => {
        const force = Math.max(1.2, 7 - order * 0.9);
        const delay = order * 34;
        track(
          scene.glyphs[index].animate([
            { transform: 'none' },
            { offset: 0.28, transform: `translateX(${-force}px) rotate(${-force * 0.09}deg)` },
            { offset: 0.62, transform: `translateX(${force * 0.28}px) rotate(${force * 0.025}deg)` },
            { transform: 'none' },
          ], { duration: 330, delay, easing: 'cubic-bezier(.18,.8,.22,1)' }),
          scene.casts[index].animate([
            { translate: '0 0', scale: '1' },
            { offset: 0.3, translate: `${-force * 0.72}px 0`, scale: `${1 + force * 0.025} .88` },
            { offset: 0.64, translate: `${force * 0.18}px 0`, scale: '1.02 .97' },
            { translate: '0 0', scale: '1' },
          ], { duration: 330, delay, easing: 'cubic-bezier(.18,.8,.22,1)' }),
          scene.contacts[index].animate([
            { translate: '0 0', scale: '1' },
            { offset: 0.3, translate: `${-force * 0.55}px 0`, scale: `${1.14 + force * 0.025} .54` },
            { offset: 0.64, translate: `${force * 0.14}px 0`, scale: '1.04 .82' },
            { translate: '0 0', scale: '1' },
          ], { duration: 330, delay, easing: 'cubic-bezier(.18,.8,.22,1)' }),
        );
      });

      track(studioSource.animate([
        { transform: 'none' },
        { offset: 0.3, transform: 'translateX(-2.2px) rotate(-0.16deg)' },
        { offset: 0.62, transform: 'translateX(.7px) rotate(.05deg)' },
        { transform: 'none' },
      ], { duration: 360, easing: 'cubic-bezier(.18,.8,.22,1)' }));
    }, 7010);

    later(() => {
      track(
        scene.glyphPlane.animate([
          { transform: 'translateY(0)' },
          { offset: 0.5, transform: 'translateY(-1.5px)' },
          { transform: 'translateY(0)' },
        ], { duration: 210, easing: 'cubic-bezier(.2,.8,.2,1)' }),
        scene.shadowPlane.animate([
          { opacity: 1, transform: 'scaleX(1.018)' },
          { opacity: 0.94, transform: 'scaleX(1)' },
        ], { duration: 230, easing: 'ease-out', fill: 'forwards' }),
      );
    }, 7410);

    later(() => {
      nameSource.dataset.titleEntrance = 'complete';
      nameSource.animate([
        {
          transform: 'translateY(-1.5px)',
          textShadow: '0.018em 0.04em 0 rgb(23 23 22 / 0.13), 0.034em 0.1em 0.14em rgb(23 23 22 / 0.2)',
        },
        {
          transform: 'translateY(0)',
          textShadow: '0.014em 0.026em 0 rgb(23 23 22 / 0.09), 0.027em 0.072em 0.1em rgb(23 23 22 / 0.14)',
        },
      ], { duration: 230, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' });

      const glyphFade = scene.glyphPlane.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 120, easing: 'ease-out', fill: 'forwards' },
      );
      const shadowFade = scene.shadowPlane.animate(
        [{ opacity: 0.94 }, { offset: 0.22, opacity: 0.78 }, { opacity: 0 }],
        { duration: 500, easing: 'ease-out', fill: 'forwards' },
      );
      Promise.allSettled([glyphFade.finished, shadowFade.finished]).then(() => scene.layer.remove());
    }, 7640);
  };

  const start = () => {
    if (started || completed) return;
    started = true;

    try {
      if (!Element.prototype.animate) throw new Error('Web Animations API unavailable');
      if (root.dataset.assembly !== 'playing') return;

      const studioScene = createWholeWordScene(studioSource);
      const nameScene = createLetterScene(nameSource);
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;

      listenForIntent();
      playStudio(studioScene, vw, vh);
      playName(nameScene, vw, vh);
      completionTimer = later(() => finish(false), 10600);
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
