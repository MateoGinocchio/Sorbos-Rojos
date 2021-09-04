//READY
$(document).ready(function () {
    //GUARDAR LOCALSTORAGE DE FORM INDEX
    if ("MAILS" in localStorage) {
        const datosGuardados = JSON.parse(localStorage.getItem("MAILS"));
        for (const literal of datosGuardados) {
            mailData.push(new Mails(literal.mail, literal.provincia));
        }
    }
    //GUARDAR LOCALSTORAGE DE FORM CONTACTO
    if ("MAILSCONTACTO" in localStorage) {
        const arrayGuardados = JSON.parse(localStorage.getItem("MAILSCONTACTO"));
        for (const literal of arrayGuardados) {
            emailContacto.push(new MailsContacto(literal.nombre, literal.email, literal.telefono, literal.mensaje));
        }
    }
    //GUARDAR LOCALSTORAGE DE CARRITO
    if ("CARRITO" in localStorage) {
        const datosGuardados = JSON.parse(localStorage.getItem("CARRITO"));
        for (const literal of datosGuardados) {
            carrito.push(new Bebidas(literal.id, literal.nombre, literal.precio, literal.cantidad, literal.categoria, literal.img));
        }
        carritoUI(carrito)
    }

    //STOPPROPAGATION
    $(".dropdown-menu").click(function (e) {
        e.stopPropagation();
    })
    const URLGET = "data/productos.json";
    $.get(URLGET, function (data, estado) {
        if (estado == "success") {
            for (const literal of data) {
                elementos.push(new Bebidas(literal.id, literal.nombre, literal.precio, literal.cantidad, literal.categoria, literal.img));
            }
        }
        //LLAMAMOS A LA FUNCION PARA GENERAR EL INTERFAZ DE LOS PRODUCTOS
        productosJquery(elementos, "#productos")
        //LLAMAMOS A LA FUNCION PARA GENERAR SELECT
        selectUI(categoria, "#filtroCategorias")
        //ASOCIAMOS EL EVENTO CHANGE
        $("#filtroCategorias").change(function (e) {
            const value = this.value;
            //SI LO Q SELECCIONA ES = A TODOS SE GENERA LA INTERFAZ DE TODOS LOS PRODUCTOS. SINO SE GENERAN DE
            //LOS PRODUCTOS CON LA CATEGORIA Q SELECCIONO
            if (value == "TODOS") {
                productosJquery(elementos, "#productos")
            } else {
                const filtrados = elementos.filter(p => p.categoria == value)
                //GENERAMOS INTERFAZ CON LOS PRODUCTOS FILTRADOS
                productosJquery(filtrados, "#productos")
            }
        });
    });
    
    //GENERAR INTERFAZ DE RECOMENDADOS
    const getURL = "data/recomendados.json";
    $.get(getURL, function (data, estado) {
        if (estado == "success") {
            for (const literal of data) {
                recomendado.push(new Bebidas(literal.id, literal.nombre, literal.precio, literal.cantidad, literal.categoria, literal.img));
            }
        }
        recomendados(recomendado, ".recomendaciones")
    });

});
//LOAD
window.addEventListener("load", () => {
    console.log("FOTOS CARGADAS");
    //ANIMACIONES FADE EN INICIO
    $(".cardRecomendacion").fadeIn(5000);
    $(".cardKit").fadeIn(6000);
})

//ANIMACION CON JQUERY

$(".botonComprar").click(() => {
    $(".containerr").animate({
        width: 235,
        height: 385
    }, "fast")
    console.log("Agregado al carrito");
    $(".containerr").animate({
        width: 230,
        height: 380
    }, "fast")
})

$("#busquedaProducto").keydown(function (e) { 
    const criterio = this.value;
    if(criterio != "") {
        const encontrados = elementos.filter(p => p.nombre.includes(criterio.toUpperCase()));
        productosJquery(encontrados, "#productos")
    }
});

//DEFINIR EVENTOS SOBRE EL INPUT DE FILTRO DE PRECIOS
$(".inputPrecio").change(function (e) { 
    const min = $("#minProducto").val();
    const max = $("#maxProducto").val();
    if((min > 0) && (max > 0)){
        const encontrados = elementos.filter(p => p.precio >= min && p.precio <= max);
        console.log(encontrados);
        productosJquery(encontrados, "#productos")
    } 
});