<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  experiences: {
    type: Array,
    required: true
  },
  stack: {
    type: Array,
    required: true
  }
});

const expandedExperience = ref(null);

const initialExpandedIndex = computed(() => {
  return props.experiences.findIndex(exp => exp.expanded === true);
});

const toggleExperience = (index) => {
  expandedExperience.value = expandedExperience.value === index ? null : index;
};

// Atualizar o estado inicial quando as props carregarem
if (initialExpandedIndex.value !== -1) {
  expandedExperience.value = initialExpandedIndex.value;
}
</script>

<template>
  <section class="timeline-block reveal-item">
    <h2>Experiência</h2>

    <div class="experiences-grid">
      <div
        v-for="(item, index) in experiences"
        :key="item.title"
        class="experience-card"
        data-aos="fade-up"
        :data-aos-delay="index * 150"
      >
        <div class="experience-header" @click="toggleExperience(index)">
          <div class="header-left">
            <p class="timeline-period">{{ item.period }}</p>
            <h3>{{ item.title }}</h3>
            <div class="experience-meta">
              <span v-if="item.location" class="meta-tag">{{ item.location }}</span>
              <span v-if="item.type" class="meta-tag">{{ item.type }}</span>
              <span v-if="item.duration" class="meta-tag">{{ item.duration }}</span>
            </div>
          </div>
          <div class="toggle-icon" :class="{ expanded: expandedExperience === index }">
            ▼
          </div>
        </div>

        <div v-if="expandedExperience === index" class="experience-content">
          <p class="summary">{{ item.summary }}</p>

          <div v-if="item.responsibilities" class="responsibilities-section">
            <p class="section-label">Principais Responsabilidades</p>
            <ul class="responsibilities-list">
              <li v-for="(resp, idx) in item.responsibilities" :key="idx">{{ resp }}</li>
            </ul>
          </div>

          <div v-if="item.stack" class="stack-section">
            <p class="section-label">Stack Utilizado</p>
            <div class="experience-stack">
              <span v-for="tech in item.stack" :key="tech" class="tech-badge">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2 class="stack-title">Stack Principal</h2>
    <div class="stack-wrap">
      <span v-for="skill in stack" :key="skill" class="stack-item">{{ skill }}</span>
    </div>
  </section>
</template>
