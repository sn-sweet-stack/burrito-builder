/* eslint-disable */
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

var firebaseConfig = {
  apiKey: 'AIzaSyC1pqcYFWwdjEoYsjh0T7J0HRowufb16N8',
  authDomain: 'burito-builder.firebaseapp.com',
  projectId: 'burito-builder',
  storageBucket: 'burito-builder.appspot.com',
  messagingSenderId: '1072595221066',
  appId: '1:1072595221066:web:4b38539533b8503a7fc4b3',
  measurementId: 'G-4E488NNZ6P',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
