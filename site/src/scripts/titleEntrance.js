(() => {
const root = document.documentElement;
const studioSource = document.querySelector('[data-assemble="studio"]');
const wievienSource = document.querySelector('[data-assemble="wievien"]');
if (!studioSource || !wievienSource) return;
if (!['pending', 'playing'].includes(root.dataset.assembly || '')) return;
let started = false;
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
observer.observe(root, {
attributes: true,
attributeFilter: ['data-assembly'],
});
};
const copyTypography = (target, computed) => {
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
});
};
const animate = (element, frames, options) => {
if (!element) return null;
return element.animate(frames, { fill: 'both', ...options });
};
const start = async () => {
if (started) return;
started = true;
let stage;
try {
if (document.fonts?.ready) await document.fonts.ready;
if (root.dataset.assembly !== 'playing') return;
studioSource.style.animation = 'none';
studioSource.style.transform = 'none';
studioSource.style.transition = 'none';
wievienSource.style.animation = 'none';
wievienSource.style.transform = 'none';
wievienSource.style.transition = 'none';
const studioRect = studioSource.getBoundingClientRect();
const wievienRect = wievienSource.getBoundingClientRect();
const studioComputed = getComputedStyle(studioSource);
const wievienComputed = getComputedStyle(wievienSource);
const wievienTextNode = Array.from(wievienSource.childNodes)
.find((node) => node.nodeType === Node.TEXT_NODE);
const word = wievienSource.textContent?.trim() || '';
if (!wievienTextNode || word !== 'Wievien') {
throw new Error('The title entrance requires the intact word Wievien.');
}
stage = document.createElement('div');
stage.className = 'kinetic-title-stage';
stage.style.height = `${Math.max(document.documentElement.scrollHeight, window.innerHeight)}px`;
document.body.appendChild(stage);
const studio = document.createElement('div');
studio.className = 'kinetic-studio';
Object.assign(studio.style, {
left: `${studioRect.left + window.scrollX}px`,
top: `${studioRect.top + window.scrollY}px`,
width: `${studioRect.width}px`,
height: `${studioRect.height}px`,
});
const studioInk = document.createElement('span');
studioInk.className = 'kinetic-studio-ink';
studioInk.textContent = studioSource.textContent?.trim() || 'Studio';
copyTypography(studioInk, studioComputed);
studioInk.style.textShadow = '0.018em 0.045em 0.075em rgb(23 23 22 / 0.13)';
studio.appendChild(studioInk);
const studioShadow = document.createElement('div');
studioShadow.className = 'kinetic-shadow kinetic-studio-shadow';
Object.assign(studioShadow.style, {
left: `${studioRect.left + window.scrollX + studioRect.width * 0.06}px`,
top: `${studioRect.bottom + window.scrollY - 4}px`,
width: `${studioRect.width * 0.88}px`,
});
stage.appendChild(studioShadow);
stage.appendChild(studio);
animate(studio, [
{ offset: 0, transform: 'translate(-46vw, -1.5vh) rotate(-5deg) scale(.975)' },
{ offset: .58, transform: 'translate(1.6vw, .15vh) rotate(1.25deg) scale(1.012,.975)' },
{ offset: .76, transform: 'translate(-.55vw, -.08vh) rotate(-.6deg) scale(.995,1.008)' },
{ offset: .9, transform: 'translate(.18vw, 0) rotate(.18deg) scale(1.002,.997)' },
{ offset: 1, transform: 'none' },
], {
duration: 930,
delay: 170,
easing: 'cubic-bezier(.14,.82,.22,1)',
});
animate(studioShadow, [
{ offset: 0, transform: 'translateX(-46vw) scale(2.25,.34)', opacity: .07, filter: 'blur(7px)' },
{ offset: .58, transform: 'translateX(1.6vw) scale(1.5,.46)', opacity: .27, filter: 'blur(3px)' },
{ offset: .76, transform: 'translateX(-.55vw) scale(.92,.75)', opacity: .17, filter: 'blur(4px)' },
{ offset: .9, transform: 'translateX(.18vw) scale(1.08,.64)', opacity: .2, filter: 'blur(3.5px)' },
{ offset: 1, transform: 'scale(1,.7)', opacity: .15, filter: 'blur(4px)' },
], {
duration: 930,
delay: 170,
easing: 'cubic-bezier(.14,.82,.22,1)',
});
window.setTimeout(() => {
studioSource.dataset.titleEntrance = 'complete';
animate(studioSource, [
{ opacity: 0 },
{ opacity: 1 },
], { duration: 90, easing: 'ease-out' });
animate(studio, [
{ opacity: 1 },
{ opacity: 0 },
], { duration: 100, easing: 'ease-out' })?.finished.then(() => studio.remove());
animate(studioShadow, [
{ opacity: .15 },
{ opacity: 0 },
], { duration: 150, easing: 'ease-out' })?.finished.then(() => studioShadow.remove());
}, 1120);
const glyphs = [];
const inks = [];
const shadows = [];
for (let index = 0; index < word.length; index += 1) {
const range = document.createRange();
range.setStart(wievienTextNode, index);
range.setEnd(wievienTextNode, index + 1);
const rect = range.getBoundingClientRect();
range.detach?.();
const left = rect.left - wievienRect.left;
const top = rect.top - wievienRect.top;
const right = wievienRect.right - rect.right;
const bottom = wievienRect.bottom - rect.bottom;
const glyph = document.createElement('div');
glyph.className = `kinetic-glyph kinetic-glyph-${index}`;
Object.assign(glyph.style, {
left: `${wievienRect.left + window.scrollX}px`,
top: `${wievienRect.top + window.scrollY}px`,
width: `${wievienRect.width}px`,
height: `${wievienRect.height}px`,
transformOrigin: `${left + rect.width / 2}px ${top + rect.height}px`,
});
const ink = document.createElement('span');
ink.className = 'kinetic-glyph-ink';
ink.textContent = word;
copyTypography(ink, wievienComputed);
Object.assign(ink.style, {
clipPath: `inset(${Math.max(0, top - 1)}px ${Math.max(0, right - 1)}px ${Math.max(0, bottom - 1)}px ${Math.max(0, left - 1)}px)`,
transformOrigin: `${left + rect.width / 2}px ${top + rect.height}px`,
textShadow: '0.018em 0.045em 0.075em rgb(23 23 22 / 0.14)',
});
glyph.appendChild(ink);
const shadow = document.createElement('div');
shadow.className = `kinetic-shadow kinetic-glyph-shadow kinetic-glyph-shadow-${index}`;
Object.assign(shadow.style, {
left: `${rect.left + window.scrollX + rect.width * 0.14}px`,
top: `${rect.bottom + window.scrollY - 3}px`,
width: `${Math.max(7, rect.width * 0.76)}px`,
});
stage.appendChild(shadow);
stage.appendChild(glyph);
glyphs.push(glyph);
inks.push(ink);
shadows.push(shadow);
}
wievienSource.style.animation = '';
wievienSource.style.transform = '';
wievienSource.style.transition = '';
studioSource.style.animation = '';
studioSource.style.transform = '';
studioSource.style.transition = '';
const restShadow = {
transform: 'scale(1,.72)',
opacity: .15,
filter: 'blur(4px)',
};
const sequences = [
{
delay: 1360,
duration: 1420,
easing: 'cubic-bezier(.2,.76,.18,1)',
frames: [
{ offset: 0, transform: 'translate(-43vw, 1.2vh) rotate(-12deg) scale(.95)' },
{ offset: .16, transform: 'translate(-34vw, -1.15vh) rotate(8deg) scale(.97)' },
{ offset: .31, transform: 'translate(-26vw, .72vh) rotate(-7deg) scale(.978)' },
{ offset: .47, transform: 'translate(-18vw, -1vh) rotate(6deg) scale(.986)' },
{ offset: .63, transform: 'translate(-10vw, .48vh) rotate(-4deg) scale(.994)' },
{ offset: .79, transform: 'translate(-3.3vw, -.45vh) rotate(2.2deg) scale(1)' },
{ offset: .91, transform: 'translate(-.45vw, .18vh) rotate(-.45deg) scale(1.025,.92)' },
{ offset: 1, transform: 'none' },
],
shadow: [
{ offset: 0, transform: 'translateX(-43vw) scale(1.8,.45)', opacity: .08, filter: 'blur(6px)' },
{ offset: .31, transform: 'translateX(-26vw) scale(1.4,.52)', opacity: .13, filter: 'blur(5px)' },
{ offset: .63, transform: 'translateX(-10vw) scale(1.2,.6)', opacity: .17, filter: 'blur(4px)' },
{ offset: .91, transform: 'translateX(-.45vw) scale(1.45,.42)', opacity: .29, filter: 'blur(2.5px)' },
{ offset: 1, ...restShadow },
],
},
{
delay: 2500,
duration: 650,
easing: 'cubic-bezier(.15,.9,.2,1)',
frames: [
{ offset: 0, transform: 'translate(-13vw, -45vh) rotate(-205deg) scale(.68)' },
{ offset: .58, transform: 'translate(1.8vw, -3.2vh) rotate(20deg) scale(1.05)' },
{ offset: .78, transform: 'translate(1vw, .35vh) rotate(6deg) scale(1.13,.84)' },
{ offset: .9, transform: 'translate(-.28vw, -.25vh) rotate(-2deg) scale(.99,1.03)' },
{ offset: 1, transform: 'none' },
],
shadow: [
{ offset: 0, transform: 'translateX(-13vw) scale(.24,.36)', opacity: .035, filter: 'blur(8px)' },
{ offset: .58, transform: 'translateX(1.8vw) scale(.55,.58)', opacity: .1, filter: 'blur(5px)' },
{ offset: .78, transform: 'translateX(1vw) scale(1.35,.38)', opacity: .28, filter: 'blur(2.5px)' },
{ offset: 1, ...restShadow },
],
},
{
delay: 2780,
duration: 940,
easing: 'cubic-bezier(.18,.76,.16,1)',
frames: [
{ offset: 0, transform: 'translate(-34vw, 18vh) rotate(-620deg) scale(.8)' },
{ offset: .34, transform: 'translate(-22vw, -20vh) rotate(-410deg) scale(.9)' },
{ offset: .68, transform: 'translate(-5vw, -5vh) rotate(-90deg) scale(.99)' },
{ offset: .86, transform: 'translate(.75vw, .4vh) rotate(13deg) scale(1.045,.92)' },
{ offset: 1, transform: 'none' },
],
shadow: [
{ offset: 0, transform: 'translateX(-34vw) scale(.6,.5)', opacity: .08, filter: 'blur(6px)' },
{ offset: .34, transform: 'translateX(-22vw) scale(.32,.38)', opacity: .05, filter: 'blur(8px)' },
{ offset: .68, transform: 'translateX(-5vw) scale(.72,.6)', opacity: .13, filter: 'blur(5px)' },
{ offset: .86, transform: 'translateX(.75vw) scale(1.3,.42)', opacity: .27, filter: 'blur(2.5px)' },
{ offset: 1, ...restShadow },
],
},
{
delay: 3840,
shadowDelay: 3540,
duration: 1040,
shadowDuration: 1340,
easing: 'cubic-bezier(.16,.82,.22,1)',
frames: [
{ offset: 0, transform: 'translate(0, -72vh) rotate(35deg) scale(.82)' },
{ offset: .58, transform: 'translate(0, -8vh) rotate(7deg) scale(.97)' },
{ offset: .68, transform: 'translate(0, 1.25vh) rotate(-5deg) scale(1.07,.71)' },
{ offset: .79, transform: 'translate(0, -6vh) rotate(2deg) scale(.98,1.07)' },
{ offset: .91, transform: 'translate(0, .3vh) rotate(-1deg) scale(1.025,.91)' },
{ offset: 1, transform: 'none' },
],
shadow: [
{ offset: 0, transform: 'scale(.16,.25)', opacity: .02, filter: 'blur(11px)' },
{ offset: .22, transform: 'scale(.22,.32)', opacity: .045, filter: 'blur(9px)' },
{ offset: .55, transform: 'scale(.48,.48)', opacity: .09, filter: 'blur(6px)' },
{ offset: .76, transform: 'scale(1.65,.34)', opacity: .32, filter: 'blur(2px)' },
{ offset: .86, transform: 'scale(.58,.62)', opacity: .11, filter: 'blur(6px)' },
{ offset: .94, transform: 'scale(1.28,.43)', opacity: .26, filter: 'blur(2.8px)' },
{ offset: 1, ...restShadow },
],
},
{
delay: 4930,
duration: 570,
easing: 'cubic-bezier(.15,.88,.21,1)',
frames: [
{ offset: 0, transform: 'translate(9vw, 38vh) rotate(190deg) scale(.7)' },
{ offset: .6, transform: 'translate(-.85vw, -5.5vh) rotate(-20deg) scale(1.04)' },
{ offset: .82, transform: 'translate(.32vw, .3vh) rotate(5deg) scale(1.09,.87)' },
{ offset: 1, transform: 'none' },
],
shadow: [
{ offset: 0, transform: 'translateX(9vw) scale(.3,.4)', opacity: .05, filter: 'blur(7px)' },
{ offset: .6, transform: 'translateX(-.85vw) scale(.55,.55)', opacity: .1, filter: 'blur(5px)' },
{ offset: .82, transform: 'translateX(.32vw) scale(1.4,.37)', opacity: .29, filter: 'blur(2.5px)' },
{ offset: 1, ...restShadow },
],
},
{
delay: 5100,
duration: 770,
easing: 'cubic-bezier(.18,.8,.19,1)',
frames: [
{ offset: 0, transform: 'translate(27vw, -31vh) rotate(145deg) scale(.8)' },
{ offset: .4, transform: 'translate(13vw, -18vh) rotate(70deg) scale(.92)' },
{ offset: .72, transform: 'translate(2.2vw, -3.2vh) rotate(12deg) scale(1.01)' },
{ offset: .88, transform: 'translate(-.55vw, .35vh) rotate(-7deg) scale(1.045,.92)' },
{ offset: 1, transform: 'none' },
],
shadow: [
{ offset: 0, transform: 'translateX(27vw) scale(.34,.44)', opacity: .045, filter: 'blur(8px)' },
{ offset: .4, transform: 'translateX(13vw) scale(.42,.5)', opacity: .07, filter: 'blur(7px)' },
{ offset: .72, transform: 'translateX(2.2vw) scale(.72,.6)', opacity: .13, filter: 'blur(5px)' },
{ offset: .88, transform: 'translateX(-.55vw) scale(1.27,.42)', opacity: .27, filter: 'blur(2.5px)' },
{ offset: 1, ...restShadow },
],
},
{
delay: 5730,
shadowDelay: 5480,
duration: 930,
shadowDuration: 1180,
easing: 'cubic-bezier(.08,.78,.16,1)',
frames: [
{ offset: 0, transform: 'translate(62vw, -.5vh) rotate(10deg) skewX(-10deg) scale(1.06)' },
{ offset: .54, transform: 'translate(-2.8vw, 0) rotate(-2.5deg) skewX(2deg) scale(1.05,.95)' },
{ offset: .7, transform: 'translate(1.7vw, 0) rotate(1deg) skewX(-1deg)' },
{ offset: .86, transform: 'translate(-.45vw, 0) rotate(-.35deg)' },
{ offset: 1, transform: 'none' },
],
shadow: [
{ offset: 0, transform: 'translateX(62vw) scale(2.8,.27)', opacity: .05, filter: 'blur(9px)' },
{ offset: .22, transform: 'translateX(42vw) scale(2.6,.3)', opacity: .1, filter: 'blur(7px)' },
{ offset: .62, transform: 'translateX(-2.8vw) scale(2.25,.32)', opacity: .29, filter: 'blur(2.5px)' },
{ offset: .76, transform: 'translateX(1.7vw) scale(1.65,.4)', opacity: .25, filter: 'blur(3px)' },
{ offset: .9, transform: 'translateX(-.45vw) scale(1.18,.55)', opacity: .2, filter: 'blur(3.5px)' },
{ offset: 1, ...restShadow },
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
duration: sequence.shadowDuration || sequence.duration,
delay: sequence.shadowDelay ?? sequence.delay,
easing: sequence.easing,
});
});
window.setTimeout(() => {
[2, 1, 0].forEach((index, order) => {
animate(inks[index], [
{ transform: 'translateY(0) rotate(0)' },
{ transform: `translateY(${-3 + order}px) rotate(${1.3 - order * .35}deg)` },
{ transform: 'translateY(1px) rotate(-.45deg)' },
{ transform: 'none' },
], {
duration: 300,
delay: order * 38,
easing: 'cubic-bezier(.2,.78,.22,1)',
});
animate(shadows[index], [
restShadow,
{ transform: 'scale(1.16,.5)', opacity: .22, filter: 'blur(3px)' },
restShadow,
], {
duration: 300,
delay: order * 38,
easing: 'ease-out',
});
});
}, 4540);
window.setTimeout(() => {
[5, 4, 3, 2, 1, 0].forEach((index, order) => {
const direction = order % 2 === 0 ? -1 : 1;
animate(inks[index], [
{ transform: 'none' },
{ transform: `translateX(${direction * (4.5 - order * .45)}px) rotate(${direction * .65}deg)` },
{ transform: `translateX(${direction * -1.4}px) rotate(${direction * -.2}deg)` },
{ transform: 'none' },
], {
duration: 310,
delay: order * 42,
easing: 'cubic-bezier(.18,.82,.2,1)',
});
animate(shadows[index], [
restShadow,
{ transform: 'scale(1.22,.48)', opacity: .22, filter: 'blur(3px)' },
restShadow,
], {
duration: 310,
delay: order * 42,
easing: 'ease-out',
});
});
}, 6260);
window.setTimeout(() => {
glyphs.forEach((glyph, index) => {
animate(glyph, [
{ transform: 'translateY(0) rotate(0)' },
{ transform: `translateY(${-2 - (index % 2)}px) rotate(${index % 2 ? -.35 : .35}deg)` },
{ transform: 'none' },
], {
duration: 270,
delay: index * 18,
easing: 'cubic-bezier(.2,.82,.2,1)',
});
animate(shadows[index], [
restShadow,
{ transform: 'scale(.94,.8)', opacity: .13, filter: 'blur(4.5px)' },
restShadow,
], {
duration: 270,
delay: index * 18,
easing: 'ease-out',
});
});
}, 6680);
window.setTimeout(() => {
wievienSource.dataset.titleEntrance = 'complete';
animate(wievienSource, [
{
opacity: 0,
transform: 'translateY(-1px)',
textShadow: '0.03em 0.08em 0.14em rgb(23 23 22 / 0.2)',
},
{
opacity: 1,
transform: 'none',
textShadow: '0.018em 0.045em 0.075em rgb(23 23 22 / 0.11)',
},
], {
duration: 170,
easing: 'ease-out',
});
glyphs.forEach((glyph) => {
animate(glyph, [{ opacity: 1 }, { opacity: 0 }], {
duration: 150,
easing: 'ease-out',
});
});
shadows.forEach((shadow) => {
animate(shadow, [
{ opacity: .15, transform: 'scale(1,.72)' },
{ opacity: 0, transform: 'scale(.96,.78)' },
], {
duration: 220,
easing: 'ease-out',
});
});
}, 7070);
window.setTimeout(() => stage?.remove(), 7350);
} catch (error) {
studioSource.dataset.titleEntrance = 'complete';
wievienSource.dataset.titleEntrance = 'complete';
stage?.remove();
console.warn('Studio Wievien title entrance fell back to the static title.', error);
}
};
waitForPlay();
})();
