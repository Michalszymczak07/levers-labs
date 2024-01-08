gsap.registerPlugin(ScrollTrigger);

// Change navbar background based on #hero visibility
ScrollTrigger.create({
    trigger: "#hero",
    start: "top bottom",
    end: "bottom top",
    onEnter: () => gsap.to("#navbar", { backgroundColor: "transparent", backdropFilter: "none" }),
    onEnterBack: () => gsap.to("#navbar", { backgroundColor: "transparent", backdropFilter: "none" }),
    onLeave: () => gsap.to("#navbar", { backgroundColor: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)" }),
    onLeaveBack: () => gsap.to("#navbar", { backgroundColor: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)" })
});

// Change fill of each letter based on #hero visibility
for (let i = 1; i <= 12; i++) {
    ScrollTrigger.create({
        trigger: "#hero",
        start: "top bottom",
        end: "bottom top",
        onEnter: () => gsap.to(`#letter${i}`, { fill: "#FFFFFF" }),
        onEnterBack: () => gsap.to(`#letter${i}`, { fill: "#FFFFFF" }),
        onLeave: () => gsap.to(`#letter${i}`, { fill: "#181715" }),
        onLeaveBack: () => gsap.to(`#letter${i}`, { fill: "#181715" })
    });
}

// Control navbar visibility based on scroll direction and #hero visibility
const navbar = document.querySelector("#navbar");
let lastScrollTop = 0;
let heroInView = false;

ScrollTrigger.create({
    trigger: "#hero",
    start: "top bottom",
    end: "bottom top",
    onToggle: self => heroInView = self.isActive
});

window.addEventListener("scroll", function() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && !heroInView) {
        // Scroll Down & #hero is not in view
        gsap.to(navbar, { y: -100, duration: 0.3 }); // Adjust to navbar's height
    } else {
        // Scroll Up or #hero is in view
        gsap.to(navbar, { y: 0, duration: 0.3 });
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);




// Function to update navbar style based on hero visibility
function updateNavbarStyle() {
  const navbar = document.getElementById('navbar'); // Replace 'navbar' with your navbar ID
  const hero = document.getElementById('hero'); // Replace 'hero' with your hero section ID
  const heroRect = hero.getBoundingClientRect();

  if (heroRect.bottom <= 0) {
    // Hero section is out of viewport
    gsap.to(navbar, { backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)' });
  } else {
    // Hero section is in viewport
    gsap.to(navbar, { backgroundColor: 'transparent', backdropFilter: 'blur(0)' });
  }
}

// Listen for scroll events with GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.addEventListener("scroll", () => {
  updateNavbarStyle();
});

// Initial call to updateNavbarStyle
updateNavbarStyle();

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




ScrollTrigger.create({
  trigger: '#hero-section', // element który ma być sticky
  start: 'top 6.1em', // Adjust the start position as needed
  endTrigger: '#hero', // Specify the end trigger 
  end: 'bottom top', // The end point is when the bottom of .about-home-left hits the top of .scroll-about
  pin: true, // tutaj mówisz przeglądarce, że ma wymusić pozycję sticky na tym elemencie
  pinSpacing: false // Set to false if you don't want ScrollTrigger to add spacing after the pinned element
});
ScrollTrigger.create({
  trigger: '.fixed-hero-right', // element który ma być sticky
  start: 'top 0em', // Adjust the start position as needed
  endTrigger: '.fixed-hero-wrapper', // Specify the end trigger as .scroll-about
  end: 'bottom top', // The end point is when the bottom of .about-home-left hits the top of .scroll-about
  pin: true, // tutaj mówisz przeglądarce, że ma wymusić pozycję sticky na tym elemencie
  pinSpacing: false // Set to false if you don't want ScrollTrigger to add spacing after the pinned element
});
ScrollTrigger.create({
  trigger: '.tabs-section', // element that will be sticky
  start: 'top top', // Start when the top of .tabs-section hits the top of the viewport
  endTrigger: '.tab-section-wrapper', // End trigger element
  end: 'bottom top', // End 30vh after the bottom of .tab-section-wrapper hits the top
  pin: true, // Forces the element to be sticky
  pinSpacing: false // Disables adding spacing after the pinned element
});
ScrollTrigger.create({
  trigger: '.footer', // element that will be sticky
  start: 'top top', // Start when the top of .tabs-section hits the top of the viewport
  endTrigger: 'body', // End trigger element
  end: 'bottom top', // End 30vh after the bottom of .tab-section-wrapper hits the top
  pin: true, // Forces the element to be sticky
  pinSpacing: false // Disables adding spacing after the pinned element
});



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

// THE CRAZY SECTION END>


