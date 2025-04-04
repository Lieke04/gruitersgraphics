// hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
});


    const names = ['Gruiters', 'Graphics']; // Voeg hier de gewenste namen toe
    let index = 0;
    const dynamicNameElement = document.getElementById('dynamic-name');

    function changeName() {
        index = (index + 1) % names.length; // Volg de index om door de array te lopen
        dynamicNameElement.textContent = names[index]; // Update de tekst
    }

    setInterval(changeName, 700); // Verander de naam elke 2 seconden

//animation
    document.addEventListener("DOMContentLoaded", function () {
        const section = document.querySelector(".over-mij");
    
        function checkScroll() {
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
    
          if (sectionTop < windowHeight * 0.8) { // 80% van het schermhoogte
            section.classList.add("visible");
            window.removeEventListener("scroll", checkScroll);
          }
        }
    
        section.classList.add("hidden");
        window.addEventListener("scroll", checkScroll);
        checkScroll(); // Check direct bij laden van de pagina
      });
    
    // video controls
    function playVideo() {
        var videoElement = document.getElementById('popup-video');
        videoElement.play();
    }

    // pause button
    function pauseVideo() {
        var videoElement = document.getElementById('popup-video');
        videoElement.pause();
    }
    
    // fast forward button
    function fastForwardVideo() {
        var videoElement = document.getElementById('popup-video');
        videoElement.currentTime += 10;
    }

    function closePopup() {
        var videoElement = document.getElementById('popup-video');
        videoElement.pause();
        document.getElementById('popup').style.display = 'none';
    }
    

// gallery scroll
let scrollContainer = document.querySelector(".gallery");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

nextBtn.addEventListener("click", ()=>{
    scrollContainer.scrollLeft += 300;
});

backBtn.addEventListener("click", ()=>{
    scrollContainer.scrollLeft -= 300;
});


    

  document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".over-mij");

    function checkScroll() {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.8) { // 80% van het schermhoogte
        section.classList.add("visible");
        window.removeEventListener("scroll", checkScroll); // Verwijdert de eventlistener na de eerste activatie
      }
    }

    section.classList.add("hidden"); // Zorg ervoor dat de sectie eerst verborgen is
    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Check direct bij laden van de pagina
  });


  