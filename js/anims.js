var driftTimer;
var animando = false;
var zerinho = false;
var startTime;
var zerinhotimer;

document
  .querySelector(".QuantumDrive")
  .addEventListener("mouseover", function () {
    if (animando) return;
    animando = true;

    clearTimeout(driftTimer);
    var driftElement = document.querySelector(".drift");
    driftElement.classList.remove("return", "zerinho");
    driftElement.classList.add("hover");

    zerinhotimer = setTimeout(function () {
        zerinho = true;
        driftElement.classList.add("zerinho");
    }, 1000);

    startTime = performance.now();
  });

document.querySelector(".QuantumDrive").addEventListener("mouseout", function () {
    if (!animando) return;

    var driftElement = document.querySelector(".drift");

    var animationDuration =
      parseFloat(getComputedStyle(driftElement).animationDuration) * 1000;

    var animationDelay =
      parseFloat(getComputedStyle(driftElement).animationDelay) * 1000;
    var currentTime = performance.now();
    var elapsedTime = currentTime - (animationDelay + startTime);

    var zerinhoDuration = animationDuration - elapsedTime;

    if (!zerinho) {
        StopZerinhoTimer();
        console.log("não zerinho");
        driftTimer = setTimeout(function () {
                driftElement.classList.add("return");
                setTimeout(function () {
                    animando = false;
                }, 1000);
            }, zerinhoDuration);
    }else{
        driftTimer = setTimeout(function () {
                    driftElement.classList.remove("zerinho");
                    driftElement.classList.remove("hover");
                    driftElement.classList.add("zerinho");
                    setTimeout(function () {
                    driftElement.classList.remove("zerinho");
                    driftElement.classList.add("return");
                    setTimeout(function () {
                        animando = false;
                        zerinho = false;
                    }, 1000);
                }, zerinhoDuration);
            }, 1000);
        }
    });

    function StopZerinhoTimer() {
        clearTimeout(zerinhotimer);
      }

var pawTimer;
var animandoPaw = false;

document
  .querySelector(".AdoteSuaPatinha")
  .addEventListener("mouseover", function () {
    if (animandoPaw) return;
    animandoPaw = true;

    clearTimeout(pawTimer);

    document.querySelectorAll(".paw").forEach(function (paw, index) {
      var delay = (index + 1) * 500;
      setTimeout(function () {
        paw.classList.remove("remove");
        paw.classList.add("reveal");
      }, delay);
    });
  });
//testee

document
  .querySelector(".AdoteSuaPatinha")
  .addEventListener("mouseout", function () {
    clearTimeout(pawTimer);

    var paws = document.querySelectorAll(".paw");
    setTimeout(function () {
      for (var i = paws.length - 1; i >= 0; i--) {
        var paw = paws[paws.length - i - 1];
        var delay = (paws.length - i) * 500;
        removePawWithDelay(paw, delay);
      }
    }, 1000);

    pawTimer = setTimeout(function () {
      animandoPaw = false;
    }, 2500);
  });

function removePawWithDelay(paw, delay) {
  setTimeout(function () {
    paw.classList.remove("reveal");
    paw.classList.add("remove");
  }, delay);
}
