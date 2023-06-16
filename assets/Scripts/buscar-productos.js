const busquedaTexto = document.getElementById('datos-buscados');

const heladosContenedorP = document.getElementById('contenedor-helados-premium');
const heladosContenedor = document.getElementById('contenedor-helados');
const paletasContenedor = document.getElementById('contenedor-paletas');
const aguasContenedor = document.getElementById('contenedor-aguas');

const API = () => {

  let datos = localStorage.getItem("busuedaLosReyes");
  fetch(`https://backend-pagina-heladeria-production.up.railway.app/api/productos/buscar/${datos}`, {
  })
    .then(response => response.json())
    .then(productos => {
      imprimirProductos(productos)
      if(datos != null)
      busquedaTexto.innerText = `Resultados de: "${datos}" (${productos.length})`;
      else 
      busquedaTexto.innerText = `Ingresa una busqueda en el navbar`; 
    });
  
  localStorage.removeItem("busuedaLosReyes");
  
}
const imprimirProductos = (productos) => {
  // Obtener el carrito del Local Storage (si existe)
  let carrito = localStorage.getItem('carrito');
  let productosCarrito = [];

  // Si el carrito ya existe en el Local Storage, convertirlo en un array
  if (carrito) {
    productosCarrito = JSON.parse(carrito);
  }

  productos.forEach((producto) => {
    let categoria = producto.categoriaProducto;
    let nombreI = producto.nombreProducto;
    let precioI = producto.precioProducto;
    let imagenI = producto.imagenProducto;
    let idI = producto.productoId;

    let enCarrito = productosCarrito.some((p) => p.nombre === nombreI);

    let productoEnArray = document.createElement('div');
    productoEnArray.setAttribute("class", "mt-2 col-sm-6 col-lg-4 pIndividual");
    productoEnArray.innerHTML = `
        <div class="image-container-products ">
          <img src="${imagenI}" width="220" height="240" alt="Foto helado chocolate" 
          onclick="openModal('${idI}')" data-toggle="modal" data-target="#myModal" >
        </div>
        <div class="nombre-producto"> ${nombreI}</div>
        <div class="precio-producto">$ ${precioI}/L</div>
        <button id="boton-carrito-${idI}" class="boton-agregar" onclick="añadirAlCarrito('${idI}')">
          ${enCarrito ? 'Ya en tu carrito' : '<i class="bi bi-cart-plus-fill"></i>'}
        </button>
      `;

    if (categoria === 1) {
      heladosContenedor.appendChild(productoEnArray);
    } else if (categoria === 3) {
      paletasContenedor.appendChild(productoEnArray);
    } else if (categoria === 4) {
      aguasContenedor.appendChild(productoEnArray);
    } else {
      heladosContenedorP.appendChild(productoEnArray);
    }
  });
};

let productosCarrito = [];

// --------------FUNCIÓN DEL CARRITO 
function añadirAlCarrito(productId) {
  let idCliente = localStorage.getItem('auxOrden');
  if (carrito) {
    productosCarrito = JSON.parse(carrito);

    if (productosCarrito.some((item) => item.id == productId)) {
      document.querySelector(`#boton-carrito-${productId}`).textContent = 'Ya en tu carrito';
      
      console.log("Elemento existen el localStorage")
    } else {
      console.log('Elemento no existe en local')
      const product = productos.find((element) => {
        return element.id === productId;
      });
      productosCarrito.push({ ...product, cantidad: 1 })
      console.log(productosCarrito);
      localStorage.setItem('carrito', JSON.stringify(productosCarrito));
    }
  } else {
    console.log('No hay datos en el local storage')
    const product = productos.find((element) => {
      return element.id === productId;
    });
    productosCarrito.push({ ...product, cantidad: 1 })
    console.log(productosCarrito);
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
  }

}




// ---------------------Funcion MODAL

async function openModal(productId) {
  let modal = document.getElementById('myModal');
  let descripcionProducto1 = document.getElementById('descripcion-producto');

  // Find the product by its ID
  const url =`https://backend-pagina-heladeria-production.up.railway.app/api/productos/${productId}`;
  let product = await fetch(url).then(response => response.json());

  // Update the modal content
  document.getElementById('nombre-producto').textContent = product.nombreProducto;
  descripcionProducto1.textContent = product.descripcionProducto;

  modal.style.display = 'block';
}

API();