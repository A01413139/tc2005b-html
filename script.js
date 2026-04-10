console.log("script.js cargó");

const username = document.getElementById("username");
const password = document.getElementById("password");
const btnEnviar = document.getElementById("btnEnviar");
const btnLimpiar = document.getElementById("btnLimpiar");
const msg = document.getElementById("msg");

function login() {
  if (username.value === "admin" && password.value === "1234") {
    msg.textContent = "Bienvenido ";
    window.location.href = "perfil.html";
  } else {
    msg.textContent = "Usuario incorrecto ";
  }
}

function limpiar() {
  username.value = "";
  password.value = "";
  msg.textContent = "";
}

btnEnviar.addEventListener("click", login);
btnLimpiar.addEventListener("click", limpiar);