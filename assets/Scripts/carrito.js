const carritoContainer = document.getElementById('carrito-container');
let cartProducts = getProducts();
const precioTotalProductos = document.getElementById("precio-total-productos"); 
const precioEnvio = document.getElementById("precio-envio"); 
const precioSubtotal = document.getElementById("precio-subtotal"); 
let precioEnvioRandom = getRandomNumber(450, 150);
const btnContinuarCompra = document.getElementById('btn-continuar-compra');


function getProducts() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}
updateCart();


function updateCart(){
    renderCartProducts();
    renderSubTotal();
    saveProductsToStorage(cartProducts);
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
