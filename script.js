function mandarEmail() {
  var params = {
    nome: document.getElementById("name").value,
    email: document.getElementById("email").value,
    mensagem: document.getElementById("message").value,
  };

  const serviceID = "service_mcdvzxc";
  const templateID = "template_ghy15go";
  
  emailjs
  .send(serviceID, templateID, params)
  .then((res) => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    console.log(res);
    alert("Mensagem enviada");
  });
}