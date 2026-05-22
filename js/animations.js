document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();
    tl.from(".header-content h1", { opacity: 0, y: 50, duration: 1.5 }, "-=0.5")
      .from(".scroll-indicator", { opacity: 0, y: -10, duration: 0.5, yoyo: true }); 

});