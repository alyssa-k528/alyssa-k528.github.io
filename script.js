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
  // for home page
  let slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {
      slideIndex = 1
    }

    if (n < 1) {
      slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }
}
