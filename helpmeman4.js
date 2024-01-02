let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Check hero section visibility and update navbar appearance accordingly
  if (isHeroInView()) {
    // Hero section is in view
    gsap.to("#nav", { y: 0, duration: 0.5 }); // Ensure navbar is shown
    document.getElementById('nav').style.backgroundColor = '#181715'; // Dark color for the navbar
    resetLetterColors(); // Reset the colors of the letters
  } else {
    // Hero section is not in view
    if (currentScroll > lastScrollTop) {
      // Scrolling down
      gsap.to("#nav", { y: -100, duration: 0.5 }); // Hides the navbar smoothly
    } else {
      // Scrolling up
      gsap.to("#nav", { y: 0, duration: 0.5 }); // Shows the navbar smoothly
    }
    document.getElementById('nav').style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // White with 50% opacity for the navbar
    changeLetterColorsToBlack(); // Change the colors of the letters to black
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

function isHeroInView() {
  const heroSection = document.querySelector("#hero-section");
  if (!heroSection) return false;
  const heroRect = heroSection.getBoundingClientRect();
  return heroRect.bottom > 0;
}

function changeLetterColorsToBlack() {
  for (let i = 1; i <= 12; i++) {
    let letter = document.querySelector('#letter' + i);
    if (letter) {
      letter.style.fill = '#181715'; // Change fill color to black
    }
  }
}

function resetLetterColors() {
  for (let i = 1; i <= 12; i++) {
    let letter = document.querySelector('#letter' + i);
    if (letter) {
      letter.style.fill = ''; // Reset fill color
    }
  }
}


// Ensure GSAP is registered
gsap.registerPlugin(ScrollTrigger);






//HERO ANIMATION 
if (window.location.pathname === '/') {  //homepage checker 


// GSAP and ScrollTrigger Registration
gsap.registerPlugin(ScrollTrigger);

// Initial animation for letters when the page loads
gsap.set("#letter1, #letter2, #letter3, #letter4, #letter5, #letter6, #letter7, #letter8, #letter9, #letter10, #letter11, #letter12", { y: 50, opacity: 0 });
gsap.to("#letter1, #letter2, #letter3, #letter4, #letter5, #letter6, #letter7, #letter8, #letter9, #letter10, #letter11, #letter12", 
  { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 1 });

// Set initial states for other elements
gsap.set(".nav-menu-inner > *, .button, .hero-title-wrapper > *", { opacity: 0 });
gsap.set(".hero-img-wrapper", { transformPerspective: 600, rotateX: 45, opacity: 0, transformOrigin: "bottom" });

// Initial fade-in for .hero-text-left and .hero-img-right
gsap.fromTo([".hero-text-left", ".hero-img-right"], 
  { opacity: 0 }, 
  { opacity: 1, duration: 1.5, delay: 1 });

// Set initial state for elements inside .hero-title-wrapper
gsap.set(".hero-title-wrapper > *", { y: 50, opacity: 0 });

// ScrollTrigger for hero section elements
ScrollTrigger.create({
  trigger: ".hero-wrapper",
  start: "top top",
  end: "bottom bottom",
  onLeave: () => {
    gsap.to([".hero-text-left", ".hero-img-right"], { opacity: 0, duration: 0.5 });
  },
  onUpdate: (self) => {
    const threshold = 0.1; // Threshold value for visibility
    if (self.progress <= threshold || self.progress >= 1 - threshold) {
      gsap.to([".hero-text-left", ".hero-img-right"], { opacity: 0, duration: 0.5 });
    }
  },
  onLeaveBack: () => {
    gsap.to(".hero-title-wrapper > *, .nav-menu-inner > *, .button", { opacity: 0, duration: 0.5, stagger: 0 });
  },
  markers: false
});

// ScrollTrigger animation for .hero-title-wrapper and navbar items
const mainTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-wrapper",
    start: "top top",
    end: "bottom bottom",
    scrub: 0,
    onUpdate: self => {
      if (self.progress >= 0.75) {
        gsap.to(".hero-title-wrapper > *", { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 });
      } else {
        gsap.to(".hero-title-wrapper > *", { opacity: 0, duration: 0.25 });
      }
    
      if (self.progress >= 0.90) {
        gsap.to(".nav-menu-inner > *, .button", { opacity: 1, duration: 0.5, stagger: 0.2 });
      } else {
        gsap.to(".nav-menu-inner > *, .button", { opacity: 0, duration: 0.5 });
      }
    },
    markers: false
  }
});

// Animation for logo and hero image
mainTimeline.fromTo(".logo-dark-mode", 
  { width: "87em" }, // Starting larger
  { width: "14.875em", duration: 0.5 } // Ending smaller
).fromTo(".hero-img-wrapper", { rotateX: 45 }, { rotateX: 0, opacity: 1, duration: 0.5 }, "<");

  
} // end homepage checker
//HERO ANIMATION END



// GRID SECTION ANIMATION
if (window.location.pathname === '/') {  //homepage checker 

// Set initial states for grid titles
gsap.set("#grid-title-1, #grid-title-2, #grid-title-3", { y: 50, opacity: 0 });

const titleTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#grid-section",
    start: "top center",
    onEnter: () => {
      titleTimeline.to("#grid-title-1, #grid-title-2, #grid-title-3", { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 });
    }
  }
});

// Set initial states for grid items
gsap.set("#square-item-1, #square-item-2, #square-item-5, #square-item-6", { x: -60, y: -10 });
gsap.set("#square-item-3, #square-item-4, #square-item-7, #square-item-8", { x: 60, y: -10 });

// Scroll-triggered animation for the first row of square items
gsap.to("#square-item-1, #square-item-2, #square-item-3, #square-item-4", {
  x: 0,
  y: 0,
 
  duration: 0.5,
  stagger: 0.1,
  scrollTrigger: {
    trigger: "#row-1",
    start: "top center",
    end: "center center",
    scrub: true
  }
});

// Scroll-triggered animation for the second row of square items
gsap.to("#square-item-5, #square-item-6, #square-item-7, #square-item-8", {
  x: 0,
  y: 0,
  duration: 0.5,
  stagger: 0.1,
  scrollTrigger: {
    trigger: "#row-2",
    start: "top center",
    end: "center center",
    scrub: true
  }
});

// Set initial state for #row-3
gsap.set("#row-3", { y: 50, opacity: 0 });

// Animate #row-3 to appear after the animation of row-2
gsap.to("#row-3", {
  y: 0,
  opacity: 1,
  duration: 0.5,
  scrollTrigger: {
    trigger: "#row-2",
    start: "top center",
    end: "center center",
    scrub: true,
    onEnter: () => {
      gsap.to("#row-3", { y: 0, opacity: 1, duration: 0.5 });
    }
  }
});
// Set initial states for lines
gsap.set("#line-1, #line-2, #line-3, #line-4, #line-5, #line-6, #line-7, #line-8", { height: 0, opacity: 0 });

// Scroll-triggered animation for the first four lines (top 50% of the section)
gsap.timeline({
  scrollTrigger: {
    trigger: "#grid-section",
    start: "top center", // starts when the top of the section is in the center of the viewport
    end: "50% center", // ends when the middle of the section is in the center of the viewport
    scrub: true,
    onEnter: () => {
      gsap.to("#line-1, #line-2, #line-3, #line-4", { height: "5em", opacity: 1, duration: 1.5, stagger: 0.4 });
    }
  }
});

// Scroll-triggered animation for the next four lines (bottom 50% of the section)
gsap.timeline({
  scrollTrigger: {
    trigger: "#grid-section",
    start: "50% center", // starts when the middle of the section is in the center of the viewport
    end: "bottom center", // ends when the bottom of the section is in the center of the viewport
    scrub: true,
    onEnter: () => {
      gsap.to("#line-5, #line-6, #line-7, #line-8", { height: "5em", opacity: 1, duration: 1.5, stagger: 0.4 });
    }
  }
});

// Hide all lines when the entire grid section is out of the viewport
gsap.timeline({
  scrollTrigger: {
    trigger: "#grid-section",
    start: "top bottom",
    end: "bottom top",
    onLeave: () => {
      gsap.to("#line-1, #line-2, #line-3, #line-4, #line-5, #line-6, #line-7, #line-8", { opacity: 0, duration: 1.25 });
    },
    onEnterBack: () => {
      gsap.to("#line-1, #line-2, #line-3, #line-4, #line-5, #line-6, #line-7, #line-8", { opacity: 1, duration: 1.25 });
    }
  }
});
}  // end homepage checker 

// GRID SECTION ANIMATION END

// TABS SECTION

if (window.location.pathname === '/') {  //homepage checker 

gsap.registerPlugin(ScrollTrigger);

const sectionHeight = window.innerHeight; // Assuming each 100vh section height

// Trigger click on Tab 1 link when in the first 100vh segment
ScrollTrigger.create({
  trigger: "#tab-section-wrapper",
  start: `top bottom`,
  end: `${sectionHeight} top`,
  onEnter: () => document.querySelector("#tab-link-1").click(),
  onEnterBack: () => document.querySelector("#tab-link-1").click()
});

// Trigger click on Tab 2 link when in the second 100vh segment
ScrollTrigger.create({
  trigger: "#tab-section-wrapper",
  start: `${sectionHeight} top`,
  end: `${2 * sectionHeight} top`,
  onEnter: () => document.querySelector("#tab-link-2").click(),
  onEnterBack: () => document.querySelector("#tab-link-2").click()
});

// Trigger click on Tab 3 link when in the third 100vh segment
ScrollTrigger.create({
  trigger: "#tab-section-wrapper",
  start: `${2 * sectionHeight} top`,
  end: `${3 * sectionHeight} top`,
  onEnter: () => document.querySelector("#tab-link-3").click(),
  onEnterBack: () => document.querySelector("#tab-link-3").click()
});
// Set initial states for tab items including new items
gsap.set(["#tab-1-item-0", "#tab-1-item-1", "#tab-1-item-2", "#tab-2-item-0", "#tab-2-item-1", "#tab-2-item-2", "#tab-3-item-0", "#tab-3-item-1", "#tab-3-item-2"], 
  { y: '100%', opacity: 0 });
// Function to animate items of a tab with updated delays
function animateTabItems(tabNum) {
  gsap.to(`#tab-${tabNum}-item-0`, { y: 0, opacity: 1, duration: 0.5, delay: 0.9 });
  gsap.to(`#tab-${tabNum}-item-1`, { y: 0, opacity: 1, duration: 0.5, delay: 1.1 });
  gsap.to(`#tab-${tabNum}-item-2`, { y: 0, opacity: 1, duration: 0.5, delay: 1.3 });
 // Animate line for the tab
  gsap.fromTo(`#tab-${tabNum}-line`, { width: '0%' }, { width: '100%', duration: 0.5, delay: 0.9 });
}


// Trigger animations when each tab becomes visible
document.querySelector("#tab-link-1").addEventListener("click", () => animateTabItems(1));
document.querySelector("#tab-link-2").addEventListener("click", () => animateTabItems(2));
document.querySelector("#tab-link-3").addEventListener("click", () => animateTabItems(3));

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
}// end homepage checker 
// TABS SECTION END


// CTA BLACK TABLET IPHONE
gsap.fromTo("#tablet", 
  { x: '25em', y: '-25em' }, // Starting position
  { 
    x: 0, y: 0, // Ending position (neutral)
    ease: "power1.out", // Smoother easing
    scrollTrigger: {
      trigger: "#screens",
      start: "top bottom", // Start when the top of the section hits the bottom of the viewport
      end: "bottom top", // End when the bottom of the section leaves the top of the viewport
      scrub: 1 // 1 second delay for smoother scrubbing
    }
  }
);

gsap.fromTo("#phone", 
  { x: '20em', y: '-8em' }, // Starting position
  { 
    x: 0, y: 0, // Ending position (neutral)
    ease: "power1.out", // Smoother easing
    scrollTrigger: {
      trigger: "#screens",
      start: "top bottom",
      end: "bottom top",
      scrub: 1 // 1 second delay for smoother scrubbing
    }
  }
);
// CTA BLACK TABLET IPHONE END






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



// Animation for changing styles and animating state-4-line and state-4-orange when #sp4 is in the center of the viewport
ScrollTrigger.create({
    trigger: '#sp4',
    start: 'center center',
    onEnter: () => {
        gsap.to('#sp4-wrapper', { backgroundColor: '#181715', duration: 1 });
        gsap.to('#sp4', { color: 'white', duration: 1 });
        gsap.to('.line-mask', { backgroundColor: '#181715', duration: 1 });

        // Animate state-4-line elements
        gsap.to('.state-4-line', {
            width: '100%',
            duration: 1,
            stagger: 0.1, // slight delay between each line's animation
            ease: 'none',
            onComplete: () => {
                // After completing state-4-line animation, start state-4-orange animation
                gsap.to('.state-4-orange', {
                    width: '100%',
                    duration: 1,
                    stagger: 0.1, // slight delay between each orange element's animation
                    ease: 'none'
                });
            }
        });
    },
    onLeaveBack: () => {
        gsap.to('#sp4-wrapper', { backgroundColor: '#E8DACC', duration: 1 });
        gsap.to('#sp4', { color: '', duration: 1 });
        gsap.to('.line-mask', { backgroundColor: '#E8DACC', duration: 1 });

        // Revert state-4-line elements width to 0
        gsap.to('.state-4-line', { width: '0%', duration: 1, ease: 'none' });

        // Also revert state-4-orange elements width to 0
        gsap.to('.state-4-orange', { width: '0%', duration: 1, ease: 'none' });
    }
});

// THE CRAZY SECTION END
