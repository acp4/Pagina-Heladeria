const API = async () => {

  let datos = localStorage.getItem("busuedaLosReyes");
  console.log(datos);
  await fetch(`http://localhost:8080/api/productos/buscar/${datos}`, {
  })
  .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(error => console.log(error)); 
  
  localStorage.removeItem("busuedaLosReyes");
  
}

API();