<script setup>
import { socialLinks } from "../data/portfolioData";

const getIconLabel = (icon) => {
  const icons = {
    in: "LinkedIn",
    gh: "GitHub",
    be: "Behance",
    ig: "Instagram",
    wa: "WhatsApp"
  };
  return icons[icon] || icon;
};
</script>

<template>
  <section class="contact-section reveal-item">
    <div class="contact-intro">
      <h2>Vamos conversar?</h2>
      <p>Encontre-me em qualquer uma dessas plataformas. Adoraria trocar uma ideia sobre projetos, oportunidades ou tecnologia.</p>
    </div>

    <div class="social-grid">
      <a
        v-for="social in socialLinks"
        :key="social.name"
        :href="social.url"
        target="_blank"
        rel="noreferrer"
        class="social-link"
        :title="`Visite meu ${social.name}`"
      >
        <div class="social-icon" :style="{ '--social-color': social.color }">
          <svg
            v-if="social.svg"
            class="social-svg"
            v-html="social.svg"
            :style="{ color: social.color }"
          />
        </div>
        <div class="social-info">
          <h3>{{ social.name }}</h3>
          <p>Conecte-se comigo</p>
        </div>
      </a>
    </div>

    <div class="contact-email">
      <p class="section-label">Ou envie um email direto:</p>
      <div class="email-links">
        <a href="mailto:joseminelli04@gmail.com">joseminelli04@gmail.com</a>
      </div>
    </div>
  </section>
</template>
