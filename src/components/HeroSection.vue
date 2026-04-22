<script setup>
const emit = defineEmits(["scroll-to"])
</script>

<template>
  <section id="main-content" class="hero-section" role="region" aria-label="Hero">
    <div class="hero-glow" aria-hidden="true" />
    <div class="hero-content">
      <div class="hero-text">
        <p class="hero-intro anim anim-left" data-delay="100">
          Je conçois des sites web rapides et modernes qui aident les entreprises à se développer, disponible pour des projets freelance.
        </p>
        <h2 class="hero-title anim anim-clip" data-delay="0">
          HAMED<br />
          <span class="accent">KAFFA</span>
        </h2>
        <div class="hero-cta-group anim anim-fade" data-delay="400">
          <button class="hero-cta" @click="emit('scroll-to', 'contact')">
            CONTACT
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
          <button class="hero-cta-outline" @click="emit('scroll-to', 'contact')">
            CONTACT
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-image-wrapper anim anim-scale" data-delay="200">
          <div class="hero-image-placeholder">HK</div>
        </div>
        <div class="hero-badge anim anim-fade" data-delay="600">
          <span class="dot"></span>
          AVAILABLE FOR WORK &mdash; AVR&rsquo;26
        </div>
      </div>
    </div>
  </section>

  <div class="marquee-section" aria-hidden="true">
    <div class="marquee-track">
      <span class="marquee-item" v-for="n in 9" :key="n">{{ ["DEVELOPER","DESIGNER","CREATOR"][(n-1)%3] }}</span>
    </div>
  </div>
</template>
