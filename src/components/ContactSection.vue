<script setup>
</script>

<template>
  <section id="contact" class="section" role="region" aria-labelledby="contact-title">
    <div class="container">
      <div class="section-header anim anim-clip" data-delay="0">
        <h2 id="contact-title" class="spaced-title">C O N T A C T &nbsp; /</h2>
        <span class="section-label">(GET IN TOUCH)</span>
      </div>
      <p class="section-desc anim anim-fade" data-delay="100">
        Une idée de projet, une opportunité ou simplement envie d'échanger&nbsp;? N'hésitez pas à me contacter.
      </p>
      <div class="contact-links anim anim-fade" data-delay="200">
        <a class="contact-link" href="mailto:hamed0405n@gmail.com">
          <span class="contact-link-label">Email</span>
          <span class="contact-link-value">hamed0405n@gmail.com</span>
        </a>
        <a class="contact-link" href="https://github.com/Ssnakyx" target="_blank" rel="noopener noreferrer">
          <span class="contact-link-label">GitHub</span>
          <span class="contact-link-value">@Ssnakyx</span>
        </a>
        <a class="contact-link" href="https://www.linkedin.com/in/hamed-kaffa-98587032a/" target="_blank" rel="noopener noreferrer">
          <span class="contact-link-label">LinkedIn</span>
          <span class="contact-link-value">Hamed Kaffa</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-links {
  display: grid;
  gap: 1rem;
  margin-top: 2.5rem;
}
.contact-link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}
.contact-link:hover {
  border-color: rgba(100, 200, 255, 0.5);
  background: rgba(100, 200, 255, 0.05);
  transform: translateY(-2px);
}
.contact-link-label {
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted, #888);
}
.contact-link-value {
  font-size: 1rem;
  color: var(--text-secondary, #ddd);
}
</style>
