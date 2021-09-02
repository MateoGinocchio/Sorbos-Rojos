//CONSTRUCTOR
class Bebidas {
    constructor(id, nombre, precio, cantidad, categoria, img) {
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.categoria = categoria;
        this.img = img;
    }
    agregarCantidad(valor) {
        this.cantidad += valor;
    }

    subtotal() {
        return this.cantidad * this.precio;
    }
}

//MAILS
class Mails {
    constructor(mail, provincia) {
        this.mail = mail;
        this.provincia = provincia;
    }
}

class MailsContacto {
    constructor(nombre, email, telefono, mensaje) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.mensaje = mensaje;
    }
}