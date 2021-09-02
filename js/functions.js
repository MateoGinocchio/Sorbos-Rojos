//GENERAR INTERFAZ DE PRODUCTOS EN SECCION VINOS.
function productosJquery(elementos, id) {
    $(id).empty();
    for (const elemento of elementos) {
        $(id).append(`<div class="containerr">
                        <img style="border-radius: 5px;" src="${elemento.img}" alt="" width="150px">
                        <h5>${elemento.nombre}</h5>
                        <p style="margin: 0px;">${elemento.categoria}</p>
                        <p>$${elemento.precio}</p>
                        <a id="${elemento.id}" class="btn btn-danger botonComprar" href="#">AGREGAR AL CARRITO</a>
                      </div>`);
    }
    //AÑADIMOS EL EVENTO CLICK A LOS BOTONES
    $(".botonComprar").on("click", añadirCarrito)
}

//GENERAR INTERFAZ DE PRODUCTOS EN SECCION RECOMENADOS.
function recomendados(recomendado,id) {
    $(id).empty();
    for (const elemento of recomendado) {
        $(id).append(`<div class="containerr1">
                        <img style="border-radius: 5px;" src="${elemento.img}" alt="" width="200px">
                        <a href="" id="${elemento.id}" class="btnDestacado"> 
                        <img class="destacado" src="images/destacado (1).png" alt="" width="40px">
                        </a>
                        <h4>${elemento.nombre}</h4>
                        <p style="margin: 0px;">${elemento.categoria}</p>
                        <h4>$${elemento.precio}</h4>
                        <a id="${elemento.id}" class="btn btn-danger botonComprar" href="">AGREGAR AL CARRITO</a>
                      </div>`);
    }
    //AÑADIMOS EL EVENTO CLICK A LOS BOTONES
    $(".botonComprar").click(addCarrito);
}

function addCarrito(e) {
    //NO REFRESCAR LA PAGINA XQ ES UN ENLACE EL BOTON
    e.preventDefault();
    e.stopPropagation();
    //PARA SABER QUE BOTON SE CLICKEO
    const productoID = e.target.id;
    //BUSCAR PRIMERO EL OBJETO EN EL CARRITO (SI FUE SELECCIONADO);
    const seleccionado = carrito.find(p => p.id == productoID);
    //SI NO SE ENCONTRO BUSCAR EN ARRAY DE PRODUCTOS
    if(seleccionado == undefined){
      carrito.push(recomendado.find(p => p.id == productoID));
    }else{
      //SI SE ENCONTRO AGREGAR UN CANTIDAD
      seleccionado.agregarCantidad(1);
    }
    //GUARDAR EN STORAGE
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
    //GENERAR SALID PRODUCTO
    carritoI(carrito);
}

function carritoI(recomendado) {
    //AGREGAR CANTIDAD DE PRODUCTOS Q HAY EN EL CARRITO
    $("#carritoCantidad").html(recomendado.length);
    //VACIAR CARRITO PARA Q NO SE REPITAN LOS PRODUCTOS
    $("#carritoProductos").empty();
    //AL HACER CLICK EN "AGREGAR AL CARRITO" AGREGAS LOS PRODUCTOS
    for (const elemento of recomendado) {
        $("#carritoProductos").append(`<div class="containerCarrito">
                                            <p>${elemento.nombre} $${elemento.precio}</p>
                                            <span class="badge badge-dark">${elemento.cantidad}</span>
                                            <span class="badge badge-success"> $ ${elemento.subtotal()}</span>
                                            <a href="" id="${elemento.id}" class="btn btn-info buttonSub">-</a>
                                            <a href="" id="${elemento.id}" class="btn btn-info buttonAdd">+</a>
                                            <a href="" id="${elemento.id}" class="btn btn-danger buttonDelete">x</a>
                                        </div>
                                        <hr>`);
    }
    //AGREGAR TOTAL
    $("#carritoProductos").append(`<p id="totalCarrito">TOTAL ${totalCarrito(elementos)} </p>`)
    //BOTON CONFIRMAR 
    $("#carritoProductos").append(`<button id="btnConfirmar">CONFIRMAR COMPRA</button>`)
    //ASOCIAMOS LOS EVENTOS A LA INTERFAZ GENERADA
    $("#btnConfirmar").click(confirmarCompra);
    $(".buttonDelete").click(eliminarProducto);
    $('.buttonAdd').click(añadirCantidad);
    $('.buttonSub').click(restarCantidad);
}



function añadirCarrito(e) {
    //NO REFRESCAR LA PAGINA XQ ES UN ENLACE EL BOTON
    e.preventDefault();
    e.stopPropagation();
    //PARA SABER QUE BOTON SE CLICKEO
    const productoID = e.target.id;
    //BUSCAR PRIMERO EL OBJETO EN EL CARRITO (SI FUE SELECCIONADO);
    const seleccionado = carrito.find(p => p.id == productoID);
    //SI NO SE ENCONTRO BUSCAR EN ARRAY DE PRODUCTOS
    if(seleccionado == undefined){
      carrito.push(elementos.find(p => p.id == productoID));
    }else{
      //SI SE ENCONTRO AGREGAR UN CANTIDAD
      seleccionado.agregarCantidad(1);
    }
    //GUARDAR EN STORAGE
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
    //GENERAR SALID PRODUCTO
    carritoUI(carrito);
}

function carritoUI(elementos) {
    //AGREGAR CANTIDAD DE PRODUCTOS Q HAY EN EL CARRITO
    $("#carritoCantidad").html(elementos.length);
    //VACIAR CARRITO PARA Q NO SE REPITAN LOS PRODUCTOS
    $("#carritoProductos").empty();
    //AL HACER CLICK EN "AGREGAR AL CARRITO" AGREGAS LOS PRODUCTOS
    for (const elemento of elementos) {
        $("#carritoProductos").append(`<div class="containerCarrito">
                                            <p>${elemento.nombre} $${elemento.precio}</p>
                                            <span class="badge badge-dark">${elemento.cantidad}</span>
                                            <span class="badge badge-success"> $ ${elemento.subtotal()}</span>
                                            <a href="" id="${elemento.id}" class="btn btn-info buttonSub">-</a>
                                            <a href="" id="${elemento.id}" class="btn btn-info buttonAdd">+</a>
                                            <a href="" id="${elemento.id}" class="btn btn-danger buttonDelete">x</a>
                                        </div>
                                        <hr>`);
    }
    //AGREGAR TOTAL
    $("#carritoProductos").append(`<p id="totalCarrito">TOTAL ${totalCarrito(elementos)} </p>`)
    //BOTON CONFIRMAR 
    $("#carritoProductos").append(`<button id="btnConfirmar">CONFIRMAR COMPRA</button>`)
    //ASOCIAMOS LOS EVENTOS A LA INTERFAZ GENERADA
    $("#btnConfirmar").click(confirmarCompra);
    $(".buttonDelete").click(eliminarProducto);
    $('.buttonAdd').click(añadirCantidad);
    $('.buttonSub').click(restarCantidad);
}

//ELIMINAR CARRITO
function eliminarProducto(e) {
    e.preventDefault()
    let posicion = carrito.findIndex(p => p.id == e.target.id);
    carrito.splice(posicion, 1);
    carritoUI(carrito);
    //GUARDAR EN LOCAL STORAGE
    localStorage.setItem("CARRITO", JSON.stringify(carrito));
}

//FUNCION AÑADIR CANTIDAD
function añadirCantidad(e) {
    let producto = carrito.find(p => p.id == this.id);
    producto.agregarCantidad(1);
    $(this).parent().children()[1].innerHTML = producto.cantidad;
    $(this).parent().children()[2].innerHTML = producto.subtotal();
    //GUARDAR EN STORAGE
    localStorage.setItem("CARRITO", JSON.stringify(carrito));
    e.preventDefault()
    //MODIFICAR TOTAL
    $("#totalCarrito").html(`TOTAL ${totalCarrito(elementos)}`);
}

//FUNCION RESTAR CANTIDAD
function restarCantidad(e) {
    let producto = carrito.find(p => p.id == this.id);
    if (producto.cantidad > 1) {
        producto.agregarCantidad(-1);
        //$(this).parent().children()[1].innerHTML = producto.cantidad;
        let registroUI = $(this).parent().children();
        registroUI[1].innerHTML = producto.cantidad;
        registroUI[2].innerHTML = producto.subtotal();
        //MODIFICAR TOTAL
        $("#totalCarrito").html(`TOTAL ${totalCarrito(elementos)}`);
        //GUARDAR EN STORAGE
        localStorage.setItem("CARRITO", JSON.stringify(carrito));
    }
    e.preventDefault()
}

//FUNCION SELECT
function selectUI(lista, selector) {
    //VACIAR OPCIONES EXISTENTES
    $(selector).empty();
    //RECORRER LISTA Y AÑADIR UNA OPCION POR CADA ELEMENTO
    lista.forEach(element => {
        $(selector).append(`<option value='${element}'>${element}</option>`);
    });
    $(selector).prepend(`<option value='TODOS' selected>TODOS</option>`);
}

function totalCarrito() {
    let total = 0;
    carrito.forEach(p => total += p.subtotal());
    return total 
}

//FUNCION CONFIRMAR COMPRA
function confirmarCompra() {
    $("#btnConfirmar").hide();
    //ENVIAR INFORMACION
    const URL = "https://jsonplaceholder.typicode.com/posts/";
    $.post(URL, JSON.stringify(carrito), function(datos, estado){
        console.log(estado);
        console.log(datos);
    })
}