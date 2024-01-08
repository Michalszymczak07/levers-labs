
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

function initializeAllAnimations() {


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

// Create a GSAP timeline
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#filter-section",
        start: "top bottom",
        toggleActions: "play none none none",
        markers: false
    }
});

// Animate the .form element with opacity
tl.from(".form", {
    opacity: 0,
    duration: 0.5, // Faster animation for opacity
    ease: "power1.out"
});

// Animate the border of .form with a delay
tl.from(".form", {
    borderTop: "0.0625em solid #181715",
    borderBottom: "0.0625em solid #181715",
    duration: 0.5, // Duration for border animation
    ease: "power1.out",
    clearProps: "border" // Optional: clear inline styles after animation
}, "-=0.25"); // Overlaps the end of the opacity animation

// Animate each filter element sequentially
gsap.utils.toArray(["#filter-1", "#filter-2", "#filter-3"]).forEach((filter, index) => {
    tl.from(filter, {
        opacity: 0,
        duration: 0.4, // Reduced duration for a faster effect
        delay: index * 0.3, // Reduced delay for a faster sequence
        ease: "power1.out"
    }, "-=0.3"); // Overlap animations for a smoother transition
});


gsap.utils.toArray(".title-wrapper").forEach(titleWrapper => {
  gsap.set(titleWrapper.children, { y: 50, opacity: 0 });

  ScrollTrigger.create({
    trigger: titleWrapper,
    start: "top center",
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


document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth > 768) {
        var collectionList = document.querySelector('.metrics-grid');
        var basePositions = [3, 8, 9, 10, 15, 17, 20]; // Positions for empty divs within each pattern
        var patternLength = 20; // Total items in each pattern (including empty divs)
        var actualItemsPerPattern = 13; // Actual items per pattern

        var totalItems = collectionList.children.length;
        var requiredPatterns = Math.ceil(totalItems / actualItemsPerPattern);

        for (var pattern = 0; pattern < requiredPatterns; pattern++) {
            basePositions.forEach(function(pos) {
                var actualPosition = pos + pattern * patternLength - 1;
                if (actualPosition < totalItems + pattern * (patternLength - actualItemsPerPattern)) {
                    if (collectionList.children[actualPosition]) {
                        var emptyDiv = document.createElement('div');
                        emptyDiv.className = 'empty-space';
                        collectionList.insertBefore(emptyDiv, collectionList.children[actualPosition]);
                    }
                }
            });
        }
    }
});

gsap.registerPlugin(ScrollTrigger);

const valuesGridItems = gsap.utils.toArray(".metric-item");
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#filter-section",
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
}
let mm = gsap.matchMedia();
mm.add("(min-width: 768px)", () => {
    initializeAllAnimations();
});

