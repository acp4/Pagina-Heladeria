const carritoContainer = document.getElementById('carrito-container');
let cartProducts = getProducts();
const precioTotalProductos = document.getElementById("precio-total-productos"); 
const precioEnvio = document.getElementById("precio-envio"); 
const precioSubtotal = document.getElementById("precio-subtotal"); 
let  precioEnvioRandom = 100;
const btnContinuarCompra = document.getElementById('btn-continuar-compra');
const emptyCarDiv = document.getElementById('empty-car');
const formaDePagoDiv = document.getElementById('forma-de-pago');
const resumenDeCompraDiv = document.getElementById('resumen-de-compra');

if(cartProducts.length === 0 ){
    // emptyCart();
}

function emptyCart(){
    precioTotalProductos.innerHTML = 'Aquí verás los importes de tu compra una vez que agregues productos.'
    precioEnvio.style.display = 'none';
    precioSubtotal.style.display = 'none';
    formaDePagoDiv.style.display = 'none';
    resumenDeCompraDiv.style.color = "#6e6b6b"
    emptyCarDiv.classList.remove("d-none");
    emptyCarDiv.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center");
    emptyCarDiv.innerHTML = ` 
    <img src="https://media0.giphy.com/media/sRGU6yWN6f51stv2Sz/giphy.gif?cid=6c09b95203b40962f2335d19419977590a4601fdc3d2ea62&ep=v1_internal_gifs_gifId&rid=giphy.gif&ct=s" width="150" alt="empty car">
    <h3 class="mt-4">Tu carrito esta vacío</h3>
    <button class="mt-4 boton-standard" onclick="window.location.href = './productos.html';">Descubrir productos</button>
    `
}

function getProducts() {
    return JSON.parse(localStorage.getItem('carrito')) || [] ;
}
// updateCart();


function updateCart(){
    renderCartProducts();
    renderSubTotal();
    saveProductsToStorage(cartProducts);
    if(cartProducts.length === 0 ){
        emptyCart();
    }
}

function renderSubTotal(products){
    console.log(products);
    let totalPrice = 0;
    let totalItems = 0;
    
    products.forEach((productos)=>{
        totalPrice += productos.producto.precioProducto * productos.cantidadProducto;
        totalItems += productos.cantidadProducto;
        
    });
   
    precioTotalProductos.innerHTML = `Subtotal (${totalItems} productos): $ ${totalPrice}`;
    precioEnvio.innerHTML = `Precio de envío: $ ${precioEnvioRandom}`;
    precioSubtotal.innerHTML = `Subtotal $ ${totalPrice + precioEnvioRandom}`
}

function getRandomNumber(min, max) {
    // Generar un número aleatorio para el precio del envio entre min (incluido) y max (excluido) 
    return Math.floor(Math.random() * (max - min) + min);
  }

  
function getProductsFetch () {
    // const url = 'https://backend-pagina-heladeria-production.up.railway.app/api/carrito/orden/1'
    const url = 'http://localhost:8080/api/carrito/orden/1'
  
  fetch(url)
     .then(response => response.json())
     .then(productos => { 
        renderCartProducts(productos) 
        renderSubTotal(productos)});
  }

  getProductsFetch();

function renderCartProducts(producto) {
    carritoContainer.innerHTML = ""; // Limpiar cart-container
    producto.forEach((productos) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add("d-flex", "gap-2");
        
        productDiv.innerHTML = `
            <img src="${productos.producto.imagenProducto}" alt="${productos.producto.nombreProducto}" class="img-producto-card">
            <div class="d-flex flex-column gap-3 justify-content-center">
                <h4 class="fw-bold">${productos.producto.nombreProducto}</h4>
                <div class="d-flex flex-row gap-5">
                    <button class="boton-quitar" onclick="removeProductFromCart(${productos.productHasOrdenId})">Quitar</button>
                    <span class="input-wrapper">
                        <button class="decrement" onclick="changeNumberOfUnits('minus',${productos.productHasOrdenId})">-</button>
                        <input type="number" value="${productos.cantidadProducto}">
                        <button class="increment" onclick="changeNumberOfUnits('plus',${productos.productHasOrdenId})">+</button>
                    </span>
                    <span class="texto-labels">$ ${productos.producto.precioProducto}</span>
                </div>
            </div>`;
        
        
        carritoContainer.appendChild(productDiv);
    });
  
}

function removeProductFromCart(id){
    // cartProducts = cartProducts.filter((product)=> product.id !== id)
    // updateCart();
    // const url = `https://backend-pagina-heladeria-production.up.railway.app/api/carrito/orden/${id}`;
    const url = `http://localhost:8080/api/carrito/${id}`;
    fetch(url,
        {
            method: 'DELETE', 
        }).then(res => console.log(res.text()))
        .catch(error => console.log(error))
        
}

function changeNumberOfUnits(action, productId){
    const datosObj = {

    }

    const url = `http://localhost:8080/api/carrito/${id}`;
    fetch(url,
        {
            method: 'PUT',
            body: JSON.stringify(), 
        }).then(res => console.log(res.text()))
        .catch(error => console.log(error))


    // cartProducts = cartProducts.map((product)=>{
    //     let cantidad = product.cantidadProducto;

    //     if(product.id === productId){
    //         if(action === 'minus' && cantidad > 1){
    //             cantidad--;
    //         }else if(action=='plus'){
    //             cantidad++;
    //         }
    //     }
    //     return {...product, cantidad};
    // });
    // updateCart();


}


function saveProductsToStorage(products) {
    const productsJSON = JSON.stringify(products);
    localStorage.setItem('carrito', productsJSON);
}

renderCartProducts();

 
  btnContinuarCompra.addEventListener('click', ()=>{
    window.location.href = '../../index.html';
  });
