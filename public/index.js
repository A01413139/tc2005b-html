console.log("index.js cargó");

const inputUser = document.getElementById("username");
const inputPass = document.getElementById("password");
const btnEnviar = document.getElementById("btnEnviar");
const btnLimpiar = document.getElementById("btnLimpiar");
const msg = document.getElementById("msg");

const API = "http://localhost:3000";

function showMessage(text, type) {
  msg.textContent = text;
  msg.classList.remove("d-none", "alert-success", "alert-danger", "alert-warning");
  msg.classList.add("alert", `alert-${type}`);
}

btnEnviar.addEventListener("click", async () => {
  const username = inputUser.value.trim();
  const password = inputPass.value;

  if (!username || !password) {
    showMessage("Escribe usuario y contraseña.", "warning");
    return;
  }

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
  localStorage.setItem("token", data.token || "");
  localStorage.setItem("user", JSON.stringify(data.user || data));
  showMessage("Bienvenido " + (data.user?.username || data.username || ""), "success");
      setTimeout(() => window.location.href = "inicio.html", 400);
    } else {
      showMessage(data.error || "Credenciales incorrectas.", "danger");
      inputPass.value = "";
      inputPass.focus();
    }
  } catch (err) {
    showMessage("No se pudo conectar con el servidor.", "danger");
    console.error(err);
  }
});

btnLimpiar.addEventListener("click", () => {
  inputUser.value = "";
  inputPass.value = "";
  msg.classList.add("d-none");
  inputUser.focus();
});