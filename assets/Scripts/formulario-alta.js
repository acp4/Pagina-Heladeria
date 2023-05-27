const listaProductos = [];

const agregarProductos = (event) => {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const url = document.getElementById("img-url").value;
    const cate = document.getElementsByName("gridRadios");
    const selected = Array.from(cate).find(radio => radio.checked);
    const categoria = selected.value;

    const producto = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        url: url,
        categoria: categoria
    }
    listaProductos.push(producto);
    
    console.log(listaProductos);

    localStorage.setItem("Lista de productos", JSON.stringify(listaProductos));
 
};
