

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
    swal( " Por favor, ingresa tu nombre. ",{
      icon: "warning",
    });
    return false;
  }

  // Validación del correo electrónico
  if (!formatoCorreo.test(correo)) {
    swal( " Por favor, ingresa un correo electrónico válido. ",{
      icon: "warning",
    });
    return false;
  }

  // Validación de la contraseña
  if (!formatoContrasena.test(contrasena)) {
    swal( " Por favor, ingresa una contraseña de al menos 6 caracteres. ",{
      icon: "warning",
    });
    return false;
  }

  // Validación de la confirmación de contraseña
  if (contrasena !== confirContrasena) {
    swal( " Las contraseñas no coinciden. Por favor, verifica. ",{
      icon: "warning",
    });
    return false;
  }

  // Validación del teléfono
  if (telefono.trim() === '') {
    swal( " Por favor, ingresa tu número de teléfono. ",{
      icon: "warning",
    });
    return false;
  }

  // Validación del número de teléfono (10 dígitos)
  if (telefono.length !== 10 || !(/^\d+$/.test(telefono))) {
    swal( " Por favor, ingresa un número de teléfono válido de 10 dígitos. ",{
      icon: "warning",
    });
    return false;
  }

  // Validación de la dirección de envío
  if (direccionEnvio.trim() === '') {
    swal( " Por favor, ingresa tu dirección de envío. ",{
      icon: "warning",
    });
    return false;
  }
  return true;
}

const datosRegistro = [];

const guardarDatos = (event) => {
  if (validarFormulario()) {
    swal( " ¡Registro Exitoso! ",{
      icon: "success",
    });
    event.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let contra = document.getElementById('contrasena').value;
    let telefono = document.getElementById('telefono').value;


    // Crear un objeto con los datos a guardar
    const datos = {
      nombre: nombre,
      correo: correo,
      contrasena:contra,
      telefono: telefono
    };
    datosRegistro.push(datos);
    console.log(datosRegistro);
    // Guardar los datos en el localStorage como una cadena JSON
    localStorage.setItem('datosRegistro', JSON.stringify(datosRegistro));
  }
}

const mostrarContrasena=()=> {
  let inputContrasena = document.getElementById('contrasena');

  if (inputContrasena.type === 'password') {
    inputContrasena.type = 'text';
  } else {
    inputContrasena.type = 'password';
  }

}

const mostrarContrasena2=()=> {
  let inputConfirContrasena = document.getElementById('confirContrasena');
  if (inputConfirContrasena.type === 'password') {
    inputConfirContrasena.type = 'text';
  } else {
    inputConfirContrasena.type = 'password';
  }
}





