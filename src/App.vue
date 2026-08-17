<script setup>
import { computed, onMounted, ref } from "vue";
import ContactPanel from "./components/ContactPanel.vue";
import ProjectGrid from "./components/ProjectGrid.vue";
import TimelineSection from "./components/TimelineSection.vue";
import { experiences, hero, projects, stack } from "./data/portfolioData";

const activeTab = ref("projects");
const theme = ref(localStorage.getItem("theme") || "light");
const appReady = ref(false);
const baseUrl = import.meta.env.BASE_URL;
const profileSrc = `${baseUrl}assets/images/profile.jpg`;

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

onMounted(() => {
  document.documentElement.setAttribute("data-theme", theme.value);
  requestAnimationFrame(() => {
    appReady.value = true;
  });
});
</script>

<template>
  <div class="app-shell" :class="{ ready: appReady }">
    <div class="bg-noise" :style="{ backgroundImage: `url(${baseUrl}assets/images/topography.svg)` }"></div>
    <header class="site-header">
      <img :src="logo" alt="Jose Minelli" class="brand" />
      <button class="theme-toggle" @click="toggleTheme" type="button">
        {{ theme === "dark" ? "Light" : "Dark" }}
      </button>
    </header>

    <main class="main-grid">
      <section class="hero-card reveal-item">
        <img :src="profileSrc" alt="Jose Minelli" class="avatar" />
        <p class="eyebrow">{{ hero.role }}</p>
        <h1>{{ hero.name }}</h1>
        <p class="lead">{{ hero.tagline }}</p>

        <div class="cta-row">
          <a :href="`mailto:${hero.email}`">{{ hero.email }}</a>
          <a :href="`tel:${hero.phone}`">{{ hero.phone }}</a>
          <a :href="hero.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>

      <section class="about-card reveal-item">
        <h2>Sobre</h2>
        <p>
          Sou Desenvolvedor Full Stack com foco em Flutter, C#, TypeScript e desenvolvimento mobile,
          com experiencia na criacao de aplicativos, jogos e sistemas web priorizando qualidade e usabilidade.
        </p>
        <p>
          Atualmente atuo na Tecnkisa com modernizacao de sistemas e continuo ampliando projetos autorais
          com .NET e Vue.
        </p>
        <p class="meta">{{ hero.location }}</p>
      </section>

      <section class="workspace-panel reveal-item">
        <nav class="tabs" aria-label="Navegacao de conteudo">
          <button :class="{ active: activeTab === 'projects' }" @click="activeTab = 'projects'" type="button">
            Projetos
          </button>
          <button :class="{ active: activeTab === 'journey' }" @click="activeTab = 'journey'" type="button">
            Trajetoria
          </button>
          <button :class="{ active: activeTab === 'contact' }" @click="activeTab = 'contact'" type="button">
            Contato
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
      <p>Copyright 2026 Jose Minelli. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>
