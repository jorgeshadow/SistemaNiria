//conexion a fiebase
export function conexion() {
  
    firebase.initializeApp({
      apiKey: "AIzaSyAE5jJKOvZCVZvjFkO0NUBwgvLz4KxnNWk",
      authDomain: "systemstec-69d04.firebaseapp.com",
      projectId: "systemstec-69d04",
      databaseURL: "https://systemstec-69d04.firebaseio.com/"
    })
  
}