const observers = {};
function createScrollObserver(scrollAnchorID, targetElement, classToAdd) {
  if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
  ) {
    const element = document.querySelector(targetElement);
    observers[scrollAnchorID] = new IntersectionObserver((entries) => {
      if (entries[0].boundingClientRect.y <= 0) {
        element.classList.add(classToAdd);
      } else {
        element.classList.remove(classToAdd);
      }
    });
    const anchor = document.querySelector(
      `[data-bkty-scroll-anchor="${scrollAnchorID}"]`
    );
    observers[scrollAnchorID].observe(anchor);
  }
}
