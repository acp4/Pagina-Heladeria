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
  
      if (categoria === "Helados") {
        heladosContenedor.appendChild(productoEnArray);
      } else if (categoria === "Paletas") {
        paletasContenedor.appendChild(productoEnArray);
      } else if (categoria === "Aguas") {
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
        categoria: "Helados",
        nombre: "Chocolate",
        descripcion:"Sumérgete en un mundo de tentación y placer con el helado de chocolate. Este exquisito manjar combina la riqueza y suavidad del chocolate más fino con la cremosidad de un helado artesanal. Cada cucharada te envuelve en un deleite sedoso y indulgente que hace derretir tu paladar. Disfruta de la intensidad y el sabor profundo del chocolate, mientras se desliza suavemente en tu boca, despertando todos tus sentidos. El helado de chocolate es el regalo perfecto para los amantes del dulce, una delicia irresistible que te transportará a un mundo de satisfacción absoluta.",
        precio: "35",
        url: "https://i.postimg.cc/nh1x6F9K/helado-choco.png",//../image/imgs-helado/helado_choco.png
    },
    {
        id: "2",
        categoria: "Helados",
        nombre: "Oreo",
        descripcion: "Sumérgete en un placer celestial con el helado de galleta Oreo. Combina la suavidad del helado más delicado con el crujiente sabor de las icónicas galletas Oreo. Cada cucharada te ofrece una experiencia de texturas y sabores irresistibles. ¡Disfruta de este capricho delicioso y presume de tu elección única!",
        precio: "35",
        url: "https://i.postimg.cc/85YfMB1C/helado-oreo.png"//"../image/imgs-helado/helado_oreo.png",
    },
    {
        id: "3",
        categoria: "Helados",
        nombre: "Vainilla",
        descripcion: "El clásico sabor de la vainilla se eleva a nuevas alturas en nuestro helado. Su textura suave y cremosa, junto con su exquisito sabor a vainilla, lo convierten en una elección atemporal y satisfactoria para los amantes de los helados tradicionales.",
        precio: "35",
        url: "https://i.postimg.cc/hv7zrzj1/helado-vainilla.png",
    },
    {
        id: "4",
        categoria: "Helados premium",
        nombre: "Baileys",
        descripcion: " Sumérgete en una experiencia indulgente con nuestro helado Baileys. Con su suave y sedosa base de helado con sabor a licor de crema irlandesa, este postre te consentirá con su inigualable dulzura y sofisticación.",
        precio: "45",
        url: "https://i.postimg.cc/1tXN8Y1T/helado-baileys.png"//"../image/imgs-helado/helado_baileys.png",
    },

    {
        id: "5",
        categoria: "Helados premium",
        nombre: "Ferrero",
        descripcion: "Experimenta la perfección del chocolate y las avellanas en nuestro helado Ferrero. Con su combinación irresistible de helado de avellana y trozos de chocolate Ferrero Rocher, este helado es un verdadero placer para los amantes del chocolate y los frutos secos.",
        precio: "45",
        url: "https://i.postimg.cc/7b8CQHJ8/helado-P-ferrero.png"//"../image/imgs-helado/heladoP_ferrero.png",
    },
    {   id: "6",
        categoria: "Helados premium",
        nombre: "M&M",
        descripcion: "Disfruta de la deliciosa combinación de helado cremoso y crujientes trozos de chocolate M&M. Este exquisito helado te brindará una explosión de sabores y texturas que deleitará tus sentidos.",
        precio: "45",
        url: "https://i.postimg.cc/dV9BdXgt/helado-P-M-M.png"//"../image/imgs-helado/heladoP_M&M.png",
    },


    {   
        id: "7",
        categoria: "Paletas",
        nombre: "Maracuya",
        descripcion: "Refréscate con nuestra paleta de maracuyá, un delicioso y tropical helado en forma de paleta. Su sabor vibrante y ácido te transportará a exóticos paisajes tropicales, ofreciéndote un momento refrescante y lleno de energía.",
        precio: "35",
        url: "https://i.postimg.cc/nr0FqnKG/maracuya.png" //"../image/imgs-paletas/maracuya.png"
    },
    {   
        id: "8",
        categoria: "Paletas",
        nombre: "Oreo",
        descripcion: "Sumérgete en la delicia crujiente de nuestra paleta de Oreo. Con trozos de galletas Oreo mezclados en una base de helado cremoso, esta paleta es un sueño hecho realidad para los amantes de las galletas y el helado, brindando una experiencia dulce y satisfactoria.",
        precio: "35",
        url: "https://i.postimg.cc/Kz7vvPRV/paleta-oreo.png"//"../image/imgs-paletas/paleta-oreo.png"
    },
    {   
        id: "9",
        categoria: "Paletas",
        nombre: "Fresa",
        descripcion: "Disfruta de la frescura y la dulzura natural de nuestra paleta de fresa. El intenso sabor a fresas maduras se combina con la textura suave y cremosa del helado, creando una paleta irresistible que te hará querer saborearla una y otra vez.",
        precio: "35",
        url: "https://i.postimg.cc/Ls18GKRm/paleta-fresa.png" //"../image/imgs-paletas/paleta-fresa.png"
    },

    {   
        id: "10",
        categoria: "Paletas",
        nombre: "Nuez",
        descripcion: " Descubre el sabor crujiente y lleno de carácter de nuestra paleta de nuez. Con trozos generosos de nueces tostadas en cada bocado, esta paleta te brinda una experiencia llena de texturas y un sabor auténtico que satisfará tus antojos de nuez de manera deliciosa.",
        precio: "45",
        url: "https://i.postimg.cc/Y9BCHnqY/paleta-nuez.png" //"../image/imgs-paletas/paleta-nuez.png",
    },
    {
        id: "11",
        categoria: "Paletas",
        nombre: "Chocolate",
        descripcion: "Sumérgete en la indulgencia absoluta con nuestra paleta de chocolate. Cada mordisco es una explosión de sabor a chocolate intenso y cremoso que te hará disfrutar de un verdadero placer chocolatoso. Una opción clásica que nunca pasa de moda y que deleitará a los amantes del chocolate en todas sus formas.",
        precio: "35",
        url: "https://i.postimg.cc/RhMC3Wt0/chocolate.png"//"../image/imgs-paletas/chocolate.png"
    },

    {   
        id: "12",
        categoria: "Aguas",
        nombre: "Jamaica",
        descripcion: " Refréscate con nuestra agua de Jamaica, una deliciosa bebida elaborada a partir de las flores de hibisco. Con su distintivo color rojo y sabor ligeramente ácido, esta agua te brinda una experiencia refrescante y tropical que te transportará a las cálidas tierras de México.",
        precio: "35",
        url: "https://i.postimg.cc/5jK8KdJw/agua-jamaica.png"//"../image/imgs-aguas/agua_jamaica.png"
    },
    {
        id: "13",
        categoria: "Aguas",
        nombre: "Mango",
        descripcion: "Sumérgete en la dulzura tropical de nuestra agua de mango. El jugo natural de mangos maduros se combina con agua para crear una bebida refrescante y llena de sabor. Cada sorbo te transportará a playas paradisíacas y te brindará un momento de puro disfrute.",
        precio: "35",
        url: "https://i.postimg.cc/9r4Zv8Xs/agua-mango.png"//"../image/imgs-aguas/agua_mango.png"
    },

    {
        id: "14",
        categoria: "Aguas",
        nombre: "Kiwi",
        descripcion: " Descubre la frescura y el sabor jugoso de nuestra agua de kiwi. Con su vibrante color verde y su sabor dulce y ligeramente ácido, esta bebida te brinda una experiencia refrescante y llena de vitalidad. Cada sorbo te conectará con la energía revitalizante de esta exótica fruta",
        precio: "45",
        url: "https://i.postimg.cc/crVwZRrC/agua-kiwi.png"//"../image/imgs-aguas/agua_kiwi.png"
    },
    {
        id: "15",
        categoria: "Aguas",
        nombre: "Limón con chía",
        descripcion: "Disfruta de la combinación revitalizante de limón con chía en nuestra refrescante agua. El jugo de limón recién exprimido se mezcla con las semillas de chía para crear una bebida refrescante y llena de beneficios para la salud. Cada sorbo te hidratará y te brindará una sensación revitalizante.",
        precio: "35",
        url: "https://i.postimg.cc/NLj1xG3s/agua-limon-C.png" //"../image/imgs-aguas/agua_limonC.png"
    },
    

    
]


document.addEventListener('DOMContentLoaded', () => {
    imprimirProductos();
  }); 