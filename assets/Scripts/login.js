const jsConfetti = new JSConfetti();
let verificar=false;
const login = (event)=>{
    event.preventDefault();
    if(validardatos()){
    let correo1 = document.getElementById("email").value;
    let contra1 = document.getElementById("contrasena").value;
    const url = 'https://backend-pagina-heladeria-production.up.railway.app/api/usuarios';
    fetch(url)
      .then(response => response.json())
      .then(usuarios =>comparacionLogin(correo1,contra1,usuarios));
  }
}
const comparacionLogin = (correo1,contra1,usuarios)=>{
  for(let i = 0; i < usuarios.length; i++){
    if (correo1 == usuarios[i].emailUsuario && contra1 == usuarios[i].contraseña){
       verificar = true;
      CrearOrden(usuarios[i]);
      localStorage.setItem("AuxOrden", usuarios[i].usuarioId);
     } 
  }
  if (verificar) {     
    confetti(); 
    setTimeout(() => { window.location.href = "../../index.html" }, 2000);
  }else{
    swal( " Usuario no existe, registrate ",{
      icon: "warning",
    });   
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

const mostrarContrasena=()=> {
    let inputContrasena = document.getElementById('contrasena');
  
    if (inputContrasena.type === 'password') {
      inputContrasena.type = 'text';
    } else {
      inputContrasena.type = 'password';
    }
  }

const validardatos=()=>{
    let corr1 = document.getElementById("email").value;
    let cont1 = document.getElementById("contrasena").value;
    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let formatoContrasena = /^.{6,}$/;

    // Validación del correo electrónico
  if (!formatoCorreo.test(corr1)) {
    swal( " Por favor, ingresa un correo electrónico válido. ",{
      icon: "warning",
    });
    return false;
  }
  // Validación de la contraseña
  if (!formatoContrasena.test(cont1)) {
    swal( " Por favor, ingresa una contraseña de al menos 6 caracteres. ",{
      icon: "warning",
    });
    return false;
  }

    if(corr1 =="" || cont1 ==""){
         swal( " Campo vacio ",{
                icon: "warning",
              });
        return false;
    }
    return true;
}
function CrearOrden(datos) {
  console.log(datos);
  fetch('https://backend-pagina-heladeria-production.up.railway.app/api/ordenes', {
    method: "POST",
    body: {
      "usuarioId": 9,
    },
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })}