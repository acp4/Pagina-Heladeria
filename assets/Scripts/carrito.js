const carritoContainer = document.getElementById('carrito-container');
let cartProducts = getProducts();
const precioTotalProductos = document.getElementById("precio-total-productos");

function getProducts() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function updateCart(){
    renderCartProducts();
    // renderSubTotal();
    saveProductsToStorage(cartProducts);
}

// function renderCartProducts() {

//     carritoContainer.innerHTML = ""; // Limpiar cart-container
//     cartProducts.forEach((element) => {
//         // let product = document.createElement('div');
//         // product.classList.add("d-flex", "gap-2");
//         carritoContainer.innerHTML += `
//         <div class="d-flex gap-2 ">
//             <img src="${element.url}" alt="${element.nombre}"
//                 class="img-producto-card">
//                 <div class="d-flex flex-column gap-3 justify-content-center">
//                     <h3>${element.nombre}</h3>
//                     <div class="d-flex flex-row gap-5">
//                         <button class="boton-quitar" onclick="removeProductFromCart(${element.id})">Quitar</button>
//                         <span class="input-wrapper">
//                         <button class="decrement" onclick="changeNumberOfUnits('minus', ${element.id})">-</button>
//                         <input type="number" value="${element.cantidad}"/>
//                         <button class="increment" onclick="changeNumberOfUnits('plus', ${element.id})">+</button>
//                         </span>
//                         <span class=" texto-labels">$ ${element.precio}</span>
//                     </div>
//                 </div>
//             </div>`
//         // carritoContainer.appendChild(product);
//     });
//     console.log(cartProducts);
// }

function renderCartProducts() {
    carritoContainer.innerHTML = ""; // Limpiar cart-container
    cartProducts.forEach((element) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add("d-flex", "gap-2");
        
        productDiv.innerHTML = `
            <img src="${element.url}" alt="${element.nombre}" class="img-producto-card">
            <div class="d-flex flex-column gap-3 justify-content-center">
                <h3>${element.nombre}</h3>
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



