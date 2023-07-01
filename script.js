const section = document.getElementById("modalNovo"),
  section2 = document.getElementById("modalNovo2"),
  closeBtn2 = document.querySelector(".close-btn2"),
  closeBtn = document.querySelector(".close-btn"),
  overlay = document.querySelector(".overlay");

overlay.addEventListener("click", () => section.classList.remove("active"));
closeBtn.addEventListener("click", () => { section.classList.remove("active"); });
closeBtn2.addEventListener("click", () => { section2.classList.remove("active"); });
function mandarEmail() {
  var params = {
    nome: document.getElementById("name").value,
    email: document.getElementById("email").value,
    mensagem: document.getElementById("message").value,
  };
  const nomev = document.getElementById("name").value;
  const emailv = document.getElementById("email").value;
  const mensagemv = document.getElementById("message").value;
  if (nomev == "" || emailv == "" || mensagemv == "") {
    // se tiver vazio
    section.classList.add("active");
  } else if (!emailv.includes("@") || !emailv.includes(".")) {
    //se n for um email
    section.classList.add("active");
  } else {
    section2.classList.add("active");
    const serviceID = "service_mcdvzxc";
    const templateID = "template_ghy15go";

    emailjs.send(serviceID, templateID, params).then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
    });
  }
}