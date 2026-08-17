<script setup>
import { reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: ""
});

const sendMail = () => {
  const subject = encodeURIComponent(form.subject || `Contato via portfolio - ${form.name}`);
  const body = encodeURIComponent(
    `Nome: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
  );
  window.location.href = `mailto:joseminelli04@gmail.com?subject=${subject}&body=${body}`;
};
</script>

<template>
  <section class="contact-grid reveal-item">
    <article class="contact-card">
      <h2>Contato direto</h2>
      <p>Se quiser falar sobre produto, games ou uma vaga, me chama:</p>
      <a href="mailto:joseminelli04@gmail.com">joseminelli04@gmail.com</a>
      <a href="mailto:minellidev@gmail.com">minellidev@gmail.com</a>
      <a href="tel:+5531996202307">+55 (31) 99620-2307</a>
      <a href="https://github.com/joseminelli" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.instagram.com/joseminelli_/" target="_blank" rel="noreferrer">Instagram</a>
    </article>

    <form class="contact-form" @submit.prevent="sendMail">
      <input v-model="form.name" type="text" placeholder="Nome" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.subject" type="text" placeholder="Assunto" />
      <textarea v-model="form.message" placeholder="Mensagem" rows="5" required />
      <button type="submit">Enviar mensagem</button>
    </form>
  </section>
</template>
