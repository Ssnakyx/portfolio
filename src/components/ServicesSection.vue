<script setup>
defineProps({ services: { type: Array, required: true } })
</script>

<template>
  <section id="services" class="section" role="region" aria-labelledby="services-title">
    <div class="container">
      <div class="section-header anim anim-clip" data-delay="0">
        <h2 id="services-title" class="spaced-title">W H A T &nbsp; I &nbsp; D O &nbsp; /</h2>
        <span class="section-label">(SERVICES)</span>
      </div>
      <p class="section-desc anim anim-fade" data-delay="100">
        Je me spécialise dans le développement d'applications web full-stack rapides et fiables.
        J'aide les petites entreprises et les startups à transformer leurs idées en produits de haute qualité.
      </p>
      <div class="services-grid">
        <div v-for="(service, i) in services" :key="service.number" class="service-card anim anim-fade" :data-delay="150 + i * 120">
          <span class="service-number">({{ service.number }})</span>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
          <div class="service-tags">
            <span v-for="tag in service.tags" :key="tag.label" class="service-tag">
              <span class="service-tag-num">{{ tag.num }}</span>{{ tag.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
