<script setup>
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { skillsData } from '../data/portfolioData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const activeCategory = ref('backend');

const categories = [
  { id: 'backend', label: 'Backend', color: '#4afbd6' },
  { id: 'frontend', label: 'Frontend', color: '#17b890' },
  { id: 'mobile', label: 'Mobile', color: '#00d4ff' },
  { id: 'gamedev', label: 'Game Dev', color: '#ff6b9d' },
  { id: 'tools', label: 'Tools & DevOps', color: '#ffd700' }
];

const currentSkills = computed(() => {
  return skillsData[activeCategory.value] || [];
});

const chartData = computed(() => {
  const skills = currentSkills.value;
  const color = categories.find(c => c.id === activeCategory.value)?.color || '#4afbd6';

  return {
    labels: skills.map(s => s.name),
    datasets: [
      {
        label: 'Proficiência',
        data: skills.map(s => s.proficiency),
        backgroundColor: color + '40',
        borderColor: color,
        borderWidth: 2,
        borderRadius: 6,
        tension: 0.4
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: { size: 14, weight: 'bold' },
      bodyFont: { size: 13 },
      borderColor: '#4afbd6',
      borderWidth: 1,
      callbacks: {
        label: function(context) {
          return context.parsed.y + '%';
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        color: '#8ca39c',
        font: { family: "'Space Mono', monospace" }
      },
      grid: {
        color: 'rgba(74, 251, 214, 0.1)',
        drawBorder: false
      }
    },
    x: {
      ticks: {
        color: '#8ca39c',
        font: { family: "'Space Mono', monospace", size: 12 }
      },
      grid: {
        display: false,
        drawBorder: false
      }
    }
  }
};

const getCurrentColor = computed(() => {
  return categories.find(c => c.id === activeCategory.value)?.color || '#4afbd6';
});
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
        :style="{ '--btn-color': cat.color }"
      >
        {{ cat.label }}
      </button>
    </div>

    <div class="skills-chart-container">
      <Bar
        :data="chartData"
        :options="chartOptions"
        class="skills-chart"
      />
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
  --btn-color: #4afbd6;
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
  border-color: var(--btn-color);
  color: var(--btn-color);
}

.category-btn.active {
  background: color-mix(in rgb, var(--btn-color) 15%, transparent);
  border-color: var(--btn-color);
  color: var(--btn-color);
  box-shadow: 0 0 20px color-mix(in rgb, var(--btn-color) 20%, transparent);
}

.skills-chart-container {
  padding: 2rem;
  border: 1px solid rgba(74, 251, 214, 0.15);
  border-radius: 12px;
  background: rgba(10, 16, 15, 0.3);
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skills-chart {
  width: 100%;
  max-height: 400px;
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

  .skills-chart-container {
    padding: 1.5rem;
    min-height: 300px;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style>
