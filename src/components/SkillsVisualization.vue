<script setup>
import { ref, computed } from 'vue';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { skillsData } from '../data/portfolioData';

const activeCategory = ref('backend');

const categories = [
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'gamedev', label: 'Game Dev' },
  { id: 'tools', label: 'Tools & DevOps' }
];

const currentSkills = computed(() => {
  return skillsData[activeCategory.value] || [];
});

const colors = {
  backend: '#4afbd6',
  frontend: '#17b890',
  mobile: '#00d4ff',
  gamedev: '#ff6b9d',
  tools: '#ffd700'
};

const getCurrentColor = computed(() => colors[activeCategory.value]);
</script>

<template>
  <section class="skills-section reveal-item" data-aos="fade-up" data-aos-delay="200">
    <div class="skills-header">
      <h2>Expertise Técnica</h2>
      <p>Domínio em múltiplas stacks e tecnologias</p>
    </div>

    <div class="skills-categories">
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="['category-btn', { active: activeCategory === cat.id }]"
        @click="activeCategory = cat.id"
      >
        {{ cat.label }}
      </button>
    </div>

    <div class="skills-visualization">
      <div class="skills-bars">
        <div
          v-for="skill in currentSkills"
          :key="skill.name"
          class="skill-item"
          :data-aos="`fade-right`"
          :data-aos-delay="`${currentSkills.indexOf(skill) * 50}`"
        >
          <div class="skill-header">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-level">{{ skill.proficiency }}%</span>
          </div>
          <div class="skill-bar">
            <div
              class="skill-fill"
              :style="{
                width: skill.proficiency + '%',
                backgroundColor: getCurrentColor
              }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="skills-stats">
      <div class="stat-card">
        <p class="stat-label">Tecnologias Dominadas</p>
        <p class="stat-value">50+</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Anos de Experiência</p>
        <p class="stat-value">3+</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Linguagens</p>
        <p class="stat-value">8+</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Frameworks</p>
        <p class="stat-value">12+</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  display: grid;
  gap: 2rem;
}

.skills-header {
  display: grid;
  gap: 0.5rem;
}

.skills-header h2 {
  font-size: 1.8rem;
  color: var(--text);
  margin: 0;
}

.skills-header p {
  color: var(--muted);
  font-size: 1rem;
  margin: 0;
}

.skills-categories {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.7rem 1.4rem;
  border: 1px solid rgba(74, 251, 214, 0.2);
  border-radius: 8px;
  background: transparent;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.category-btn:hover {
  border-color: rgba(74, 251, 214, 0.35);
  color: var(--accent);
}

.category-btn.active {
  background: rgba(74, 251, 214, 0.1);
  border-color: rgba(74, 251, 214, 0.5);
  color: var(--accent);
  box-shadow: 0 0 20px rgba(74, 251, 214, 0.2);
}

.skills-visualization {
  padding: 1.5rem;
  border: 1px solid rgba(74, 251, 214, 0.15);
  border-radius: 12px;
  background: rgba(10, 16, 15, 0.3);
}

.skills-bars {
  display: grid;
  gap: 1.5rem;
}

.skill-item {
  display: grid;
  gap: 0.6rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: 0.95rem;
  color: var(--text);
  font-weight: 600;
}

.skill-level {
  font-size: 0.8rem;
  color: var(--accent);
  font-family: var(--mono);
  font-weight: 700;
}

.skill-bar {
  height: 8px;
  background: rgba(74, 251, 214, 0.1);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(74, 251, 214, 0.15);
}

.skill-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 10px currentColor;
}

.skills-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.stat-card {
  padding: 1.2rem;
  border: 1px solid rgba(74, 251, 214, 0.15);
  border-radius: 10px;
  background: rgba(10, 16, 15, 0.3);
  text-align: center;
  transition: var(--transition);
}

.stat-card:hover {
  border-color: rgba(74, 251, 214, 0.3);
  background: rgba(10, 16, 15, 0.5);
  transform: translateY(-2px);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 0.5rem;
  font-weight: 600;
}

.stat-value {
  font-size: 2rem;
  color: var(--accent);
  font-weight: 700;
  font-family: var(--mono);
  margin: 0;
}

@media (max-width: 768px) {
  .skills-categories {
    gap: 0.5rem;
  }

  .category-btn {
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
  }

  .skills-bars {
    gap: 1.2rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style>
