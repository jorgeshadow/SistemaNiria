

firebase.initializeApp({
  apiKey: "AIzaSyAE5jJKOvZCVZvjFkO0NUBwgvLz4KxnNWk",
  authDomain: "systemstec-69d04.firebaseapp.com",
  projectId: "systemstec-69d04",
  databaseURL: "https://systemstec-69d04.firebaseio.com/"
})

/** agregar nueva */

var form = document.getElementById('partidaForm'); // Obtenemos la referencia al formulario
if (form) { // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener('submit', partidaForm1); // Al momento de enviar el formulario, ejecuta la función "contactform"
  form.precioU.addEventListener("keypress", soloNumeros, false); //para la validacion de solo numeros
}

document.getElementById("fecha").valueAsDate = new Date();
$('#modalNuevo').on('hidden.bs.modal', function (e) {
  form.reset();
  document.getElementById("fecha").valueAsDate = new Date();
})

function partidaForm1(event) {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
  const partida = document.getElementById('partida'); // Obtenemos la referencia a cada uno de nuestros elementos del formulario
  const articulo = document.getElementById('articulo');
  // const sexo = document.querySelector('input[type=radio]:checked');
  const clave = document.getElementById('clave');
  const cantidad = document.getElementById('cantidad');
  const precioU = document.getElementById("precioU");
  const fecha = document.getElementById("fecha");
  const data = {
    'partida': partida.value,
    'articulo': articulo.value,
    'clave': clave.value,
    'cantidad': cantidad.value,
    'precioU': precioU.value,
    'fecha': fecha.value
  }; // Creamos un objecto con todos los elementos de nuestro formulario.
  insertarPartida(data); // Enviamos la información obtenida por el usuario a la función que se encargara de guardar la información en Firebase
  form.reset(); // borramos todos los campos. 
}

var db = firebase.database();

function insertarPartida(data) {


  db.ref('partidas').push(data)
    .then(function () {
      $('#modalNuevo').modal('hide')
     // alert('mensaje guardado'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
    })
    .catch(function () {
     // alert('mensaje No guardado'); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
    });
  llenarTabla();

};

function llenarTabla() {

  var data = db.ref('partidas');
  var table = document.getElementById('contentTable');

  if (table) {

    table.innerHTML = "";

    data.orderByChild("articulo").on("child_added", function (datos) {

      var d = datos.val();

      {
        var row = table.insertRow(0);
        var cellClave = row.insertCell(0);
        var cellPartida = row.insertCell(1);
        var cellArticulo = row.insertCell(2);
        var cellFecha = row.insertCell(3);
        var cellCantidad = row.insertCell(4);
        var cellPU = row.insertCell(5);
        var cellEdit = row.insertCell(6);
        var cellDelete = row.insertCell(7);

        cellArticulo.innerHTML = d.articulo;
        cellCantidad.innerHTML = d.cantidad;
        cellClave.innerHTML = d.clave;
        cellFecha.innerHTML = d.fecha;
        cellPartida.innerHTML = d.partida;
        cellPU.innerHTML = "$ " + d.precioU + " MNX";
        cellEdit.innerHTML = '<a class="btn btn-warning"><em class="fa fa-edit" style="color:white"></em></a>';
        cellDelete.innerHTML = ' <a class="btn btn-danger"><em class="fa fa-trash-alt" style="color:white"></em></a>';

      }

    })
  
  }
}
this.llenarTabla();

/** filtrar */

var form = document.getElementById('formFilter'); // Obtenemos la referencia al formulario
if (form) { // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  document.getElementById("fechaIni").valueAsDate = new Date();
  document.getElementById("fechaFin").valueAsDate = new Date();
  form.addEventListener('submit', filtrarFecha); // Al momento de enviar el formulario, ejecuta la función "contactform"
}

function filtrarFecha() {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
  var data = db.ref('partidas');

  var startDate = document.getElementById("fechaIni");
  var endDate = document.getElementById("fechaFin");

  var table = document.getElementById('contentTable');
  if (table) {
    
    table.innerHTML = "";

    data.orderByChild("fecha").startAt(startDate.value).endAt(endDate.value)
      .on("child_added", function (datos) {
        var d = datos.val();
  
        {
          var row = table.insertRow(0);
          var cellClave = row.insertCell(0);
          var cellPartida = row.insertCell(1);
          var cellArticulo = row.insertCell(2);
          var cellFecha = row.insertCell(3);
          var cellCantidad = row.insertCell(4);
          var cellPU = row.insertCell(5);
          var cellEdit = row.insertCell(6);
          var cellDelete = row.insertCell(7);
  
          cellArticulo.innerHTML = d.articulo;
          cellCantidad.innerHTML = d.cantidad;
          cellClave.innerHTML = d.clave;
          cellFecha.innerHTML = d.fecha;
          cellPartida.innerHTML = d.partida;
          cellPU.innerHTML = "$ " + d.precioU + " MNX";
          cellEdit.innerHTML = '<a class="btn btn-warning"><em class="fa fa-edit" style="color:white"></em></a>';
          cellDelete.innerHTML = ' <a class="btn btn-danger"><em class="fa fa-trash-alt" style="color:white"></em></a>';
  
        }
  
      });
  }
  form.reset(); // borramos todos los campos. 
}


/**validaciones date */

var today =  new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("fecha").setAttribute("max", today); 
document.getElementById("fecha").setAttribute("min", today); 
document.getElementById("fechaFin").setAttribute("max",today);
document.getElementById("fechaIni").setAttribute("max",today);

//Solo permite introducir numeros.
function soloNumeros(e){
  var key = window.event ? e.which : e.keyCode;
  if (key < 48 || key > 57) {
    e.preventDefault();
  }
}