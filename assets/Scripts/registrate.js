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
    mostrarAlerta('Por favor, ingresa tu nombre.', 'warning');
    return false;
  }

  // Validación del correo electrónico
  if (!formatoCorreo.test(correo)) {
    mostrarAlerta('Por favor, ingresa un correo electrónico válido.', 'warning');
    return false;
  }

  // Validación de la contraseña
  if (!formatoContrasena.test(contrasena)) {
    mostrarAlerta('Por favor, ingresa una contraseña de al menos 6 caracteres.', 'warning');
    return false;
  }

  // Validación de la confirmación de contraseña
  if (contrasena !== confirContrasena) {
    mostrarAlerta('Las contraseñas no coinciden. Por favor, verifica.', 'warning');
    return false;
  }

  // Validación del teléfono
  if (telefono.trim() === '') {
    mostrarAlerta('Por favor, ingresa tu número de teléfono.', 'warning');
    return false;
  }

  // Validación del número de teléfono (10 dígitos)
  if (telefono.length !== 10 || !(/^\d+$/.test(telefono))) {
    mostrarAlerta('Por favor, ingresa un número de teléfono válido de 10 dígitos.', 'warning');
    return false;
  }

  // Validación de la dirección de envío
  if (direccionEnvio.trim() === '') {
    mostrarAlerta('Por favor, ingresa tu dirección de envío.', 'warning');
    return false;
  }
  
  return true;
}

const mostrarAlerta = (mensaje, tipo) => {
  swal(mensaje, {
    icon: tipo,
  });
}

const guardarDatos = (event) => {
  event.preventDefault();
  
  if (validarFormulario()) {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let contrasena = document.getElementById('contrasena').value;
    let telefono = document.getElementById('telefono').value;
    let direccionEnvio = document.getElementById('direccionEnvio').value;

    // Crear un objeto con los datos a guardar
    const datos = {
      nombre: nombre,
      correo: correo,
      contrasena: contrasena,
      telefono: telefono,
      direccionEnvio: direccionEnvio
    };
    
    // Guardar los datos en el localStorage como una cadena JSON
    const datosRegistro = localStorage.getItem('datosRegistro') ? JSON.parse(localStorage.getItem('datosRegistro')) : [];
    datosRegistro.push(datos);
    localStorage.setItem('datosRegistro', JSON.stringify(datosRegistro));
    
    // Mostrar mensaje de éxito
    mostrarAlerta('Registro exitoso. ¡Bienvenido!', 'success');
    
    // Limpiar el formulario
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('contrasena').value = '';
    document.getElementById('confirContrasena').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('direccionEnvio').value = '';
  }
}

const mostrarContrasena = () => {
  let contrasenaInput = document.getElementById('contrasena');
  contrasenaInput.type = (contrasenaInput.type === 'password') ? 'text' : 'password';
}

const mostrarContrasena2 = () => {
  let confirContrasenaInput = document.getElementById('confirContrasena');
  confirContrasenaInput.type = (confirContrasenaInput.type === 'password') ? 'text' : 'password';
}
