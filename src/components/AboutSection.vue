<script setup>
defineProps({ skillCategories: { type: Array, required: true } })
</script>

<template>
  <section id="about" class="section" role="region" aria-labelledby="about-title">
    <div class="container">
      <div class="section-header anim anim-clip" data-delay="0">
        <h2 id="about-title" class="spaced-title">A B O U T &nbsp; /</h2>
        <span class="section-label">(A PROPOS)</span>
      </div>

      <!-- Skills -->
      <div class="skills-section anim anim-fade" data-delay="100">
        <h3 class="skills-section-title">Skills</h3>
        <div v-for="cat in skillCategories" :key="cat.title" class="skill-category">
          <h4>{{ cat.title }}</h4>
          <div class="skill-tags">
            <span v-for="item in cat.items" :key="item" class="skill-tag">{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- About text + photo -->
      <div class="about-layout" style="margin-top: 5rem">
        <div class="about-photo-col anim anim-left" data-delay="150">
          <div class="about-photo">
            <div class="about-photo-placeholder">HK</div>
          </div>
        </div>
        <div class="about-text-col anim anim-right" data-delay="250">
          <p class="about-label">( A B O U T &nbsp; M E )</p>
          <p class="about-paragraph">
            Je suis un développeur full-stack passionné par la création d'expériences digitales modernes et performantes.
            Je travaille principalement avec Vue.js et des technologies web modernes pour transformer des idées en produits
            fiables et agréables à utiliser.
          </p>
          <p class="about-paragraph">
            Je construis des sites depuis assez longtemps pour avoir des opinions tranchées sur des choses qui n'importent pas
            à la plupart des gens — comme si une transition doit durer 150ms ou 200ms. (C'est 150ms, évidemment).
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
