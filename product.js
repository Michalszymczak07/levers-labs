function initializeAllAnimations() {

gsap.registerPlugin(ScrollTrigger);

// Navbar and Mobile Nav references
const navbar = document.querySelector("#navbar");
const mobileNav = document.querySelector(".mobile-nav");

// Set initial styles for navbar, mobile nav, and letters
gsap.set([navbar, mobileNav], { backgroundColor: "transparent", backdropFilter: "none" });
for (let i = 1; i <= 12; i++) {
    gsap.set(`#letter${i}`, { fill: "#181715" }); // Dark color
}

// Control navbar and mobile nav visibility and style based on scroll direction
let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
        // Scrolling Down
        gsap.to([navbar, mobileNav], { y: -100, duration: 0.3 }); // Adjust to navbar's height
        gsap.to([navbar, mobileNav], { backgroundColor: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)", duration: 0.3 });
        // Change letters' fill to dark color
        for (let i = 1; i <= 12; i++) {
            gsap.to(`#letter${i}`, { fill: "#181715", duration: 0.3 }); // Dark color
        }
    } else {
        // Scrolling Up
        gsap.to([navbar, mobileNav], { y: 0, duration: 0.3 });

        // Change navbar, mobile nav, and letters' style if close to the top
        if (st < 50) { 
            gsap.to([navbar, mobileNav], { backgroundColor: "transparent", backdropFilter: "none", duration: 0.3 });
            for (let i = 1; i <= 12; i++) {
                gsap.to(`#letter${i}`, { fill: "#181715", duration: 0.3 }); // Dark color
            }
        }
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);






document.addEventListener("DOMContentLoaded", function() {
    // Open the specific dropdown by default
    var defaultDropdownList = document.getElementById('myDropdownList');
    if (defaultDropdownList) {
        defaultDropdownList.classList.add('w--open');
        defaultDropdownList.setAttribute('aria-expanded', 'true');
    }

    // Add event listeners to all dropdown toggles
    var dropdownToggles = document.querySelectorAll('.w-dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            // Close the initially opened dropdown
            if (defaultDropdownList.classList.contains('w--open')) {
                defaultDropdownList.classList.remove('w--open');
                defaultDropdownList.setAttribute('aria-expanded', 'false');
            }
        });
    });
});



gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".client-logo").forEach((logo, i) => {
  gsap.from(logo, {
    scrollTrigger: {
      trigger: "#client-logo-section",
      start: "top center", // Adjust this to control when the animation starts
      toggleActions: "play none none none"
    },
    opacity: 0,
    duration: 1, // Duration of the fade-in effect
    delay: i * 0.5, // Delay each logo slightly more than the previous one
    ease: "power1.inOut"
  });
});

gsap.registerPlugin(ScrollTrigger);

const valuesGridItems = gsap.utils.toArray(".values-grid-item");
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#values-grid-section",
    start: "top center", // Adjust this to control when the animation starts
    toggleActions: "play none none none"
  }
});

timeline.from(valuesGridItems, {
  y: 100, // Start 100 pixels below the final position
  opacity: 0,
  duration: 1, // Duration of the slide-in effect
  stagger: 0.3, // Stagger the start of each item's animation
  ease: "power1.out"
});







gsap.registerPlugin(ScrollTrigger);

const wrappers = gsap.utils.toArray(".h1-animation.headings");
const staggerDelay = 0.1; // Delay between each item's animation

// Set initial properties for the children of each title wrapper
wrappers.forEach(wrapper => {
  gsap.set(wrapper.children, { y: 150, opacity: 0 });
});

// Animate each wrapper with a delay
wrappers.forEach((wrapper, index) => {
  gsap.to(wrapper.children, {
    delay: index * staggerDelay, // Delay increases for each wrapper
    y: 0,
    opacity: 1,
    duration: 1.0,
    stagger: 0.1,
    scrollTrigger: {
      trigger: wrapper,
      start: "top bottom"
    }
  });
});

gsap.utils.toArray(".title-wrapper").forEach(titleWrapper => {
  gsap.set(titleWrapper.children, { y: 50, opacity: 0 });

  ScrollTrigger.create({
    trigger: titleWrapper,
    start: "top 50%",
    onEnter: () => {
      gsap.to(titleWrapper.children, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1
      });
    }
  });
});

// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    gsap.fromTo('#line-1', { width: '0%' }, { width: '100%', duration: 1.5 });
    gsap.fromTo('#line-2', { width: '0%' }, { width: '100%', duration: 1.5, delay: 1 });
    gsap.fromTo('#line-3', { width: '0%' }, { width: '100%', duration: 1.5, delay: 2 });
});
}
let mm = gsap.matchMedia();
mm.add("(min-width: 768px)", () => {
    initializeAllAnimations();
});

