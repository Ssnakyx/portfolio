<template>
  <div class="floating-bg" aria-hidden="true">
    <!-- Floating code words -->
    <span
      v-for="(word, i) in words"
      :key="'w'+i"
      class="float-word"
      :style="{
        left: word.x + '%',
        top: word.y + '%',
        animationDuration: word.dur + 's',
        animationDelay: word.delay + 's',
        fontSize: word.size + 'rem',
        opacity: word.opacity,
      }"
    >{{ word.text }}</span>

    <!-- Floating geometric lines -->
    <div
      v-for="(line, i) in lines"
      :key="'l'+i"
      class="float-line"
      :style="{
        left: line.x + '%',
        top: line.y + '%',
        width: line.w + 'px',
        transform: 'rotate(' + line.rot + 'deg)',
        animationDuration: line.dur + 's',
        animationDelay: line.delay + 's',
        opacity: line.opacity,
      }"
    />

    <!-- Floating circles / dots -->
    <div
      v-for="(dot, i) in dots"
      :key="'d'+i"
      class="float-dot"
      :class="{ 'float-dot--ring': dot.ring }"
      :style="{
        left: dot.x + '%',
        top: dot.y + '%',
        width: dot.size + 'px',
        height: dot.size + 'px',
        animationDuration: dot.dur + 's',
        animationDelay: dot.delay + 's',
        opacity: dot.opacity,
      }"
    />

    <!-- Floating angle brackets -->
    <span
      v-for="(bracket, i) in brackets"
      :key="'b'+i"
      class="float-bracket"
      :style="{
        left: bracket.x + '%',
        top: bracket.y + '%',
        animationDuration: bracket.dur + 's',
        animationDelay: bracket.delay + 's',
        fontSize: bracket.size + 'rem',
        opacity: bracket.opacity,
      }"
    >{{ bracket.text }}</span>
  </div>
</template>

<script setup>
// Seeded pseudo-random for consistent layout
function seeded(seed) {
  return function () {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }
}
const rand = seeded(42)
const r = (min, max) => min + rand() * (max - min)

const codeWords = [
  "const", "function", "export", "import", "return",
  "async", "await", "=>", "null", "true",
  "Vue", "ref", "computed", "watch", "props",
  "class", "interface", "type", "let", "if",
  "forEach", "map", "filter", "reduce", "push",
  "{}", "[]", "&&", "||", "===",
]

const words = Array.from({ length: 18 }, (_, i) => ({
  text: codeWords[i % codeWords.length],
  x: r(2, 95),
  y: r(2, 95),
  dur: r(18, 35),
  delay: r(0, 10),
  size: r(0.6, 1.1),
  opacity: r(0.03, 0.07),
}))

const lines = Array.from({ length: 12 }, () => ({
  x: r(5, 90),
  y: r(5, 90),
  w: r(40, 120),
  rot: r(-60, 60),
  dur: r(20, 40),
  delay: r(0, 8),
  opacity: r(0.03, 0.08),
}))

const dots = Array.from({ length: 10 }, () => ({
  x: r(3, 95),
  y: r(3, 95),
  size: r(4, 16),
  ring: rand() > 0.5,
  dur: r(15, 30),
  delay: r(0, 12),
  opacity: r(0.04, 0.1),
}))

const bracketChars = ["</>", "/>", "{ }", "< >", "( )", "=>", "//", "/*", "*/", "#"]
const brackets = Array.from({ length: 8 }, (_, i) => ({
  text: bracketChars[i % bracketChars.length],
  x: r(5, 92),
  y: r(5, 92),
  dur: r(22, 38),
  delay: r(0, 10),
  size: r(0.8, 1.6),
  opacity: r(0.03, 0.06),
}))
</script>

<style scoped>
.floating-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* Floating words */
.float-word {
  position: absolute;
  font-family: "Syne", monospace;
  font-weight: 600;
  color: var(--accent);
  white-space: nowrap;
  animation: floatY linear infinite;
  user-select: none;
}

/* Floating lines */
.float-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  animation: floatDrift linear infinite;
}

/* Floating dots */
.float-dot {
  position: absolute;
  border-radius: 50%;
  background: var(--accent);
  animation: floatPulse ease-in-out infinite;
}
.float-dot--ring {
  background: transparent;
  border: 1px solid var(--accent);
}

/* Floating brackets */
.float-bracket {
  position: absolute;
  font-family: "Syne", monospace;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  animation: floatX linear infinite;
  user-select: none;
}

/* Animations */
@keyframes floatY {
  0%   { transform: translateY(0) rotate(0deg); }
  25%  { transform: translateY(-20px) rotate(2deg); }
  50%  { transform: translateY(0) rotate(0deg); }
  75%  { transform: translateY(20px) rotate(-2deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes floatX {
  0%   { transform: translateX(0) translateY(0); }
  25%  { transform: translateX(15px) translateY(-10px); }
  50%  { transform: translateX(0) translateY(0); }
  75%  { transform: translateX(-15px) translateY(10px); }
  100% { transform: translateX(0) translateY(0); }
}

@keyframes floatDrift {
  0%   { transform: rotate(var(--r, 0deg)) translateX(0) scaleX(1); }
  33%  { transform: rotate(var(--r, 0deg)) translateX(20px) scaleX(1.2); }
  66%  { transform: rotate(var(--r, 0deg)) translateX(-10px) scaleX(0.8); }
  100% { transform: rotate(var(--r, 0deg)) translateX(0) scaleX(1); }
}

@keyframes floatPulse {
  0%, 100% { transform: scale(1); opacity: var(--o, 0.06); }
  50%      { transform: scale(1.5); opacity: calc(var(--o, 0.06) * 1.5); }
}

@media (prefers-reduced-motion: reduce) {
  .float-word, .float-line, .float-dot, .float-bracket {
    animation: none !important;
  }
}

@media (max-width: 640px) {
  .float-word:nth-child(n+10),
  .float-line:nth-child(n+7),
  .float-dot:nth-child(n+6),
  .float-bracket:nth-child(n+5) {
    display: none;
  }
}
</style>
