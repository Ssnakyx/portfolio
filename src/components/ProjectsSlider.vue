<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

const props = defineProps({ projects: { type: Array, required: true } })
const emit = defineEmits(["open-project"])

const activeIndex = ref(0)
const trackRef = ref(null)

function goTo(index) {
  activeIndex.value = index
  const track = trackRef.value
  if (!track) return
  const cards = track.querySelectorAll(".project-card")
  if (cards[index]) {
    cards[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
  }
}

function handleScroll() {
  const track = trackRef.value
  if (!track) return
  const cards = track.querySelectorAll(".project-card")
  const trackLeft = track.scrollLeft
  let closest = 0
  let minDist = Infinity
  cards.forEach((card, i) => {
    const dist = Math.abs(card.offsetLeft - trackLeft)
    if (dist < minDist) { minDist = dist; closest = i }
  })
  activeIndex.value = closest
}
</script>

<template>
  <section id="projects" class="section" role="region" aria-labelledby="projects-title">
    <div class="container">
      <div class="section-header anim anim-clip" data-delay="0">
        <h2 id="projects-title" class="spaced-title">S E L E C T E D &nbsp; W O R K S &nbsp; /</h2>
        <span class="section-label">(PROJETS)</span>
      </div>
      <p class="section-desc anim anim-fade" data-delay="100">
        Des expériences digitales soigneusement conçues qui combinent utilité et esthétique
        en quelque chose de fonctionnel, mémorable et raffiné.
      </p>
      <div class="projects-slider-wrapper anim anim-fade" data-delay="200">
        <div class="projects-counter">
          <span class="projects-counter-current">{{ activeIndex }}</span>
          <span class="projects-counter-divider"></span>
          <div class="projects-counter-numbers">
            <button
              v-for="(p, i) in projects"
              :key="i"
              class="projects-counter-num"
              :class="{ active: i === activeIndex }"
              @click="goTo(i)"
            >{{ i + 1 }}</button>
          </div>
        </div>
        <div ref="trackRef" class="projects-track" @scroll.passive="handleScroll">
          <div
            v-for="(project, i) in projects"
            :key="project.title"
            class="project-card"
            @click="emit('open-project', project)"
          >
            <div class="project-card-header">
              <span class="project-card-category">{{ project.category }} {{ project.year }}</span>
              <span class="project-card-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </span>
            </div>
            <div>
              <h3 class="project-card-title">{{ project.title }}</h3>
              <p class="project-card-subtitle">{{ project.subtitle }}</p>
            </div>
            <p class="project-card-desc">{{ project.description }}</p>
            <div class="project-card-footer">
              <span class="project-card-year">{{ project.year }}</span>
              <div class="project-card-techs">
                <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="project-card-tech">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
