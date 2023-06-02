const heladosContenedorP = document.getElementById('contenedor-helados-premium');
const heladosContenedor = document.getElementById('contenedor-helados');
const paletasContenedor = document.getElementById('contenedor-paletas');
const aguasContenedor = document.getElementById('contenedor-aguas');

const imprimirProductos = () => {
    // Obtener el carrito del Local Storage (si existe)
    let carrito = localStorage.getItem('carrito');
    let productosCarrito = [];
  
    // Si el carrito ya existe en el Local Storage, convertirlo en un array
    if (carrito) {
      productosCarrito = JSON.parse(carrito);
    }
  
    productos.forEach((producto) => {
      let categoria = producto.categoria;
      let nombreI = producto.nombre;
      let precioI = producto.precio;
      let imagenI = producto.url;
      let idI = producto.id;
  
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
  
      if (categoria === "helados") {
        heladosContenedor.appendChild(productoEnArray);
      } else if (categoria === "paletas") {
        paletasContenedor.appendChild(productoEnArray);
      } else if (categoria === "aguas") {
        aguasContenedor.appendChild(productoEnArray);
      } else {
        heladosContenedorP.appendChild(productoEnArray);
      }
    });
  };
  


// --------------FUNCIÓN DEL CARRITO 
function añadirAlCarrito(productId) {

    let product = productos.find(function (p) {
      return p.id === productId;
    });

    let nombre = product.nombre;
    let precio = product.precio;

    let carrito = localStorage.getItem('carrito');
    let productosCarrito = [];

    if (carrito) {
      productosCarrito = JSON.parse(carrito);
    }

    productosCarrito.push({ nombre, precio });
  
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
  

    document.querySelector(`#boton-carrito-${productId}`).textContent = 'Ya en tu carrito';
  }
  



// ---------------------Funcion MODAL

function openModal(productId) {
    let modal = document.getElementById('myModal');
    let descripcionProducto = document.getElementById('descripcion-producto');

    // Find the product by its ID
    let product = productos.find(function (p) {
      return p.id === productId;
    });

    // Update the modal content
    document.getElementById('nombre-producto').textContent = product.nombre;
    descripcionProducto.textContent = product.descripcion;

    modal.style.display = 'block';
  }

const productos = [
    {
        id: "1",
        categoria: "helados",
        nombre: "Chocolate",
        descripcion:"Sumérgete en un mundo de tentación y placer con el helado de chocolate. Este exquisito manjar combina la riqueza y suavidad del chocolate más fino con la cremosidad de un helado artesanal. Cada cucharada te envuelve en un deleite sedoso y indulgente que hace derretir tu paladar. Disfruta de la intensidad y el sabor profundo del chocolate, mientras se desliza suavemente en tu boca, despertando todos tus sentidos. El helado de chocolate es el regalo perfecto para los amantes del dulce, una delicia irresistible que te transportará a un mundo de satisfacción absoluta. Así que, déjate llevar por esta indulgencia suprema y presume de tu elección con cada bocado lleno de placer.",
        precio: "35",
        url: "../image/imgs-helado/helado_choco.png",
    },
    {
        id: "2",
        categoria: "helados",
        nombre: "Oreo",
        descripcion: "Sumérgete en un placer celestial con el helado de galleta Oreo. Combina la suavidad del helado más delicado con el crujiente sabor de las icónicas galletas Oreo. Cada cucharada te ofrece una experiencia de texturas y sabores irresistibles. ¡Disfruta de este capricho delicioso y presume de tu elección única!",
        precio: "35",
        url: "../image/imgs-helado/helado_oreo.png",
    },
    {
        id: "3",
        categoria: "helados",
        nombre: "Vainilla",
        descripcion: "Es de vainilla",
        precio: "35",
        url: "../image/imgs-helado/helado_vainilla.png",
    },

    {
        id: "4",
        categoria: "helados premium",
        nombre: "Baileys",
        descripcion: "Es de Premium Baileys",
        precio: "45",
        url: "../image/imgs-helado/helado_baileys.png",
    },

    {
        id: "5",
        categoria: "helados premium",
        nombre: "Ferrero",
        descripcion: "Es de Premium Ferrero",
        precio: "45",
        url: "../image/imgs-helado/heladoP_ferrero.png",
    },
    {   id: "6",
        categoria: "helados premium",
        nombre: "M&M",
        descripcion: "Es de Premium Mandm",
        precio: "45",
        url: "../image/imgs-helado/heladoP_M&M.png",
    },


    {   
        id: "7",
        categoria: "paletas",
        nombre: "Maracuya",
        descripcion: "Es paleta de maracuya",
        precio: "35",
        url: "../image/imgs-paletas/maracuya.png",
    },
    {   
        id: "8",
        categoria: "paletas",
        nombre: "Oreo",
        descripcion: "Es paleta de galleta oreo",
        precio: "35",
        url: "../image/imgs-paletas/paleta-oreo.png",
    },
    {   
        id: "9",
        categoria: "paletas",
        nombre: "Fresa",
        descripcion: "Es paleta de fresa",
        precio: "35",
        url: "../image/imgs-paletas/paleta-fresa.png",
    },

    {   
        id: "10",
        categoria: "paletas",
        nombre: "Nuez",
        descripcion: "Es paleta de nuez",
        precio: "45",
        url: "../image/imgs-paletas/paleta-nuez.png",
    },
    {
        id: "11",
        categoria: "paletas",
        nombre: "Chocolate",
        descripcion: "Es de chocolate",
        precio: "35",
        url: "../image/imgs-paletas/chocolate.png",
    },

    {   
        id: "12",
        categoria: "aguas",
        nombre: "Jamaica",
        descripcion: "Es paleta de galleta oreo",
        precio: "35",
        url: "../image/imgs-aguas/agua_jamaica.png",
    },
    {
        id: "13",
        categoria: "aguas",
        nombre: "Mango",
        descripcion: "Es paleta de fresa",
        precio: "35",
        url: "../image/imgs-aguas/agua_mango.png",
    },

    {
        id: "14",
        categoria: "aguas",
        nombre: "Kiwi",
        descripcion: "Es paleta de nuez",
        precio: "45",
        url: "../image/imgs-aguas/agua_kiwi.png",
    },
    {
        id: "15",
        categoria: "aguas",
        nombre: "Limón con chía",
        descripcion: "Es de chocolate",
        precio: "35",
        url: "../image/imgs-aguas/agua_limonC.png",
    }

    
]


document.addEventListener('DOMContentLoaded', () => {
    imprimirProductos();
  }); 