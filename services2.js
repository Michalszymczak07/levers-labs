
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

const wrappers = document.querySelectorAll(".h1-animation.headings");

wrappers.forEach((wrapper, index) => {
  // Get the children of each wrapper
  let children = gsap.utils.toArray(wrapper.children);

  // Animate each child individually with a delay based on its index
  children.forEach((child, childIndex) => {
    gsap.fromTo(child, 
      { y: 150, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        delay: (index * 0.3) + (childIndex * 0.3), // Delay based on wrapper and child index
        duration: 1.0,
        ease: "power2.out"
      }
    );
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
}

let mm = gsap.matchMedia();
mm.add("(min-width: 768px)", () => {
    initializeAllAnimations();
});





