
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

function updateThemeToggleVisuals(themeValue) {
    const isPurpleTheme = themeValue === 'purple';
    console.log(`updateThemeToggleVisuals reads theme as: ${themeValue}`);

    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');

    // Purple = moon at top, sun at bottom
    // Amber = sun at top, moon at bottom
    sun.style.offsetDistance = isPurpleTheme ? '10%' : '65%';
    moon.style.offsetDistance = isPurpleTheme ? '65%' : '10%';

    sun.style.opacity = isPurpleTheme ? '0.3' : '1';
    moon.style.opacity = isPurpleTheme ? '1' : '0.3';

    // Set linear-gradient in active SVG
    const sunPath = sun.querySelector('path');
    const moonPath = moon.querySelector('path');
    if (isPurpleTheme) {
        // Moon is active (purple gradient)
        moonPath.setAttribute('fill', 'url(#moon-gradient)');
        moonPath.setAttribute('stroke', 'url(#moon-gradient)');
        moonPath.setAttribute('stroke-width', '1.5');
        
        sunPath.setAttribute('fill', 'var(--text)');
        sunPath.setAttribute('stroke', 'var(--text)');
        sunPath.setAttribute('stroke-width', '2.2');
    } else {
        // Sun is active (amber gradient)
        sunPath.setAttribute('fill', 'url(#sun-gradient)');
        sunPath.setAttribute('stroke', 'url(#sun-gradient)');
        sunPath.setAttribute('stroke-width', '1.5');
        
        moonPath.setAttribute('fill', 'var(--text)');
    }

    sun.style.transform = `translate(-50%, -50%) scale(${isPurpleTheme ? 0.4 : 1.2})`;
    moon.style.transform = `translate(-50%, -50%) scale(${isPurpleTheme ? 1.2 : 0.4})`;
}

function handleThemeToggle(e) {
    const html = document.querySelector('html');
    const currentTheme = html.dataset.theme;
    const newTheme = currentTheme === 'purple' ? 'amber' : 'purple';
    console.log(`handleThemeToggle reading currentTheme as: ${currentTheme}`);

    applyTheme(newTheme);
    setCookie(newTheme);
    updateThemeToggleVisuals(newTheme);
}


function between(string, left, right) {
    const l = string.indexOf(left) + left.length;
    if (l === -1) return "";
    let r = string.indexOf(right);
    if (r === -1) r = string.length;
    return string.slice(l, r);
}

function getCookie() {
    const themeValue = between(document.cookie, "=", ";");
    // console.log(`getCookie got: ${themeValue}`);
    return themeValue;
}


function setCookie(themeValue) {
    document.cookie = `theme=${themeValue}; path=/; max-age=31536000`;
    // console.log(`setCookie setting data-theme to: ${themeValue}`)
    document.querySelector('html').dataset.theme = themeValue;
}

function applyTheme(themeValue) {
    const html = document.querySelector('html');
    html.dataset.theme = themeValue;
    // console.log(`applyTheme set data-theme to: ${themeValue}`);
}

document.addEventListener('DOMContentLoaded', () => {
    const themeValue = getCookie();
    applyTheme(themeValue);
    updateThemeToggleVisuals(themeValue);
});

document.addEventListener('click', (e) => {
    console.log(`Clicked: ${e.target.classList}`);

    if (e.target.matches('.dot')) {
        handleDotClick(e);
    }
    if (e.target.closest('.theme-toggle')) {
        handleThemeToggle(e);
    }
})