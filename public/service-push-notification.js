
  var firebaseConfig = {
    apiKey: "AIzaSyBX8P5cdtPkSweWahtoGZI4dEjQL06pIGc",
    authDomain: "pusher-dev-5b80d.firebaseapp.com",
    projectId: "pusher-dev-5b80d",
    storageBucket: "pusher-dev-5b80d.appspot.com",
    messagingSenderId: "551321321560",
    appId: "1:551321321560:web:2c0f9dd1d76c6af8260a2d",
    measurementId: "G-58LDXP4ZW1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.getToken({ vapidKey: 'BAGvjjEb3FlxzfDYLi3Yd8gyOI-Peqx-UVuIR9nW4ucvVlFvExTDJzRknM0g3tR746Y1-dYO9YUzsXYD75VjkoE' }).then((currentToken) => {
  if (currentToken) {
    $.post("http://localhost:8000/api/v1/create/token/client",
        {
          key: key,
          secret: secret,
          token:currentToken
        },
        function(data, status){
        });
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
console.log('An error occurred while retrieving token. ', err);
// ...
});