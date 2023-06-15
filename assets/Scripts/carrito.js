const carritoContainer = document.getElementById('carrito-container');
let cartProducts = getProducts();
const precioTotalProductos = document.getElementById("precio-total-productos"); 
const precioEnvio = document.getElementById("precio-envio"); 
const precioSubtotal = document.getElementById("precio-subtotal"); 
let  precioEnvioRandom = 200;
const btnContinuarCompra = document.getElementById('btn-continuar-compra');
const emptyCarDiv = document.getElementById('empty-car');
const formaDePagoDiv = document.getElementById('forma-de-pago');
const resumenDeCompraDiv = document.getElementById('resumen-de-compra');

if(cartProducts.length === 0 ){
    emptyCart();
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
updateCart();


function updateCart(){
    renderCartProducts();
    renderSubTotal();
    saveProductsToStorage(cartProducts);
    if(cartProducts.length === 0 ){
        emptyCart();
    }
}

function renderSubTotal(){
    let totalPrice = 0;
    let totalItems = 0;
    
    cartProducts.forEach((product)=>{
        totalPrice += product.precio * product.cantidad;
        totalItems += product.cantidad;
        
    });
   
    precioTotalProductos.innerHTML = `Subtotal (${totalItems} productos): $ ${totalPrice}`;
    precioEnvio.innerHTML = `Precio de envío: $ ${precioEnvioRandom}`;
    precioSubtotal.innerHTML = `Subtotal $ ${totalPrice + precioEnvioRandom}`
}

function getRandomNumber(min, max) {
    // Generar un número aleatorio para el precio del envio entre min (incluido) y max (excluido) 
    return Math.floor(Math.random() * (max - min) + min);
  }


function renderCartProducts() {
    carritoContainer.innerHTML = ""; // Limpiar cart-container
    cartProducts.forEach((element) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add("d-flex", "gap-2");
        
        productDiv.innerHTML = `
            <img src="${element.url}" alt="${element.nombre}" class="img-producto-card">
            <div class="d-flex flex-column gap-3 justify-content-center">
                <h4 class="fw-bold">${element.nombre}</h4>
                <div class="d-flex flex-row gap-5">
                    <button class="boton-quitar">Quitar</button>
                    <span class="input-wrapper">
                        <button class="decrement">-</button>
                        <input type="number" value="${element.cantidad}">
                        <button class="increment">+</button>
                    </span>
                    <span class="texto-labels">$ ${element.precio}</span>
                </div>
            </div>`;
        
        const removeButton = productDiv.querySelector(".boton-quitar");
        removeButton.addEventListener("click", () => {
            removeProductFromCart(element.id);
        });
        
        const decrementButton = productDiv.querySelector(".decrement");
        decrementButton.addEventListener("click", () => {
            changeNumberOfUnits('minus', element.id);
        });
        
        const incrementButton = productDiv.querySelector(".increment");
        incrementButton.addEventListener("click", () => {
            changeNumberOfUnits('plus', element.id);
        });
        
        carritoContainer.appendChild(productDiv);
    });
  
}

function removeProductFromCart(id){
    cartProducts = cartProducts.filter((product)=> product.id !== id)
    updateCart();
}

function changeNumberOfUnits(action, productId){
    cartProducts = cartProducts.map((product)=>{
        let cantidad = product.cantidad;

        if(product.id === productId){
            if(action === 'minus' && cantidad > 1){
                cantidad--;
            }else if(action=='plus'){
                cantidad++;
            }
        }
        return {...product, cantidad};
    });
    updateCart();
}


function saveProductsToStorage(products) {
    const productsJSON = JSON.stringify(products);
    localStorage.setItem('carrito', productsJSON);
}

renderCartProducts();

 
  btnContinuarCompra.addEventListener('click', ()=>{
    window.location.href = '../../index.html';
  });
