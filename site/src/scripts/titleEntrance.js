(() => {
const root = document.documentElement;
const studioSource = document.querySelector('[data-assemble="studio"]');
const wievienSource = document.querySelector('[data-assemble="wievien"]');
if (!(studioSource instanceof HTMLElement) || !(wievienSource instanceof HTMLElement)) return;
if (!['pending', 'playing'].includes(root.dataset.assembly || '')) return;
let started = false;
let finished = false;
let stage;
const timers = [];
const later = (callback, delay) => {
const timer = window.setTimeout(callback, delay);
timers.push(timer);
return timer;
};
const copyType = (source, target) => {
const computed = getComputedStyle(source);
Object.assign(target.style, {
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
textTransform: computed.textTransform,
});
};
const finish = () => {
if (finished) return;
finished = true;
timers.forEach((timer) => window.clearTimeout(timer));
studioSource.dataset.titleEntrance = 'complete';
wievienSource.dataset.letterEntrance = 'complete';
stage?.remove();
window.removeEventListener('resize', finish);
window.removeEventListener('orientationchange', finish);
};
const animate = (element, keyframes, options) => element.animate(keyframes, {
fill: 'both',
...options,
});
const waitForPlay = () => {
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
};
const start = async () => {
if (started) return;
started = true;
try {
if (document.fonts?.ready) await document.fonts.ready;
if (root.dataset.assembly !== 'playing') return;
const studioRect = studioSource.getBoundingClientRect();
const wordRect = wievienSource.getBoundingClientRect();
const wordTextNode = Array.from(wievienSource.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
const word = wievienSource.textContent?.trim() || '';
if (!wordTextNode || word !== 'Wievien' || !studioRect.width || !wordRect.width) {
finish();
return;
}
stage = document.createElement('div');
stage.className = 'kinetic-title-stage';
document.body.appendChild(stage);
window.addEventListener('resize', finish, { once: true });
window.addEventListener('orientationchange', finish, { once: true });
const studioLayer = document.createElement('div');
studioLayer.className = 'kinetic-studio-layer';
Object.assign(studioLayer.style, {
left: `${studioRect.left + window.scrollX}px`,
top: `${studioRect.top + window.scrollY}px`,
width: `${studioRect.width}px`,
height: `${studioRect.height}px`,
});
const studioShadow = document.createElement('div');
studioShadow.className = 'kinetic-studio-shadow';
Object.assign(studioShadow.style, {
left: `${studioRect.width * 0.06}px`,
top: `${Math.max(0, studioRect.height - 5)}px`,
width: `${studioRect.width * 0.88}px`,
});
const studioInk = document.createElement('span');
studioInk.className = 'kinetic-studio-ink';
studioInk.textContent = studioSource.textContent?.trim() || 'Studio';
copyType(studioSource, studioInk);
studioLayer.append(studioShadow, studioInk);
stage.appendChild(studioLayer);
animate(studioInk, [
{ offset: 0, transform: 'translateX(-72vw) translateY(.04em) rotate(-2.6deg) skewX(-10deg) scale(.97)', opacity: 1 },
{ offset: .58, transform: 'translateX(2.2vw) translateY(-.015em) rotate(.65deg) skewX(1.4deg) scale(1.012,.985)', opacity: 1 },
{ offset: .73, transform: 'translateX(-.68vw) translateY(.008em) rotate(-.48deg) skewX(-.35deg)' },
{ offset: .86, transform: 'translateX(.24vw) rotate(.18deg)' },
{ offset: 1, transform: 'none', opacity: 1 },
], {
duration: 1080,
delay: 70,
easing: 'cubic-bezier(.16,.82,.18,1)',
});
animate(studioShadow, [
{ offset: 0, transform: 'translateX(-72vw) scale(2.7,.34)', opacity: .075 },
{ offset: .58, transform: 'translateX(2.2vw) scale(1.48,.48)', opacity: .24 },
{ offset: .73, transform: 'translateX(-.68vw) scale(1.22,.58)', opacity: .21 },
{ offset: .86, transform: 'translateX(.24vw) scale(1.08,.72)', opacity: .18 },
{ offset: 1, transform: 'none', opacity: .15 },
], {
duration: 1080,
delay: 70,
easing: 'cubic-bezier(.16,.82,.18,1)',
});
later(() => {
studioSource.dataset.titleEntrance = 'complete';
studioLayer.animate([{ opacity: 1 }, { opacity: 0 }], {
duration: 150,
easing: 'ease-out',
fill: 'forwards',
}).finished.then(() => studioLayer.remove()).catch(() => studioLayer.remove());
}, 1170);
const wordLayer = document.createElement('div');
wordLayer.className = 'kinetic-word-layer';
Object.assign(wordLayer.style, {
left: `${wordRect.left + window.scrollX}px`,
top: `${wordRect.top + window.scrollY}px`,
width: `${wordRect.width}px`,
height: `${wordRect.height}px`,
});
stage.appendChild(wordLayer);
const glyphs = [];
const shadows = [];
for (let index = 0; index < word.length; index += 1) {
const range = document.createRange();
range.setStart(wordTextNode, index);
range.setEnd(wordTextNode, index + 1);
const rect = range.getBoundingClientRect();
range.detach?.();
const left = rect.left - wordRect.left;
const top = rect.top - wordRect.top;
const right = wordRect.right - rect.right;
const bottom = wordRect.bottom - rect.bottom;
const glyph = document.createElement('div');
glyph.className = `kinetic-glyph kinetic-glyph-${index}`;
glyph.style.clipPath = `inset(${Math.max(0, top - 1)}px ${Math.max(0, right - 1)}px ${Math.max(0, bottom - 1)}px ${Math.max(0, left - 1)}px)`;
glyph.style.transformOrigin = `${left + rect.width / 2}px ${top + rect.height}px`;
glyph.style.zIndex = `${10 + index}`;
const ink = document.createElement('span');
ink.className = 'kinetic-glyph-ink';
ink.textContent = word;
copyType(wievienSource, ink);
glyph.appendChild(ink);
const shadow = document.createElement('div');
shadow.className = `kinetic-glyph-shadow kinetic-glyph-shadow-${index}`;
Object.assign(shadow.style, {
left: `${left + rect.width * 0.14}px`,
top: `${Math.min(wordRect.height - 3, top + rect.height - 4)}px`,
width: `${Math.max(7, rect.width * 0.8)}px`,
zIndex: '1',
});
wordLayer.append(shadow, glyph);
glyphs.push(glyph);
shadows.push(shadow);
}
const sequences = [
{
delay: 1410,
duration: 1480,
easing: 'cubic-bezier(.18,.72,.16,1)',
frames: [
{ offset: 0, transform: 'translate(-66vw, .2vh) rotate(-13deg) scale(.95)' },
{ offset: .14, transform: 'translate(-53vw, -1.1vh) rotate(8deg) scale(.97)' },
{ offset: .28, transform: 'translate(-41vw, .45vh) rotate(-8deg) scale(.975)' },
{ offset: .43, transform: 'translate(-29vw, -1vh) rotate(7deg) scale(.985)' },
{ offset: .58, transform: 'translate(-18vw, .35vh) rotate(-5deg) scale(.99)' },
{ offset: .73, transform: 'translate(-8vw, -.55vh) rotate(3.8deg) scale(.997)' },
{ offset: .88, transform: 'translate(-1.3vw, .08vh) rotate(-1.1deg) scale(1.035,.91)' },
{ offset: 1, transform: 'none' },
],
shadowDelay: 1410,
shadowDuration: 1480,
shadow: [
{ offset: 0, transform: 'translateX(-66vw) scale(1.9,.4)', opacity: .1 },
{ offset: .14, transform: 'translateX(-53vw) scale(.88,.7)', opacity: .15 },
{ offset: .28, transform: 'translateX(-41vw) scale(1.45,.46)', opacity: .21 },
{ offset: .43, transform: 'translateX(-29vw) scale(.88,.7)', opacity: .15 },
{ offset: .58, transform: 'translateX(-18vw) scale(1.35,.5)', opacity: .22 },
{ offset: .73, transform: 'translateX(-8vw) scale(.92,.68)', opacity: .17 },
{ offset: .88, transform: 'translateX(-1.3vw) scale(1.52,.38)', opacity: .31 },
{ offset: 1, transform: 'none', opacity: .17 },
],
},
{
delay: 2500,
duration: 650,
easing: 'cubic-bezier(.12,.88,.18,1)',
frames: [
{ offset: 0, transform: 'translate(-16vw, -54vh) rotate(-205deg) scale(.66)' },
{ offset: .58, transform: 'translate(2.1vw, -3.2vh) rotate(22deg) scale(1.06)' },
{ offset: .78, transform: 'translate(1.15vw, .25vh) rotate(7deg) scale(1.13,.84)' },
{ offset: .9, transform: 'translate(-.35vw, -.15vh) rotate(-2deg)' },
{ offset: 1, transform: 'none' },
],
shadowDelay: 2500,
shadowDuration: 650,
shadow: [
{ offset: 0, transform: 'translateX(-16vw) translateX(8px) scale(.2,.36)', opacity: .025 },
{ offset: .58, transform: 'translateX(2.1vw) scale(.5,.58)', opacity: .1 },
{ offset: .78, transform: 'translateX(1.15vw) scale(1.42,.38)', opacity: .3 },
{ offset: .9, transform: 'translateX(-.35vw) scale(.9,.65)', opacity: .18 },
{ offset: 1, transform: 'none', opacity: .17 },
],
},
{
delay: 2760,
duration: 860,
easing: 'cubic-bezier(.18,.74,.18,1)',
frames: [
{ offset: 0, transform: 'translate(-36vw, 7vh) rotate(-620deg) scale(.8)' },
{ offset: .42, transform: 'translate(-19vw, -8vh) rotate(-360deg) scale(.91)' },
{ offset: .72, transform: 'translate(-3.2vw, -3vh) rotate(-78deg) scale(1)' },
{ offset: .88, transform: 'translate(.7vw, .35vh) rotate(13deg) scale(1.05,.92)' },
{ offset: 1, transform: 'none' },
],
shadowDelay: 2760,
shadowDuration: 860,
shadow: [
{ offset: 0, transform: 'translateX(-36vw) scale(1.55,.38)', opacity: .12 },
{ offset: .42, transform: 'translateX(-19vw) scale(.42,.5)', opacity: .065 },
{ offset: .72, transform: 'translateX(-3.2vw) scale(.72,.62)', opacity: .14 },
{ offset: .88, transform: 'translateX(.7vw) scale(1.35,.4)', opacity: .29 },
{ offset: 1, transform: 'none', opacity: .17 },
],
},
{
delay: 3700,
duration: 960,
easing: 'cubic-bezier(.12,.84,.22,1)',
frames: [
{ offset: 0, transform: 'translate(1vw, -74vh) rotate(34deg) scale(.84)' },
{ offset: .62, transform: 'translate(0, 1.3vh) rotate(-5deg) scale(1.07,.72)' },
{ offset: .77, transform: 'translate(0, -6.2vh) rotate(2.2deg) scale(.97,1.07)' },
{ offset: .9, transform: 'translate(0, .3vh) rotate(-1deg) scale(1.03,.9)' },
{ offset: 1, transform: 'none' },
],
shadowDelay: 3370,
shadowDuration: 1290,
shadow: [
{ offset: 0, transform: 'translateX(9px) scale(.1,.22)', opacity: .018 },
{ offset: .25, transform: 'translateX(7px) scale(.16,.3)', opacity: .035 },
{ offset: .5, transform: 'translateX(4px) scale(.34,.44)', opacity: .07 },
{ offset: .72, transform: 'scale(.65,.58)', opacity: .14 },
{ offset: .82, transform: 'scale(1.68,.34)', opacity: .34 },
{ offset: .93, transform: 'scale(.62,.65)', opacity: .13 },
{ offset: 1, transform: 'none', opacity: .17 },
],
},
{
delay: 4570,
duration: 570,
easing: 'cubic-bezier(.13,.88,.2,1)',
frames: [
{ offset: 0, transform: 'translate(8vw, 42vh) rotate(190deg) scale(.7)' },
{ offset: .62, transform: 'translate(-.9vw, -5.5vh) rotate(-19deg) scale(1.05)' },
{ offset: .83, transform: 'translate(.38vw, .3vh) rotate(5deg) scale(1.1,.86)' },
{ offset: 1, transform: 'none' },
],
shadowDelay: 4500,
shadowDuration: 640,
shadow: [
{ offset: 0, transform: 'translateX(8vw) scale(1.6,.35)', opacity: .12 },
{ offset: .5, transform: 'translateX(-.9vw) scale(.42,.5)', opacity: .07 },
{ offset: .82, transform: 'translateX(.38vw) scale(1.48,.35)', opacity: .31 },
{ offset: 1, transform: 'none', opacity: .17 },
],
},
{
delay: 4790,
duration: 780,
easing: 'cubic-bezier(.18,.8,.2,1)',
frames: [
{ offset: 0, transform: 'translate(28vw, -34vh) rotate(138deg) scale(.8)' },
{ offset: .42, transform: 'translate(14vw, -21vh) rotate(68deg) scale(.93)' },
{ offset: .72, transform: 'translate(2.2vw, -3.5vh) rotate(12deg) scale(1.01)' },
{ offset: .88, transform: 'translate(-.6vw, .35vh) rotate(-7deg) scale(1.05,.92)' },
{ offset: 1, transform: 'none' },
],
shadowDelay: 4790,
shadowDuration: 780,
shadow: [
{ offset: 0, transform: 'translateX(28vw) translateX(8px) scale(.28,.4)', opacity: .035 },
{ offset: .42, transform: 'translateX(14vw) translateX(6px) scale(.38,.48)', opacity: .06 },
{ offset: .72, transform: 'translateX(2.2vw) scale(.72,.62)', opacity: .14 },
{ offset: .88, transform: 'translateX(-.6vw) scale(1.34,.39)', opacity: .29 },
{ offset: 1, transform: 'none', opacity: .17 },
],
},
{
delay: 5260,
duration: 1010,
easing: 'cubic-bezier(.08,.76,.16,1)',
frames: [
{ offset: 0, transform: 'translate(66vw, -3vh) rotate(11deg) skewX(-10deg) scale(1.06)' },
{ offset: .52, transform: 'translate(-2.8vw, .05vh) rotate(-2.6deg) skewX(2deg) scale(1.07,.91)' },
{ offset: .68, transform: 'translate(1.55vw, 0) rotate(.9deg) skewX(-1deg)' },
{ offset: .84, transform: 'translate(-.42vw, 0) rotate(-.34deg)' },
{ offset: 1, transform: 'none' },
],
shadowDelay: 5120,
shadowDuration: 1150,
shadow: [
{ offset: 0, transform: 'translateX(70vw) scale(2.9,.28)', opacity: .075 },
{ offset: .48, transform: 'translateX(-2.8vw) scale(2.35,.3)', opacity: .31 },
{ offset: .64, transform: 'translateX(1.55vw) scale(1.7,.4)', opacity: .27 },
{ offset: .82, transform: 'translateX(-.42vw) scale(1.2,.55)', opacity: .21 },
{ offset: 1, transform: 'none', opacity: .17 },
],
},
];
sequences.forEach((sequence, index) => {
animate(glyphs[index], sequence.frames, {
duration: sequence.duration,
delay: sequence.delay,
easing: sequence.easing,
});
animate(shadows[index], sequence.shadow, {
duration: sequence.shadowDuration ?? sequence.duration,
delay: sequence.shadowDelay ?? sequence.delay,
easing: sequence.easing,
});
});
[2, 1, 0].forEach((index, order) => {
animate(glyphs[index], [
{ transform: 'none' },
{ offset: .34, transform: `translateX(${-4 + order}px) translateY(${-2 + order * .35}px) rotate(${-0.45 + order * .12}deg) scale(1.01,.98)` },
{ offset: .7, transform: 'translateX(1px) translateY(.5px) rotate(.12deg)' },
{ transform: 'none' },
], {
duration: 330,
delay: 4300 + order * 34,
fill: 'forwards',
easing: 'cubic-bezier(.18,.8,.2,1)',
});
animate(shadows[index], [
{ transform: 'none', opacity: .17 },
{ offset: .35, transform: 'translateX(-3px) scale(1.16,.55)', opacity: .24 },
{ transform: 'none', opacity: .17 },
], {
duration: 330,
delay: 4300 + order * 34,
fill: 'forwards',
easing: 'cubic-bezier(.18,.8,.2,1)',
});
});
[5, 4, 3, 2, 1, 0].forEach((index, order) => {
const strength = 1 - order * 0.1;
animate(glyphs[index], [
{ transform: 'none' },
{ offset: .28, transform: `translateX(${-7 * strength}px) rotate(${-0.6 * strength}deg) scale(${1 + .018 * strength},${1 - .028 * strength})` },
{ offset: .62, transform: `translateX(${2.2 * strength}px) rotate(${.22 * strength}deg)` },
{ transform: 'none' },
], {
duration: 390,
delay: 5790 + order * 48,
fill: 'forwards',
easing: 'cubic-bezier(.16,.78,.2,1)',
});
animate(shadows[index], [
{ transform: 'none', opacity: .17 },
{ offset: .3, transform: `translateX(${-5 * strength}px) scale(${1.35 + .2 * strength},.38)`, opacity: .28 },
{ transform: 'none', opacity: .17 },
], {
duration: 390,
delay: 5790 + order * 48,
fill: 'forwards',
easing: 'cubic-bezier(.16,.78,.2,1)',
});
});
glyphs.forEach((glyph, index) => {
animate(glyph, [
{ transform: `translate(${(index - 3) * .22}px, -1.2px) rotate(${(index % 2 ? 1 : -1) * .16}deg)` },
{ offset: .45, transform: 'translate(0, .35px) rotate(0)' },
{ transform: 'none' },
], {
duration: 360,
delay: 6430,
fill: 'forwards',
easing: 'cubic-bezier(.2,.8,.2,1)',
});
animate(shadows[index], [
{ transform: 'scale(1.08,.52)', opacity: .23 },
{ transform: 'none', opacity: .17 },
], {
duration: 360,
delay: 6430,
fill: 'forwards',
easing: 'cubic-bezier(.2,.8,.2,1)',
});
});
later(() => {
wievienSource.dataset.letterEntrance = 'complete';
wievienSource.animate([
{
transform: 'translateY(-1.5px)',
textShadow: '0.022em 0.035em 0 rgb(23 23 22 / 0.16), 0.02em 0.085em 0.15em rgb(23 23 22 / 0.18)',
},
{
transform: 'translateY(0)',
textShadow: '0.018em 0.026em 0 rgb(23 23 22 / 0.11), 0.015em 0.065em 0.11em rgb(23 23 22 / 0.12)',
},
], {
duration: 260,
easing: 'cubic-bezier(.2,.8,.2,1)',
fill: 'both',
});
wordLayer.animate([{ opacity: 1 }, { opacity: 0 }], {
duration: 190,
easing: 'ease-out',
fill: 'forwards',
}).finished.then(() => wordLayer.remove()).catch(() => wordLayer.remove());
}, 6830);
later(() => {
stage?.remove();
window.removeEventListener('resize', finish);
window.removeEventListener('orientationchange', finish);
}, 7100);
} catch {
finish();
}
};
waitForPlay();
})();
