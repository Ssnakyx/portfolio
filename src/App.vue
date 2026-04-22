<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue"
import FloatingBackground from "./components/FloatingBackground.vue"
import PortfolioHeader from "./components/PortfolioHeader.vue"
import HeroSection from "./components/HeroSection.vue"
import ServicesSection from "./components/ServicesSection.vue"
import ProjectsSlider from "./components/ProjectsSlider.vue"
import AboutSection from "./components/AboutSection.vue"
import ContactSection from "./components/ContactSection.vue"
import SiteFooter from "./components/SiteFooter.vue"
import ProjectModal from "./components/ProjectModal.vue"
import AdminPanel from "./components/AdminPanel.vue"
import { services, skillCategories } from "./data/content"
import { storageService } from "./utils/storage"

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const selectedProject = ref(null)
const currentTime = ref("00:00:00")
const currentRoute = ref("home")
const dynamicProjects = ref([])
let clockInterval = null
let animObserver = null

// Fonction pour détecter les changements de route via le hash
function handleRouteChange() {
  const hash = window.location.hash.slice(1)
  if (hash === "admin") {
    currentRoute.value = "admin"
  } else {
    currentRoute.value = "home"
    // Recharger les projets en cas de retour du panel admin (ils auraient pu être modifiés)
    loadProjects()
  }
}

function loadProjects() {
  dynamicProjects.value = storageService.getProjects()
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: "smooth" })
  isMenuOpen.value = false
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }) }
function toggleMobileMenu() { isMenuOpen.value = !isMenuOpen.value }

function openProjectModal(project) {
  selectedProject.value = project
  document.body.classList.add("no-scroll")
}
function closeProjectModal() {
  selectedProject.value = null
  document.body.classList.remove("no-scroll")
}

function updateClock() {
  currentTime.value = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50
  // Parallax glow
  const g = document.querySelector(".hero-glow")
  if (g) g.style.transform = `translateY(${window.scrollY * 0.25}px)`
}

function setupAnimations() {
  animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0
          entry.target.style.transitionDelay = `${delay}ms`
          entry.target.classList.add("visible")
          animObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 },
  )
  document.querySelectorAll(".anim").forEach((el) => animObserver.observe(el))
}

function onKeydown(e) {
  if (e.key === "Escape" && selectedProject.value) closeProjectModal()
}

onMounted(async () => {
  await nextTick()
  setupAnimations()
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
  window.addEventListener("scroll", handleScroll, { passive: true })
  document.addEventListener("keydown", onKeydown)
  window.addEventListener("hashchange", handleRouteChange)
  handleScroll()
  loadProjects()
  handleRouteChange()
})

onBeforeUnmount(() => {
  clearInterval(clockInterval)
  animObserver?.disconnect()
  window.removeEventListener("scroll", handleScroll)
  document.removeEventListener("keydown", onKeydown)
  window.removeEventListener("hashchange", handleRouteChange)
  document.body.classList.remove("no-scroll")
})
</script>

<template>
  <!-- Panel Admin -->
  <div v-if="currentRoute === 'admin'">
    <AdminPanel />
  </div>

  <!-- Portfolio Principal -->
  <div v-else class="portfolio-site">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    <div class="scroll-progress" aria-hidden="true"></div>

    <div class="site-wrapper">
      <FloatingBackground />
      <PortfolioHeader
        :is-menu-open="isMenuOpen"
        :is-scrolled="isScrolled"
        @toggle-menu="toggleMobileMenu"
        @scroll-to="scrollToSection"
      />

      <HeroSection @scroll-to="scrollToSection" />
      <ServicesSection :services="services" />
      <ProjectsSlider :projects="dynamicProjects" @open-project="openProjectModal" />

      <div class="marquee-section" aria-hidden="true">
        <div class="marquee-track">
          <span class="marquee-item" v-for="n in 9" :key="'m2-'+n">{{ ["DEVELOPER","DESIGNER","CREATOR"][(n-1)%3] }}</span>
        </div>
      </div>

      <AboutSection :skill-categories="skillCategories" />
      <ContactSection />
      <SiteFooter :current-time="currentTime" @scroll-to="scrollToSection" @scroll-top="scrollToTop" />
      
      <!-- Lien accès Admin (caché mais accessible via le hash) -->
      <div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
        <a href="#admin" class="admin-access-btn" title="Panel Admin">🔐</a>
      </div>
    </div>

    <ProjectModal :selected-project="selectedProject" @close="closeProjectModal" />
  </div>
</template>

<style>
.admin-access-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(100, 200, 255, 0.15);
  border: 2px solid rgba(100, 200, 255, 0.4);
  border-radius: 50%;
  font-size: 24px;
  text-decoration: none;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.admin-access-btn:hover {
  background: rgba(100, 200, 255, 0.3);
  border-color: rgba(100, 200, 255, 0.8);
  opacity: 1;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .admin-access-btn {
    width: 45px;
    height: 45px;
    font-size: 20px;
    bottom: 15px;
    right: 15px;
  }
}
</style>

