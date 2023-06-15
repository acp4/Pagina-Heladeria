let logStatus= false;
const validarFormulario = () => {
  let nombre = document.getElementById('nombre').value;
  let correo = document.getElementById('correo').value;
  let contrasena = document.getElementById('contrasena').value;
  let confirContrasena = document.getElementById('confirContrasena').value;
  let telefono = document.getElementById('telefono').value;
  let direccionEnvio = document.getElementById('direccionEnvio').value;

  // Expresión regular para validar el formato de correo electrónico
  let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Expresión regular para validar la contraseña (al menos 6 caracteres)
  let formatoContrasena = /^.{6,}$/;

  // Validación del nombre
  if (nombre.trim() === '') {
    swal("Por favor, ingresa tu nombre.", {
      icon: "warning",
    });
    return false;
  }

  // Validación del correo electrónico
  if (!formatoCorreo.test(correo)) {
    swal("Por favor, ingresa un correo electrónico válido.", {
      icon: "warning",
    });
    return false;
  }

  // Validación de la contraseña
  if (!formatoContrasena.test(contrasena)) {
    swal("Por favor, ingresa una contraseña de al menos 6 caracteres.", {
      icon: "warning",
    });
    return false;
  }

  // Validación de la confirmación de contraseña
  if (contrasena !== confirContrasena) {
    swal("Las contraseñas no coinciden. Por favor, verifica.", {
      icon: "warning",
    });
    return false;
  }

  // Validación del teléfono
  if (telefono.trim() === '') {
    swal("Por favor, ingresa tu número de teléfono.", {
      icon: "warning",
    });
    return false;
  }

  // Validación del número de teléfono (10 dígitos)
  if (telefono.length !== 10 || !(/^\d+$/.test(telefono))) {
    swal("Por favor, ingresa un número de teléfono válido de 10 dígitos.", {
      icon: "warning",
    });
    return false;
  }

  // Validación de la dirección de envío
  if (direccionEnvio.trim() === '') {
    swal("Por favor, ingresa tu dirección de envío.", {
      icon: "warning",
    });
    return false;
  }
  return true;
}

const jsConfetti = new JSConfetti();

const guardarDatos = (event) => {
  event.preventDefault();
  if (validarFormulario()) {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let contra = document.getElementById('contrasena').value;
    let telefono = document.getElementById('telefono').value;
    let direccion = document.getElementById('direccionEnvio').value;
    // Crear un objeto con los datos a guardar
    const datos = {
      nombreUsuario: nombre,
      emailUsuario: correo,
      contraseña:contra,
      telefono: telefono,
      ubicacion: direccion
    };
    // Solicitud Post
    crearUsuario(JSON.stringify(datos));
    confetti(); 
    localStorage.setItem('LogStatus', JSON.stringify(true));
    setTimeout(() => { window.location.href = "../../index.html" }, 2000);
  }
}



const confetti = async () => {
  try {
    await jsConfetti.addConfetti({
      emojis: ['🍧', '🍦', '🍨'],
      emojiSize: 50,
      confettiNumber: 50,
    });
  } catch (error) {
    console.error(error);
  }
}

const mostrarContrasena = () => {
  let inputContrasena = document.getElementById('contrasena');

  if (inputContrasena.type === 'password') {
    inputContrasena.type = 'text';
  } else {
    inputContrasena.type = 'password';
  }
}

const mostrarContrasena2 = () => {
  let inputConfirContrasena = document.getElementById('confirContrasena');
  if (inputConfirContrasena.type === 'password') {
    inputConfirContrasena.type = 'text';
  } else {
    inputConfirContrasena.type = 'password';
  }
}

function crearUsuario(datos) {
  console.log (datos);
  fetch('http://localhost:8080/api/usuarios/signup', {
    method: "POST",
    body: datos,
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(error=>console.log(error));
}

let inputs = document.querySelectorAll("form input");
inputs.forEach(function (input) {
  let span = document.createElement("span");
  span.classList.add("valid-icon");
  input.parentNode.insertBefore(span, input.nextSibling);
});


