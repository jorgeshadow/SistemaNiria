function set1(){        
    var db = firebase.database();
    db.ref('partidas').push().set({
        nombre: "josiel ddd",
        edad: "22 años"
    });

    alert("entro");

}