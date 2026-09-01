export const createTitleEntranceRuntime = ({ root, studioSource, nameSource }) => {
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

  const showFinalTitle = () => {
    studioSource.dataset.titleEntrance = 'complete';
    nameSource.dataset.titleEntrance = 'complete';
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
        // The target may already have finished or been removed.
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
      fade.finished.finally(() => layer.remove());
    });

    cleanupListeners.forEach((remove) => remove());
    window.dispatchEvent(new CustomEvent('wievien:intro-complete'));
  };

  const setCompletionTimer = (delay) => {
    completionTimer = later(() => finish(false), delay);
  };

  const listenOnceToIntent = () => {
    const skip = () => finish(true);
    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown'];

    events.forEach((type) => {
      window.addEventListener(type, skip, { once: true, passive: true, capture: true });
      cleanupListeners.push(() => window.removeEventListener(type, skip, { capture: true }));
    });

    const resize = () => finish(true);
    window.addEventListener('resize', resize, { once: true });
    cleanupListeners.push(() => window.removeEventListener('resize', resize));

    const handleVisibility = () => {
      if (document.hidden) finish(true);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    cleanupListeners.push(() => document.removeEventListener('visibilitychange', handleVisibility));
  };

  const applyTypography = (element, computed) => Object.assign(element.style, {
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
      const origin = `${left + rect.width / 2}px ${top + rect.height}px`;

      const cast = document.createElement('div');
      cast.className = `title-motion-cast title-motion-cast-${index}`;
      cast.style.transformOrigin = origin;
      const castInk = document.createElement('span');
      castInk.className = 'title-motion-shadow-ink';
      castInk.textContent = word[index];
      castInk.style.left = px(left);
      castInk.style.right = 'auto';
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
      ink.textContent = word[index];
      ink.style.left = px(left);
      ink.style.right = 'auto';
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

  const point = (offset, x, y, z, rotation, scaleX = 1, scaleY = 1, stretch = 0, originX = 0.5) => ({
    offset, x, y, z, rotation, scaleX, scaleY, stretch, originX,
  });

  const revealAtCue = (frames) => {
    if (!frames.length) return frames;
    const first = frames[0];
    const nextOffset = frames[1]?.offset ?? 1;
    const revealOffset = Math.min(0.024, nextOffset * 0.35);
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
    const frames = path.map((frame) => {
      const altitude = Math.max(0, frame.z);
      const distance = clamp(altitude / maxAltitude, 0, 1);
      const impact = frame.scaleY < 0.92 ? 1 : 0;
      const projectedX = frame.x + altitude * 0.065 + 5;
      const opacity = clamp(0.06 + (1 - distance) * 0.17 + impact * 0.055, 0.025, 0.31);

      if (kind === 'cast') {
        const scaleX = frame.scaleX * (1 - distance * 0.38) * (1 + frame.stretch * 0.5 + impact * 0.18);
        const scaleY = 0.26 * (1 - distance * 0.32) * (impact ? 0.72 : 1);
        return {
          offset: frame.offset,
          transform: `translate(${px(projectedX)}, 8px) skewX(-29deg) rotate(${frame.rotation * 0.12}deg) scale(${scaleX}, ${scaleY})`,
          transformOrigin: `${px(metric.left + metric.width * frame.originX)} ${px(metric.originY)}`,
          opacity,
        };
      }

      const scaleX = (1 - distance * 0.7) * (1 + frame.stretch + impact * 0.35);
      const scaleY = (0.42 + (1 - distance) * 0.58) * (impact ? 0.55 : 1);
      return {
        offset: frame.offset,
        transform: `translateX(${px(projectedX)}) scale(${scaleX}, ${scaleY})`,
        opacity: opacity + 0.015,
      };
    });
    return revealAtCue(frames);
  };

  const playPath = (scene, index, path, options) => {
    const metric = scene.metrics[index];
    const glyph = scene.glyphs[index];
    const cast = scene.casts[index];
    const contact = scene.contacts[index];
    const shadowDelay = Math.max(0, options.delay - (options.shadowLead || 0));

    activeAnimations.push(
      glyph.animate(makeGlyphFrames(path, metric), {
        duration: options.duration,
        delay: options.delay,
        easing: options.easing,
        fill: 'both',
      }),
      cast.animate(makeShadowFrames(path, metric, 'cast'), {
        duration: options.duration + (options.shadowLead || 0),
        delay: shadowDelay,
        easing: options.easing,
        fill: 'both',
      }),
      contact.animate(makeShadowFrames(path, metric, 'contact'), {
        duration: options.duration + (options.shadowLead || 0),
        delay: shadowDelay,
        easing: options.easing,
        fill: 'both',
      }),
    );
  };

  return {
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
  };
};
