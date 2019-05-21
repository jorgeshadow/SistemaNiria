
    firebase.initializeApp({
        apiKey: "AIzaSyAE5jJKOvZCVZvjFkO0NUBwgvLz4KxnNWk",
        authDomain: "systemstec-69d04.firebaseapp.com",
        projectId: "systemstec-69d04",
        databaseURL: "https://systemstec-69d04.firebaseio.com/"
      })

var form = document.getElementById('partidaForm'); // Obtenemos la referencia al formulario
if(form){ // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
    form.addEventListener('submit', partidaForm1); // Al momento de enviar el formulario, ejecuta la función "contactform"
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

function insertarPartida(data){        

    var db = firebase.database();
    db.ref('partidas').push(data)
    .then(function(){
        $('#modalNuevo').modal('hide')
        alert('mensaje guardado'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
      })
      .catch(function(){
        alert('mensaje No guardado'); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
      });

};



