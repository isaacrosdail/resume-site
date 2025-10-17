
function handleDotClick(e) {
    // Grab all dot elements & convert HTMLCollection to array for index lookup
    const sliderDots = document.querySelector('.slider-dots');
    const dotElements = [...sliderDots.children];

    // Then we want to scrollTo the offsetLeft of the dotElements[index] of that slide
    const index = dotElements.indexOf(e.target);

    // Get the scrollable container holding all slides
    const slideTrack = document.querySelector('.slide-track');
    const sliderElements = [...slideTrack.children];

    // Scroll to the left offset of the matching slide
    const targetOffset= sliderElements[index].offsetLeft;
    slideTrack.scrollTo({ left: targetOffset});
    // Move indicator dot to new position
    const indicator = sliderDots.querySelector('.indicator');

    // Get computed styles & dot width for translateX
    const styles = getComputedStyle(sliderDots);
    const gap = parseFloat(styles.gap);
    const dotWidth = dotElements[0].getBoundingClientRect().width;

    indicator.style.transform = `translateX(${(index * (dotWidth + gap))}px)`;
}

// Avoids desync issues with clicking too fast
let sunPos = 75;
let moonPos = 25;

function handleThemeToggle(e) {
    const thing = e.target.closest('.thing');
    const sun = thing.querySelector('.sun');
    const moon = thing.querySelector('.moon');

    sunPos += 50;
    moonPos += 50;

    sun.style.offsetDistance = `${sunPos}%`;
    moon.style.offsetDistance = `${moonPos}%`;
}

document.addEventListener('click', (e) => {
    console.log(`Clicked: ${e.target.classList}`);

    if (e.target.matches('.dot')) {
        handleDotClick(e);
    }
    if (e.target.closest('.thing')) {
        handleThemeToggle(e);
    }

})