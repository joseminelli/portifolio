<script setup>
defineProps({
  experiences: {
    type: Array,
    required: true
  },
  stack: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <section class="timeline-block reveal-item">
    <h2>Experiencia</h2>
    <ul class="timeline-list">
      <li v-for="item in experiences" :key="item.title" class="timeline-item">
        <p class="timeline-period">{{ item.period }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
      </li>
    </ul>

    <h2>Stack principal</h2>
    <div class="stack-wrap">
      <span v-for="skill in stack" :key="skill" class="stack-item">{{ skill }}</span>
    </div>
  </section>
</template>
