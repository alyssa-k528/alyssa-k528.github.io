/* this script only for my intro stuff*/

/*show text line by line */
if(document.querySelector("#intro-page")) {
  let showText = function(target, message, index, interval) {
      if (index < message.length) {
        document.querySelector(target).textContent += message[index++];
    
        setTimeout(function() {
          showText(target, message, index, interval);
        }, interval);
      }
    }
  showText("#msg", "Hello world!\nMy name is Alyssa Kou,\nand here's a website all about me :)", 0, 50);

  // time set in miliseconds
  var time = 5000;

  //set relative path of new page on same website
  var newPage = 'website.html'; // path of new page

  // redirecting to new page after specified time
  setTimeout(function(){
    window.location.href = newPage;
  }, time);
}

// let showText = function(target, message, index, interval) {
//     const targetElement = document.querySelector(target);
//     targetElement.classList.add('text'); // Add the animation class
  
//     if (index < message.length) {
//       targetElement.textContent += message[index++];
  
//       setTimeout(function() {
//         showText(target, message, index, interval);
//       }, interval);
//     } else {
//       targetElement.classList.remove('anim-typewriter'); // Remove the animation class
//     }
//   };
  
//   showText("#msg", "Hello world!\nMy name is Alyssa Kou,\nand here's a website all about me :)", 0, 50);
  
/*this script for everything else */


/*condition used to make sure that the page only tries computing stuff made for that page */
if(document.querySelector(".main-page .mySlides")) {
//   // for home page
//   let slideIndex = 1;
//   showSlides(slideIndex);

//   // Next/previous controls
//   function plusSlides(n) {
//     showSlides(slideIndex += n);
//   }

//   // Thumbnail image controls
//   function currentSlide(n) {
//     showSlides(slideIndex = n);
//   }

//   function showSlides(n, slideshowClass) {
//     let i;
//     let slides = document.getElementsByClassName("mySlides");
//     let dots = document.getElementsByClassName("dot");
    
//     if (n > slides.length) {
//       slideIndex = 1
//     }

//     if (n < 1) {
//       slideIndex = slides.length
//     }

//     for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//     }

//     for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//     }
    
//     slides[slideIndex-1].style.display = "block";
//     dots[slideIndex-1].className += " active";
//   }
// }

  document.addEventListener("DOMContentLoaded", function() {
    initializeSlideshow('.crochet-projects', 1);
    initializeSlideshow('.laila-page', 1);
  });
  
  function initializeSlideshow(slideshowClass, startSlide) {
    let slideshowContainer = document.querySelector(slideshowClass);
    slideshowContainer.setAttribute("data-slide-index", startSlide);
    showSlides(startSlide, slideshowClass);
  }
  
  function plusSlides(n, slideshowClass) {
    let slideshowContainer = document.querySelector(slideshowClass);
    let slideIndex = parseInt(slideshowContainer.getAttribute("data-slide-index"));
    showSlides(slideIndex += n, slideshowClass);
  }
  
  function currentSlide(n, slideshowClass) {
    showSlides(n, slideshowClass);
  }
  
  function showSlides(n, slideshowClass) {
    let i;
    let slideshowContainer = document.querySelector(slideshowClass);
    let slides = slideshowContainer.getElementsByClassName("mySlides");
    let dots = slideshowContainer.getElementsByClassName("dot");
    let slideIndex = parseInt(slideshowContainer.getAttribute("data-slide-index"));
  
    if (n > slides.length) { 
      n = 1; 
    }

    if (n < 1) { 
      n = slides.length; 
    }
    
    slideshowContainer.setAttribute("data-slide-index", n);
  
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  
    slides[n - 1].style.display = "block";  
    dots[n - 1].className += " active";
  }
  
}
