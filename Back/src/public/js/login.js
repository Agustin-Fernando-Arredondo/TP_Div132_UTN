const botonAutoLogin = document.getElementById("btn-autologin");

const inputEmail = document.getElementById("emailUser");

const inputPassword = document.getElementById("passwordUser");

botonAutoLogin.addEventListener("click", completarFormulario);

function completarFormulario() {
    inputEmail.value = "test@test.com";
    inputPassword.value = "1234";
}