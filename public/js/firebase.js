$(document).ready(function () {

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCFSTcy3rT_9jrUABjUtqzK5xlHYtjaf4o",
    authDomain: "test-6a8a7.firebaseapp.com",
    databaseURL: "https://test-6a8a7.firebaseio.com",
    projectId: "test-6a8a7",
    storageBucket: "test-6a8a7.appspot.com",
    messagingSenderId: "828098820943",
    appId: "1:828098820943:web:84d41d2135e9c3c1b1233a"
  });
  
  // Reference Firebase Auth
  const auth = firebase.auth();

  // REGISTER DOM ELEMENTS
  const $email = $('#email');
  const $password = $('#password');
  const $tokenId = $('#tokenId');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignOut = $('#btnSignOut');
  const $signInfo = $('#sign-info');
  const $loginForm = $('#loginForm');

  // SignIn
  $btnSignIn.click(function(e){
    auth.signInWithEmailAndPassword($email.val(), $password.val()).then((response) => {
      response.user.getIdToken().then((getIdToken) => {
        $tokenId.val(getIdToken);
        console.log(getIdToken)
        $loginForm.submit();
      })
        //window.location.href='admin_sidebar_manageUser.html';
      })
      .catch(function(e){
        $signInfo.html(e.message);
      });
    });

  // SignUp
  $btnSignUp.click(function(e){
    auth.createUserWithEmailAndPassword($email.val(), $password.val())
    .catch(function(e){
      $signInfo.html(e.message);
    });
  });

  // Listening Login User
  auth.onAuthStateChanged(function(user){
    if(user) {
      $signInfo.html(`${user.email} is login...`);
      //console.log(user);
    } else {
      console.log("not logged in");
    }
  });

  // Signout
  $btnSignOut.click(function(){
    auth.signOut();
    $email.val('');
    $password.val('');
    $signInfo.html('No one login...');
  });

  
});
