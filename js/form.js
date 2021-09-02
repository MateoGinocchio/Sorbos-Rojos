const formulario = document.getElementById('registroProducto');
formulario.onsubmit = (e) => {
    e.preventDefault();
    let inputs = e.target.children;
    console.log(inputs[0].value);
    console.log(inputs[1].value);
    //INSTANCIAMOS UN OBJETO USANDOS LOS VALUE DE CADA INPUT
    const nuevoProducto = new Mails(inputs[0].value, inputs[1].value);
    console.log(nuevoProducto);
    //ASOCIAMOS EL PRODUCTO INSTANCIADO AL ARRAY DE PRODUCTOS
    mailData.push(nuevoProducto);
    //GUARDAR EN STORAGE
    localStorage.setItem("MAILS", JSON.stringify(mailData));
}
