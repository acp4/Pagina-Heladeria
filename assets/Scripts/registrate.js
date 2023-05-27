

function validarFormulario() {
  var nombre = document.getElementById('nombre').value;
  var correo = document.getElementById('correo').value;
  var contrasena = document.getElementById('contrasena').value;
  var confirContrasena = document.getElementById('confirContrasena').value;
  var telefono = document.getElementById('telefono').value;
  var direccionEnvio = document.getElementById('direccionEnvio').value;

  // Expresión regular para validar el formato de correo electrónico
  var formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Expresión regular para validar la contraseña (al menos 6 caracteres)
  var formatoContrasena = /^.{6,}$/;

  // Validación del nombre
  if (nombre.trim() === '') {
    alert('Por favor, ingresa tu nombre.');
    return false;
  }

  // Validación del correo electrónico
  if (!formatoCorreo.test(correo)) {
    alert('Por favor, ingresa un correo electrónico válido.');
    return false;
  }

  // Validación de la contraseña
  if (!formatoContrasena.test(contrasena)) {
    alert('Por favor, ingresa una contraseña de al menos 6 caracteres.');
    return false;
  }

  // Validación de la confirmación de contraseña
  if (contrasena !== confirContrasena) {
    alert('Las contraseñas no coinciden. Por favor, verifica.');
    return false;
  }

  // Validación del teléfono
  if (telefono.trim() === '') {
    alert('Por favor, ingresa tu número de teléfono.');
    return false;
  }

  // Validación del número de teléfono (10 dígitos)
  if (telefono.length !== 10 || !(/^\d+$/.test(telefono))) {
    alert('Por favor, ingresa un número de teléfono válido de 10 dígitos.');
    return false;
  }

  // Validación de la dirección de envío
  if (direccionEnvio.trim() === '') {
    alert('Por favor, ingresa tu dirección de envío.');
    return false;
  }

  // Envío del formulario si todas las validaciones son exitosas
  mostrarVentanaEmergente();
  return true;
}

function guardarDatos() {
  var nombre = document.getElementById('nombre').value;
  var correo = document.getElementById('correo').value;
  var telefono = document.getElementById('telefono').value;

  // Crear un objeto con los datos a guardar
  var datos = {
    nombre: nombre,
    correo: correo,
    telefono: telefono
  };

  // Guardar los datos en el localStorage como una cadena JSON
  localStorage.setItem('datosRegistro', JSON.stringify(datos));
}

function mostrarVentanaEmergente() {
  // Crear un elemento de div para la ventana emergente
  var ventanaEmergente = document.createElement('div');
  ventanaEmergente.className = 'ventana-emergente';
  ventanaEmergente.textContent = 'Registro exitoso';

  // Agregar la ventana emergente al cuerpo del documento
  document.body.appendChild(ventanaEmergente);

  // Lanzar el confetti utilizando la biblioteca confetti-js
  confetti.start();

  // Después de unos segundos, eliminar la ventana emergente y detener el confetti
  setTimeout(function () {
    document.body.removeChild(ventanaEmergente);
    confetti.stop();
    }, 5000);
    }
    
    function mostrarContrasena() {
    var inputContrasena = document.getElementById('contrasena');
    var inputConfirContrasena = document.getElementById('confirContrasena');
    
    if (inputContrasena.type === 'password') {
    inputContrasena.type = 'text';
    } else {
    inputContrasena.type = 'password';
    }
    
    if (inputConfirContrasena.type === 'password') {
    inputConfirContrasena.type = 'text';
    } else {
    inputConfirContrasena.type = 'password';
    }
    }
    
    // Agregar un event listener al botón de validación de formulario
    var botonRegistro = document.getElementById('registroBtn');
    botonRegistro.addEventListener('click', function () {
    if (validarFormulario()) {
    guardarDatos();
    mostrarVentanaEmergente();
    }
    });
    
    
    
    
    
    
