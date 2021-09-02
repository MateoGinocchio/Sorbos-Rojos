const formulario2 = document.getElementById('registroContacto');
formulario2.onsubmit = (e) => {
    e.preventDefault();
    let inputs = e.target.children;
    console.log(inputs[0].value);
    console.log(inputs[1].value);
    console.log(inputs[2].value);
    console.log(inputs[3].value);
    //INSTANCIAMOS UN OBJETO USANDOS LOS VALUE DE CADA INPUT
    const nuevoProducto = new MailsContacto(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
    console.log(nuevoProducto);
    //ASOCIAMOS EL PRODUCTO INSTANCIADO AL ARRAY DE PRODUCTOS
    emailContacto.push(nuevoProducto);
    //GUARDAR EN STORAGE
    localStorage.setItem("MAILSCONTACTO", JSON.stringify(emailContacto));
}