<template>
  <section id="contact" class="section cta-section" role="region" aria-labelledby="contact-title">
    <div class="container">
      <div class="cta-inner">
        <h2 id="contact-title" class="cta-heading anim anim-clip" data-delay="0">
          LET'S<br />
          <span class="accent">MAKE IT</span><br />
          HAPPEN
        </h2>
        <p class="cta-sub anim anim-fade" data-delay="150">Un projet en tête ?</p>
        <a href="mailto:hamed0405n@gmail.com" class="cta-btn anim anim-scale" data-delay="250">
          Obtenir un devis
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </a>
      </div>

      <div class="contact-form-section anim anim-fade" data-delay="300">
        <form class="contact-form" action="https://formsubmit.co/hamed0405n@gmail.com" method="POST">
          <input type="hidden" name="_subject" value="Nouveau message depuis votre portfolio" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://portfoliohamed.netlify.app/merci.html" />
          <input type="text" name="_honey" style="display:none" />
          <div class="form-group">
            <label for="name">Nom</label>
            <input id="name" type="text" name="name" placeholder="Votre nom" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" name="email" placeholder="Votre email" required />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Votre message" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Envoyer</button>
        </form>
      </div>
    </div>
  </section>
</template>
