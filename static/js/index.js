window.HELP_IMPROVE_VIDEOJS = false;

// var INTERP_BASE = ;
var NUM_INTERP_FRAMES = 48;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 1; i < NUM_INTERP_FRAMES; i++) {
    var path = "./static/interpolation/3d_vis/" + "000000_" + String(i).padStart(2, '0') + '.png';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

var interp_images2 = [];
function preloadInterpolationImages2() {
  for (var i = 1; i < NUM_INTERP_FRAMES; i++) {
    var path = "./static/interpolation/3d_vis2/" + "000000_" + String(i).padStart(2, '0') + '.png';
    interp_images2[i] = new Image();
    interp_images2[i].src = path;
  }
}

function setInterpolationImage2(i) {
  var image = interp_images2[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper2').empty().append(image);
}


const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5 // Trigger when img is 50% visible
};
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      	console.log(entry);
        video = entry.target;
        video.play();
        //video.preload = "auto";
        console.log(video);
    }
      	
      
      // disconnect observer
      //observer.unobserve(og_video);
  });
}, options);

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    var videoList = document.getElementsByTagName("video");
    for (const video of videoList) {
			observer.observe(video)
		}

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    preloadInterpolationImages();
    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    preloadInterpolationImages2();
    $('#interpolation-slider2').on('input', function(event) {
      setInterpolationImage2(this.value);
    });
    setInterpolationImage2(0);
    $('#interpolation-slider2').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();



})
