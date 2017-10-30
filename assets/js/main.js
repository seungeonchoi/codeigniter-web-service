/**
 * Created by chou6 on 2017-07-20.
 */
var slideIndex = 1;
if(document.getElementsByClassName('mySlides')){
    showSlides(slideIndex);
    setInterval(function(){plusSlides(1)}, 9000);
}


// Get the modal
//var modal = document.getElementById('myModal');
// Get the button that opens the modal
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.opacity= "0";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.opacity = "1";
    dots[slideIndex-1].className += " active";
}

