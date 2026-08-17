<script setup>
const baseUrl = import.meta.env.BASE_URL;

const resolveImage = (imagePath) => {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return `${baseUrl}${imagePath}`;
};

defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <section class="projects-grid">
    <article
      v-for="(project, index) in items"
      :key="project.title"
      class="project-card reveal-item"
      data-aos="zoom-in-up"
      :data-aos-delay="index * 100"
    >
      <img :src="resolveImage(project.image)" :alt="project.title" class="project-media" />
      <div class="project-body">
        <p class="project-id">PRJ_0{{ index + 1 }}</p>
        <p class="pill-row">
          <span v-for="tag in project.tech" :key="`${project.title}-${tag}`" class="pill">{{ tag }}</span>
        </p>
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <div class="project-footer-row">
          <p class="access-level">ACCESS_LEVEL <span>PUBLIC_VIEW</span></p>
          <a :href="project.primaryUrl" target="_blank" rel="noreferrer" class="project-link">
          {{ project.primaryLabel }}
          </a>
        </div>
      </div>
    </article>
  </section>
</template>
