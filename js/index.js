document.addEventListener("DOMContentLoaded", function () {
  var homepage = document.getElementById("homepage");
  var projectHorizontal = document.getElementById("project-horizontal");
  var projectSlider = document.getElementById("project-slider");
  var imagesHomepage = ["19.jpg", "20.jpg", "22.jpg", "23.jpg"];

  // if (homepage) {
  //   var img = document.createElement('img');
  //   var i = Math.floor(Math.random() * (imagesHomepage.length - 0.5));
  //   img.setAttribute("src",imagesHomepage[i]);
  //   homepage.appendChild(img);
  // }

  if (projectSlider) {
    var current = 0;
    var ul = document.getElementById("project-slider-ul");
    var items = document.querySelectorAll("#project-slider-ul li");
    var arrowLeft = document.querySelector(".arrow-left");
    var arrowRight = document.querySelector(".arrow-right");

    ul.addEventListener("click", function () {
      if (current == items.length - 1) {
        items[current].classList.remove("active");
        items[0].classList.add("active");
        current = 0;
      } else {
        items[current].classList.remove("active");
        items[current + 1].classList.add("active");
        current = current + 1;
      }
    });

    arrowLeft.addEventListener("click", function () {
      if (current == 0) {
        items[0].classList.remove("active");
        items[items.length - 1].classList.add("active");
        current = items.length - 1;
      } else {
        items[current].classList.remove("active");
        items[current - 1].classList.add("active");
        current = current - 1;
      }
    });

    arrowRight.addEventListener("click", function () {
      if (current == items.length - 1) {
        items[current].classList.remove("active");
        items[0].classList.add("active");
        current = 0;
      } else {
        items[current].classList.remove("active");
        items[current + 1].classList.add("active");
        current = current + 1;
      }
    });
  }

  // window.addEventListener("resize", handleResize);

  // var img = document.querySelectorAll('img');
  // var int = setInterval(function() {
  //   if (img[img.length - 1].getBoundingClientRect().width) {
  //     clearInterval(int);
  //     handleResize();
  //   }
  // }, 100);

  // function handleResize() {
  //   var wWidth = window.innerWidth;
  //   if (projectHorizontal && wWidth > 600) {
  //     var img = document.querySelectorAll('img');
  //     var sliderWidth = 0;

  //     var int = setInterval(function() {
  //       if (img[img.length - 1].getBoundingClientRect().width) {
  //         clearInterval(int);

  //         for (var i = img.length - 1; i >= 0; i--) {
  //           var imgWidth = img[i].getBoundingClientRect().width;
  //           sliderWidth = sliderWidth + imgWidth + 60;
  //         }
  //         projectHorizontal.style.width = sliderWidth + 'px';
  //       }
  //     }, 100);
  //   } else {
  //     projectHorizontal.style.width = 'auto';
  //   }
  // }
  handleResize();

  function handleResize() {
    var wWidth = window.innerWidth;
    if (projectHorizontal && wWidth > 600) {
      var img = document.querySelectorAll("img");

      var int = setInterval(function () {
        var sliderWidth = 0;
        for (var i = img.length - 1; i >= 0; i--) {
          var imgWidth = img[i].getBoundingClientRect().width;
          console.log(imgWidth);
          sliderWidth = sliderWidth + imgWidth;
        }
        projectHorizontal.style.width = sliderWidth + 262 + "px";
      }, 1000);
    }
  }

  // Add scramble functionality to existing BUSF link
  const busfLink = document.querySelector('nav h1 a');
  if (busfLink) {
    let isScrambled = false;
    busfLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (isScrambled) {
        resetButtons();
      } else {
        scrambleAllButtons();
      }
      isScrambled = !isScrambled;
    });
  }
});

function scrambleText(text) {
  return text.split('').sort(() => Math.random() - 0.5).join('');
}

function scrambleAllButtons() {
  const links = document.querySelectorAll('.main-nav a');
  links.forEach(link => {
    if (!link.getAttribute('data-original')) {
      link.setAttribute('data-original', link.textContent);
    }
    link.textContent = scrambleText(link.getAttribute('data-original'));
  });
}

function resetButtons() {
  const links = document.querySelectorAll('.main-nav a');
  links.forEach(link => {
    if (link.getAttribute('data-original')) {
      link.textContent = link.getAttribute('data-original');
    }
  });
}
