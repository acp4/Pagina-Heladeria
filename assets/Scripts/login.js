
const login = (event)=>{
    event.preventDefault();
    if(validardatos()){
    let correo1 = document.getElementById("email").value;
    let contra1 = document.getElementById("contrasena").value;
    miStorage = window.localStorage;
    let clave = miStorage.key(0);
    let usuarios = JSON.parse(localStorage.getItem(clave));
    console.log(usuarios);
    let verificar=false;
    for(let i = 0; i < usuarios.length; i++){
        if (correo1 == usuarios[i].correo && contra1 == usuarios[i].contrasena){
           verificar = true;
         } 
      }
      if(verificar){       
         swal( " Inicio de sesión ",{
            icon: "success",
           }); 
           window.location.href="../../index.html";
      }else{
        swal( " Usuario no existe, registrate ",{
          icon: "warning",
        }); 
    } 
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

const validardatos=()=>{
    let correo1 = document.getElementById("email").value;
    let contra1 = document.getElementById("contrasena").value;
    
    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let formatoContrasena = /^.{6,}$/;

    // Validación del correo electrónico
  if (!formatoCorreo.test(correo1)) {
    swal( " Por favor, ingresa un correo electrónico válido. ",{
      icon: "warning",
    });
    return false;
  }
  // Validación de la contraseña
  if (!formatoContrasena.test(contra1)) {
    swal( " Por favor, ingresa una contraseña de al menos 6 caracteres. ",{
      icon: "warning",
    });
    return false;
  }

    if(correo1 =="" || contra1 ==""){
         swal( " Campo vacio ",{
                icon: "warning",
              });
        return false;
    }
    return true;
}

