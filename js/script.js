"use strict";

const $themeBtn = document.querySelector("[data-theme-btn]");
const $HTML = document.documentElement,
  nome = document.getElementById("name"),
  email = document.getElementById("email"),
  subject = document.getElementById("subject"),
  message = document.getElementById("message");
let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const webhookUrl =
  "https://discord.com/api/webhooks/1217172560555544578/2IZPH-XR4y7y0OBnht5fJFFY0K4DvbNr0MPYh28fbWNi5EEqUm8RjZt9oC7plfWpmhwq";



if (sessionStorage.getItem("theme")) {
  $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
  $HTML.dataset.theme = isDark ? "dark" : "light";
}

const changeTheme = () => {
  $HTML.dataset.theme =
    sessionStorage.getItem("theme") === "light" ? "dark" : "light";
  sessionStorage.setItem("theme", $HTML.dataset.theme);
};

$themeBtn.addEventListener("click", changeTheme);

const $tabBtn = document.querySelectorAll("[data-tab-btn]");
const sendBtn = document.getElementById("sendBtn");
let [lastActiveTab] = document.querySelectorAll("[data-tab-content]");
let [lastActiveTabBtn] = $tabBtn;

$tabBtn.forEach((item) => {
  item.addEventListener("click", function () {
    lastActiveTab.classList.remove("active");
    lastActiveTabBtn.classList.remove("active");

    const $tabContent = document.querySelector(
      `[data-tab-content="${item.dataset.tabBtn}"]`
    );
    $tabContent.classList.add("active");
    this.classList.add("active");

    lastActiveTab = $tabContent;
    lastActiveTabBtn = this;
  });
});

function exibirAlerta(mensagem, type) {
  const alerta = document.createElement("div");
  alerta.classList.add("alert");
  alerta.textContent = mensagem;
  console.log(type);
  switch (type) {
    case "error":
      alerta.style.backgroundColor = "#ff4d4d";
      alerta.style.boxShadow = "0 0 10px #ff4d4d";
      break;
    case "alert":
      alerta.style.backgroundColor = "#d6d200";
      alerta.style.boxShadow = "0 0 10px #d6d200";
      break;
    default:
      alerta.style.backgroundColor = "#00b300";
      alerta.style.boxShadow = "0 0 10px #00b300";
      break;
  }

  document.body.appendChild(alerta);
  setTimeout(function () {
    alerta.style.animation = "fadeOut .5s";
    setTimeout(function () {
      alerta.remove();
    }, 500);
  }, 5000);
}

sendBtn.addEventListener("click", async () => {
  const payload = {
    content: `> Nova mensagem de **${nome.value}** - ${email.value}
    > **Assunto:** ${subject.value}
    > **Mensagem:** ${message.value}
    `,
  };

  if (!nome.value || !email.value || !subject.value || !message.value) {
    exibirAlerta("Por favor, preencha todos os campos.", "alert");
    return;
  } else if (email.value.indexOf("@") === -1) {
    exibirAlerta("Por favor, informe um e-mail válido.", "alert");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar os dados para o Discord.", "error");
    }

    exibirAlerta("Sua mensagem foi enviada!");
  } catch (error) {
    console.error("Erro:", error);

    exibirAlerta(
      "Ocorreu um erro ao Enviar a mensagem. Por favor, tente novamente mais tarde.",
      "error"
    );
  }
});
