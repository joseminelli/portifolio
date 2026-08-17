<script setup>
import { computed, onMounted, ref } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactPanel from "./components/ContactPanel.vue";
import ProjectGrid from "./components/ProjectGrid.vue";
import TimelineSection from "./components/TimelineSection.vue";
import { experiences, hero, projects, stack } from "./data/portfolioData";

const activeTab = ref("projects");
const theme = ref(localStorage.getItem("theme") || "dark");
const appReady = ref(false);
const baseUrl = import.meta.env.BASE_URL;
const profileSrc = `${baseUrl}assets/images/profile.jpg`;
const yearNow = new Date().getFullYear();

const setTab = (tabName) => {
  activeTab.value = tabName;
  const content = document.getElementById("content");

  if (content) {
    content.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const logo = computed(() =>
  theme.value === "dark"
    ? `${baseUrl}assets/images/Logo_light.png`
    : `${baseUrl}assets/images/Logo_dark.png`
);

const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme.value);
  document.documentElement.setAttribute("data-theme", theme.value);
};

const handleScroll = () => {
  const scrolled = window.scrollY;
  const bgNoise = document.querySelector(".bg-noise");
  if (bgNoise) {
    bgNoise.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
};

onMounted(() => {
  document.documentElement.setAttribute("data-theme", theme.value);
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: false,
    offset: 100,
    delay: 0
  });
  window.addEventListener("scroll", handleScroll);
  requestAnimationFrame(() => {
    appReady.value = true;
  });
});
</script>

<template>
  <div class="app-shell" :class="{ ready: appReady }">
    <div class="bg-noise" :style="{ backgroundImage: `url(${baseUrl}assets/images/topography.svg)` }"></div>
    <div class="bg-scanline"></div>

    <main id="content" class="main-grid">
      <section class="hero-card reveal-item" data-aos="fade-up" data-aos-delay="100">
        <p class="module-tag">READY // FULL STACK DEVELOPER ACTIVE | ID_001.SYS</p>
        <div class="hero-main-line">
          <img :src="profileSrc" alt="Jose Minelli" class="avatar" />
          <div>
            <p class="eyebrow">{{ hero.role }}</p>
            <h1 class="hero-title">
              CONSTRUO <span class="hero-highlight">SOLUÇÕES DE ALTO IMPACTO</span>
            </h1>
          </div>
        </div>

        <p class="lead">
          Engenheiro de software focado em escalabilidade, performance e arquitetura. Especializado em backend, modernização de legados e desenvolvimento full stack com C#, .NET, PHP e TypeScript.
        </p>
      </section>

      <section class="about-card reveal-item" data-aos="fade-up" data-aos-delay="200">
        <p class="module-tag">SYSTEM_ARCHIVE // ABOUT</p>
        <h2>Sobre mim</h2>
        <div class="about-content">
          <p v-for="(paragraph, idx) in hero.about.split('\n\n')" :key="idx" class="about-paragraph">
            {{ paragraph }}
          </p>
        </div>
        <p class="meta">LOCAL_NODE: {{ hero.location }}</p>
      </section>

      <section class="workspace-panel reveal-item" data-aos="fade-up" data-aos-delay="300">
        <p class="module-tag workspace-tag">SYSTEM_TERMINAL // CONTENT</p>
        <nav class="tabs" aria-label="Navegacao de conteudo">
          <button :class="{ active: activeTab === 'projects' }" @click="activeTab = 'projects'" type="button">
            01.PROJETOS
          </button>
          <button :class="{ active: activeTab === 'journey' }" @click="activeTab = 'journey'" type="button">
            02.TRAJETORIA
          </button>
          <button :class="{ active: activeTab === 'contact' }" @click="activeTab = 'contact'" type="button">
            03.CONTATO
          </button>
        </nav>

        <transition name="fade-slide" mode="out-in">
          <ProjectGrid v-if="activeTab === 'projects'" key="projects" :items="projects" />
          <TimelineSection v-else-if="activeTab === 'journey'" key="journey" :experiences="experiences" :stack="stack" />
          <ContactPanel v-else key="contact" />
        </transition>
      </section>
    </main>

    <footer class="site-footer">
      <p>FOOTER.RIGHTS {{ yearNow }} JOSE MINELLI | CONNECTION: SECURE_SSL</p>
    </footer>
  </div>
</template>
