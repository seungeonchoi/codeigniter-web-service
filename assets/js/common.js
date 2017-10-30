/**
 * Created by chou6 on 2017-07-26.
 */
var login = document.getElementById("login");
// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal

// When the user clicks anywhere outside of the modal, close it
var target;
var close;
window.onclick = function(event) {
    if (event.target == target) {
        target.style.display = "none";
    }
}
window.addEventListener("scroll", function () {fix_sidemenu(); });
var width_text = document.getElementById("width");
var height_text = document.getElementById("height");



function fix_sidemenu(){

    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = scrolltop();
    /* for debug use
    width_text.innerHTML=width;
    height_text.innerHTML=height;
    */
    var menu = document.getElementById("menu");
    var sidenav = document.getElementById("sidenav");
    var sidenav_top = 110-height;

    if(sidenav_top<60){
        sidenav_top=50;
    }
    sidenav.style.top = sidenav_top + "px";
    if(height > 90){

        menu.style.position="fixed";
        menu.style.top=0;
    }
    else{
        menu.style.position="relative";

    }
}
//get top location depending on browser
function scrolltop() {
    var top = 0;
    if (typeof(window.pageYOffset) == "number") {
        top = window.pageYOffset;
    } else if (document.body && document.body.scrollTop) {
        top = document.body.scrollTop;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        top = document.documentElement.scrollTop;
    }
    return top;
}
function  modal(target_id) {
    modal_reset();
    target = document.getElementById(target_id);
    close = target.getElementsByClassName("close")[0];

    target.style.display="block";
    close.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        target.style.display = "none";
    });
    /*
     window.addEventListener("click",function (event) {
     event.preventDefault();
     event.stopPropagation();
     console.log("window");
     target.style.display = "none";
     })
     */
}
function modal_reset() {
    if(target != undefined){
        target.style.display = "none";

    }

}
function open_sidenav() {
    var sidenav = document.getElementById("sidenav");
    var container = document.getElementById("container");
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(sidenav.style.left === "-20%"|| sidenav.style.left === "-100%" || sidenav.style.left === "") {
        sidenav.style.left = "0";
        //container.style.marginLeft = "25%";

    }
    else if(width<856){
        sidenav.style.left = "-100%";
        container.style.marginLeft = "0%";
    }
    else {
        sidenav.style.left = "-20%";
        container.style.marginLeft = "0%";
    }
}



function do_signup(){
    var register = document.getElementById('register');
    var error = register.getElementsByClassName('error')[0];
    var info = error.getElementsByClassName('info')[1];
    var loading = document.createElement('i');
    loading.className = "fa fa-spinner fa-spin";
    register.insertBefore(loading,register.firstChild);
    error.style.display="none";
    var signup_button = document.getElementById('signup_button');
    signup_button.disabled=true;
    signup_button.innerHTML="Waiting for Signup process..";
    var formData = new FormData();
    var id=document.getElementById('username').value;
    var pw=document.getElementById('password').value;
    formData.append("username",id);
    formData.append("password",pw);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/index.php/main/register", true);
    xmlhttp.send(formData);
    xmlhttp.onreadystatechange = function() {
        loading.className="";
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText=="success"){
                modal('confirm');
                signup_button.disabled=false;
                signup_button.innerHTML="Submit";
            }
            else if(this.responseText=="email"){
                console.log("Invalid email");
                signup_button.disabled=false;
                signup_button.innerHTML="Submit";
                error.style.display="block";
                info.innerHTML="Please enter valid e-mail address";
            }
            else if(this.responseText=="password"){
                console.log("Invalid password");
                signup_button.disabled=false;
                signup_button.innerHTML="Submit";
                error.style.display="block";
                info.innerHTML="Password must contain at least 8 chars of lowercase characters, special characters and digits";
            }
            else if(this.responseText=="email_exists"){
                console.log("email_exists");
                signup_button.disabled=false;
                signup_button.innerHTML="Submit";
                error.style.display="block";
                info.innerHTML="Email already exists";
            }
            else{
                console.log(this.responseText);
                signup_button.disabled=false;
                signup_button.innerHTML="Submit";
                error.style.display="block";
                info.innerHTML="an error occured, contact site administrator for enquiry";
            }

        }
    };
    return false;

}

function do_login() {
    var login_button = document.getElementById('login_button');
    var login = document.getElementById('login');
    var error = login.getElementsByClassName('error')[0];
    var info = error.getElementsByClassName('info')[1];
    var loading = document.createElement('i');
    loading.className = "fa fa-spinner fa-spin";
    login_button.disabled=true;
    login_button.innerHTML=" Waiting for login process..";
    login_button.insertBefore(loading,login_button.firstChild);
    error.style.display="none";
    var formData = new FormData();
    var id=document.getElementById('login_username').value;
    var pw=document.getElementById('login_password').value;
    formData.append("username",id);
    formData.append("password",pw);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/index.php/main/login", true);
    xmlhttp.send(formData);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loading.className="";
            if(this.responseText=="success"){
                location.reload(true);
            }else if(this.responseText=="no"){
                login_button.disabled=false;
                login_button.innerHTML="Submit";
                error.style.display="block";
                info.innerHTML="Invalid e-mail or password";
            }else if(this.responseText=="email"){
                console.log("Invalid email");
                login_button.disabled=false;
                login_button.innerHTML="Submit";
                error.style.display="block";
                info.innerHTML="Please enter valid e-mail address";
            }
            else if(this.responseText=="password"){
                console.log("Invalid password");
                login_button.disabled=false;
                login_button.innerHTML="Submit";
                error.style.display="block";
                info.innerHTML="Password must contain at least 8 chars of lowercase characters, special characters and digits";
            }
            else{
                console.log(this.responseText);
                login_button.disabled=false;
                login_button.innerHTML="Submit";
                error.style.display="block";
                info.innerHTML="DB error occured. Please contact site administrator";
            }

        }
    };
    return false;
}
function do_logout() {
    console.log("logout");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/index.php/main/logout", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText=="success"){
                location.reload();
            }
            else{
                console.log("failed");
                console.log(this.responseText);
            }

        }
    };
}
function send_mail(email) {
    var send_mail = document.getElementById('send_mail');
    send_mail.disabled=false;
    send_mail.innerHTML="sending.."
    var formData = new FormData();
    formData.append("username",email);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/index.php/main/send", true);
    xmlhttp.send(formData);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText=="success"){
                modal('confirm');
            }
            else{
                console.log("error occured");
                console.log(this.responseText);
            }

        }
    };

}
function simulateClick(elId) {
    var evt;
    var el = document.getElementById(elId);
    if (document.createEvent) {
        evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    (evt) ? el.dispatchEvent(evt) : (el.click && el.click());
}