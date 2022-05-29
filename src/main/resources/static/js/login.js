// Call the dataTables jQuery plugin
$(document).ready(function() {

    //on ready
});

async function iniciarSesion(){

    let datos = {};
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;


    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    const respuesta = await request.text();
    if (respuesta != 'fail'){
        //Si la sesion es iniciada con exito, guardamos el token en el servidor web.
        localStorage.token = respuesta;
        localStorage.email = datos.email;
        window.location.href = 'usuarios.html';
    }else {
        alert("El usuario o la contraseña son incorrectos, por favor vuelva a intentar");
    }
}

