const carritoContainer = document.getElementById('carrito-container');
const productsInCar = getProducts();

function getProducts() {
    return JSON.parse(localStorage.getItem('carrito'));
}

function displayInCar(products) {
   
    carritoContainer.innerHTML = "";
    products.forEach((element) => {
        let product = document.createElement('div');
        product.classList.add("d-flex", "gap-2");
        product.innerHTML = `<img src="${element.img}" alt="helado de chocolate"
            class="img-producto-card">
            <div class="d-flex flex-column gap-3 justify-content-center">
            <h3>${element.nombre}</h3>
            <div class="d-flex flex-row gap-5">
                <button class="boton-quitar">Quitar</button>
                <span class="input-wrapper">
                <button class="decrement">-</button>
                <input type="number" value="1" class="quantity" min="0" />
                <button class="increment">+</button>
                </span>
                <span class="texto-labels">$ ${element.precio}</span>
            </div>
            </div>`
        carritoContainer.appendChild(product);
        const botonQuitar = product.querySelector('.boton-quitar');
        botonQuitar.addEventListener('click', () => {
            const id = products.indexOf(element.nombre);
            removeProductFromCar(id);
            product.remove();
        })
    });
}

function saveProductsToStorage(products) {
    const productsJSON = JSON.stringify(getProducts(products));
    localStorage.setItem('carrito', productsJSON);
  }

function buttonsIncrement() {
    const incrementButtons = document.querySelectorAll(".increment");
    const decrementButtons = document.querySelectorAll(".decrement");
    const quantityInputs = document.querySelectorAll(".quantity");

    for (let i = 0; i < incrementButtons.length; i++) {
        incrementButtons[i].addEventListener("click", () => {
            quantityInputs[i].value = parseInt(quantityInputs[i].value) + 1;
        });
    }

    for (let i = 0; i < decrementButtons.length; i++) {
        decrementButtons[i].addEventListener("click", () => {
            if (quantityInputs[i].value == 0) {
            } else {
                quantityInputs[i].value = parseInt(quantityInputs[i].value) - 1;
            }
        });
    }
}


function removeProductFromCar(productId) {
    const productsInCar = getProducts();
    const updatedProducts = productsInCar.filter(element => element.id !== productId);
    saveProductsToStorage(updatedProducts);
}

displayInCar(productsInCar);
buttonsIncrement();
