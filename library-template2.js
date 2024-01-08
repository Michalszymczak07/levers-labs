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

window.setTimeout(function() {
    // Set initial state
    gsap.set('.metric-item', { opacity: 0, y: 50 });

    // Start the animation
    gsap.to('.metric-item', {
        opacity: 1,
        y: 0,
        stagger: 0.2, // Stagger the start of each animation
        duration: 1,
        ease: "power1.out"
    });
}, 500);





document.addEventListener("DOMContentLoaded", function() {
    // Function to insert an element into a container
    function insertAtFirstPosition(container, element) {
        if (container && element) {
            if (container.children.length > 0) {
                container.insertBefore(element, container.children[0]);
            } else {
                container.appendChild(element);
            }
        }
    }

    // Select the elements
    var metricsGrid1 = document.querySelector('.metrics-t-grid');
    var m1Div = document.querySelector('.m1');

    var metricsGrid2 = document.querySelector('.metrics-t-grid-2');
    var m2Div = document.querySelector('.m2');

    var metricsGrid3 = document.querySelector('.metrics-t-grid-3');
    var m3Div = document.querySelector('.m3');

    // Insert elements
    insertAtFirstPosition(metricsGrid1, m1Div);
    insertAtFirstPosition(metricsGrid2, m2Div);
    insertAtFirstPosition(metricsGrid3, m3Div);
});



// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    gsap.fromTo('#line-1', { width: '0%' }, { width: '100%', duration: 1.5 });
    gsap.fromTo('#line-2', { height: '0%' }, { height: '104%', duration: 1.5, delay: 0.3 });
    gsap.fromTo('#line-3', { width: '0%' }, { width: '100%', duration: 1.5, delay: 1.0 });
    gsap.fromTo('#line-4', { width: '0%' }, { width: '100%', duration: 1.5, delay: 1.5 });
});
gsap.registerPlugin(ScrollTrigger);
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
}
let mm = gsap.matchMedia();
mm.add("(min-width: 768px)", () => {
    initializeAllAnimations();
});

});

