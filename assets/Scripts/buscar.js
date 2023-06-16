const buscarProductos = (event) => {
  event.preventDefault();
  productos();
  window.location.href = "./buscar-productos.html"
  
}

const buscarProductosIndex = (event) => {
  event.preventDefault();
  productos();
  window.location.href = "./assets/html/buscar-productos.html"

}

function productos() {
  let datos = document.getElementById('busquedaProducto').value.toLowerCase();
  localStorage.setItem("busuedaLosReyes", datos);

}