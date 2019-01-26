function mySlider(sliderWraper) {
  var wraper = document.querySelector(sliderWraper);
  let slides = wraper.querySelectorAll(".slide").length;
  
  if (wraper.querySelector(".slider-dots") != null) {
    let dotWraper = wraper.querySelector(".slider-dots");
      for (let index = 0; index < slides; index++) {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener('click', function () {
          currentSlide(index + 1);
        });
        dotWraper.appendChild(dot);
      }
    }
  let slidePrev = wraper.querySelector('.slide-prev');
    if (slidePrev != null) {
      slidePrev.addEventListener('click', function () {
        currentSlide(slideIndex - 1);
      });
    }
  let slideNext = wraper.querySelector('.slide-next');
    if (slideNext != null) {
      slideNext.addEventListener('click', function () {
        currentSlide(slideIndex + 1);
      });
    }


    var slideIndex = 1;
    var timer;
    showSlides(slideIndex);

    function currentSlide(n) {
      clearTimeout(timer);
      showSlides(slideIndex = n);
    }


    function showSlides(n) {
      var i;
      var slides = wraper.querySelectorAll(".slide");

      var dots = wraper.querySelectorAll(".dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      if (dots.length != 0) {
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" dotActive", "");
        }
        dots[slideIndex - 1].className += " dotActive";
      }


      slides[slideIndex - 1].style.display = "block";

      timer = setTimeout(function () {
        slideIndex++;
        showSlides(slideIndex);
      }, 7000);
    }
}

