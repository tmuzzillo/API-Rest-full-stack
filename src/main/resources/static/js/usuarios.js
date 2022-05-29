// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  $('#usuarios').DataTable();
  actualizarEmailUsuario();
});

function actualizarEmailUsuario(){
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

async function cargarUsuarios(){

  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers: getHeaders()
  });
  const usuarios = await request.json();

  let listadoHtml = '';
  for (let usuario of usuarios){
    let usuarioHtml = "<tr>\n" +
        "                       <td>"+usuario.id+"</td>\n" +
        "                       <td>"+usuario.nombre+" "+usuario.apellido+ "</td>\n" +
        "                       <td>"+usuario.email+"</td>\n" +
        "                       <td>"+usuario.telefono+"</td>\n" +
        "                       <td><a href=\"#\" onclick='eliminarUsuario("+usuario.id+")' class=\"btn btn-danger btn-circle btn-sm\">\n" +
        "                               <i class=\"fas fa-trash\"></i>\n" +
        "                           </a>\n" +
        "                       </td>\n" +
        "          </tr>";
    listadoHtml+=usuarioHtml;
  }



  document.querySelector('#usuarios tbody').outerHTML = listadoHtml;
}

//creamos una funcion para obtener los headers y favorecer la reutilizacion.
function getHeaders(){
    return{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //le pasamos el token como header para que verifique del localStorage
        'Authorization': localStorage.token
    };
}

async function eliminarUsuario(id){
    if (!confirm('Desea eliminar a este usuario?')){
        return;
    }
    const request = await fetch('api/usuarios/' + id, {
        method: 'DELETE',
        headers: getHeaders()

    });
    location.reload();
}
