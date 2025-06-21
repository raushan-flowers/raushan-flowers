function autoScrollCarousel(id, speed = 1) {
  const container = document.getElementById(id);
  if (!container) return;

  let scrollAmount = container.scrollLeft;
  let isUserScrolling = false;
  let pauseTimeout;

  function scrollStep() {
    if (!container) return;

    if (!isUserScrolling) {
      scrollAmount += speed;
      if (scrollAmount + container.clientWidth >= container.scrollWidth) {
        scrollAmount = 0;
      }
      container.scrollLeft = scrollAmount;
    }
    
    requestAnimationFrame(scrollStep);
  }

  function onUserScroll() {
    isUserScrolling = true;

    // Clear any existing resume timer
    if (pauseTimeout) clearTimeout(pauseTimeout);

    // After 3 seconds of no user scroll, resume auto scroll
    pauseTimeout = setTimeout(() => {
      isUserScrolling = false;
      scrollAmount = container.scrollLeft; // sync scroll position
    }, 30000);
  }

  // Listen to user scroll events on the container
  container.addEventListener('scroll', onUserScroll);

  scrollStep();
}
