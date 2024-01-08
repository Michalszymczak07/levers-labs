
// Pinning the about section
ScrollTrigger.create({
  trigger: '#about-section',
  start: 'top 6.1em',
  endTrigger: '#about-wrapper',
  end: 'bottom top',
  pin: true,
  pinSpacing: false
});

// Set initial states for other elements
gsap.set(".about-title-wrapper > *", { opacity: 0, scale: 0.8 });
gsap.set(".about-img-wrapper", { scale: 0.8, transformPerspective: 600, rotateX: 45, opacity: 0, transformOrigin: "bottom" });
gsap.set([".about-p", ".about-arrow", ".about-title"], { opacity: 0 });

// Trigger for showing .about-p at 35% and .about-arrow at 40% scroll progress
ScrollTrigger.create({
  trigger: ".about-wrapper",
  start: "top top",
  end: "bottom bottom",
  markers: false,
  onUpdate: self => {
    if (self.progress >= 0.35) {
      gsap.to(".about-p", { opacity: 1, duration: 0.5 });
    }
    if (self.progress >= 0.40) {
      gsap.to(".about-arrow", { opacity: 1, duration: 0.5 });
    }
  }
});

// ScrollTrigger for .about-title animations
const mainTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-wrapper",
    start: "top top",
    end: "bottom bottom",
    scrub: 0,
    onUpdate: self => {
      const buffer = 0.01; // Adjust the buffer zone as needed
      let titleIndex = Math.min(Math.floor((self.progress - 0.45) / (0.15 + buffer)), 3); // Adjust as needed
      if (self.direction === -1) { // If scrolling up, reverse the order
        titleIndex = 3 - titleIndex;
      }

      // Fade in the current title and fade out all others
      for (let i = 1; i <= 4; i++) {
        if (i === titleIndex + 1) {
          gsap.to(`.about-title-${i}`, { opacity: 1, scale: 1, duration: 0.5 });
        } else {
          gsap.to(`.about-title-${i}`, { opacity: 0, scale: 0.8, duration: 0.25 });
        }
      }
    },
    markers: false
  }
});

// Animation for about image scaling from smaller to bigger
mainTimeline.fromTo(".about-img-wrapper", 
  { rotateX: 45, scale: 0.8 }, 
  { rotateX: 0, opacity: 1, scale: 1.2, duration: 0.5 }, "<")
  .to(".about-p", { opacity: 1, duration: 0.5 }, ">")
  .to(".about-arrow", { opacity: 1, duration: 0.5 }, ">")
  .to(".about-title", { opacity: 1, duration: 0.5 }, ">");

// ABOUT ANIMATION END






gsap.registerPlugin(ScrollTrigger);

// Navbar and Mobile Nav references
const navbar = document.querySelector("#navbar");
const mobileNav = document.querySelector(".mobile-nav");

// Set initial styles for navbar, mobile nav, and letters
gsap.set([navbar, mobileNav], { backgroundColor: "transparent", backdropFilter: "none" });
for (let i = 1; i <= 12; i++) {
    gsap.set(`#letter${i}`, { fill: "#fff" }); // Dark color
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
                gsap.to(`#letter${i}`, { fill: "#fff", duration: 0.3 }); // Dark color
            }
        }
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);




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
//fixed sections statements -->
ScrollTrigger.create({
  trigger: '.fixed-hero-right', // element który ma być sticky
  start: 'top 0em', // Adjust the start position as needed
  endTrigger: '.fixed-hero-wrapper', // Specify the end trigger as .scroll-about
  end: 'bottom top', // The end point is when the bottom of .about-home-left hits the top of .scroll-about
  pin: true, // tutaj mówisz przeglądarce, że ma wymusić pozycję sticky na tym elemencie
  pinSpacing: true // Set to false if you don't want ScrollTrigger to add spacing after the pinned element
});
// crazy section -->
// THE CRAZY SECTION LETTERS

  $(document).ready(function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Run split and animation setup
    runSplit();
  });

  let typeSplit;

  // Split the text up and set up animation for each split-word
  function runSplit() {
    $(".split-word").each(function() {
      // Split each instance of split-word
      let splitInstance = new SplitType(this, {
        types: "words"
      });

      // Append line-mask to each word of this instance
      $(this).find('.word').append("<div class='line-mask'></div>");

      // Create animation for this instance
      createAnimation($(this));
    });
  }

  // Create staggered animation for each split-word instance
  function createAnimation(splitWordElement) {
    let allMasks = splitWordElement.find(".word .line-mask").get();

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitWordElement,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

    tl.to(allMasks, {
      width: "0%",
      duration: 1,
      stagger: 0.5
    });
  }
  // THE CRAZY SECTION LETTERS END

// THE CRAZY SECTION 

// Opacity animations for 5 states
for (let i = 1; i <= 5; i++) {
    gsap.to(`.state-${i}`, {
        scrollTrigger: {
            trigger: `#sp${i}`,
            start: "center center",
            toggleActions: "play none none reverse",
        },
        opacity: 1,
        duration: 0.75,
        ease: "none",
    });

    if (i > 1) {
        gsap.to(`.state-${i - 1}`, {
            scrollTrigger: {
                trigger: `#sp${i}`,
                start: "center center",
                toggleActions: "play none none reverse",
            },
            opacity: 0,
            duration: 0.75,
            ease: "none",
        });
    }
}

// Moving .number-wrapper elements when scrolling past state-3
gsap.to(".number-wrapper", {
    scrollTrigger: {
        trigger: `#sp3`,
        start: "center center", // Start moving when state-3 is in the center
        end: "center top", // End movement when state-3 moves to the top of the viewport
        scrub: true,
    },
    y: '-3em', // Move 3em upwards
    ease: "none",
    stagger: 0.05, // Slight stagger for each element
});
gsap.registerPlugin(ScrollTrigger);


ScrollTrigger.create({
    trigger: '#sp4',
    start: 'center center',
    onEnter: () => {
        gsap.to('#sp4-wrapper', { duration: 1 });
        gsap.to('#sp4', { color: 'white', duration: 1 });
        gsap.to('.line-mask', { duration: 1 });

        // Animate state-4-line elements
        gsap.to('.state-4-line', {
            width: '100%',
            duration: 1,
            stagger: 0.1, // slight delay between each line's animation
            ease: 'none',
        });

        // Animate state-4-orange elements
        gsap.to('.state-4-orange', {
            width: '100%',
            duration: 1,
            stagger: 0.1, // slight delay between each orange element's animation
            ease: 'none',
            onComplete: () => {
                // After completing state-4-orange animation, start state-4-purple animation
                gsap.to('.state-4-purple', {
                    width: '100%',
                    duration: 1,
                    stagger: 0.1, // slight delay between each purple element's animation
                    ease: 'none'
                });
            }
        });
    },
    onLeaveBack: () => {
        gsap.to('#sp4-wrapper', { duration: 1 });
        gsap.to('#sp4', { color: '', duration: 1 });
        gsap.to('.line-mask', { duration: 1 });

        // Revert state-4-line elements width to 0
        gsap.to('.state-4-line', { width: '0%', duration: 1, ease: 'none' });

        // Also revert state-4-orange and state-4-purple elements width to 0
        gsap.to('.state-4-orange, .state-4-purple', { width: '0%', duration: 1, ease: 'none' });
    }
});

