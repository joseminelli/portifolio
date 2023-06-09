function CustomAlert() {
  this.alert = function (message, title) {
    document.body.innerHTML =
      document.body.innerHTML +
      '<div id="overlay" class="animado"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="alertHeader"></div><div id="alertBody"></div><div id="alertFooter"></div></div></div>';

    let overlay = document.getElementById("overlay");
    let dialogbox = document.getElementById("dialogbox");

    let winH = window.innerHeight;
    overlay.style.height = winH + "px";

    overlay.style.display = "block";
    dialogbox.style.display = "block";

    document.getElementById("alertHeader").style.display = "block";

    if (typeof title === "undefined") {
      document.getElementById("alertHeader").style.display = "none";
    } else {
      document.getElementById("alertHeader").innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
    }
    document.getElementById("alertBody").innerHTML = message;
    document.getElementById("alertFooter").innerHTML =
      '<button class="pure-material-button-contained active" onclick="customAlert.ok()">OK</button>';
  };

  this.ok = function () {
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  };
}

let customAlert = new CustomAlert();

function CustomAlertWait() {
    this.alert = function (message, title) {
      document.body.innerHTML =
        document.body.innerHTML +
        '<div id="overlay" class="animado"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="alertHeader"></div><div id="alertBody"></div><div id="alertFooter"></div></div></div>';
  
      let overlay = document.getElementById("overlay");
      let dialogbox = document.getElementById("dialogbox");
  
      let winH = window.innerHeight;
      overlay.style.height = winH + "px";
  
      overlay.style.display = "block";
      dialogbox.style.display = "block";
  
      document.getElementById("alertHeader").style.display = "block";
  
      if (typeof title === "undefined") {
        document.getElementById("alertHeader").style.display = "none";
      } else {
        document.getElementById("alertHeader").innerHTML =
          '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
      }
      document.getElementById("alertFooter").innerHTML = '';
      document.getElementById("alertBody").innerHTML = message + '<p class="dot one">.</p><p class="dot two">.</p><p class="dot three">.</p>';
    };
  
    this.ok = function () {
      document.getElementById("dialogbox").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    };
  }

  let customAlertWait = new CustomAlertWait();

function mandarEmail() {
  var params = {
    nome: document.getElementById("name").value,
    email: document.getElementById("email").value,
    mensagem: document.getElementById("message").value,
  };

  customAlertWait.alert("Estamos enviando seu email", "Aguarde");
  setTimeout(() => {customAlert.alert("Seu email foi enviado", "Sucesso!");},4000);
  

  const serviceID = "service_mcdvzxc";
  const templateID = "template_ghy15go";

  emailjs
  .send(serviceID, templateID, params)
  .then((res) => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    console.log(res);
  });
}
