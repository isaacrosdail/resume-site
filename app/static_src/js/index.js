
// =================
// Slider / Carousel
// =================
const sliderTrack = document.querySelector('.slider-track');
const sliderDots = document.querySelector('.slider-dots');
const dotElements = [...sliderDots.children];
const indicator = sliderDots.querySelector('.indicator');

/**
 * Handles dot click - Scrolls to corresponding slide.
 * @param {MouseEvent} e - Click event
 */
function handleDotClick(e) {
    const index = dotElements.indexOf(e.target);
    const sliderElements = [...sliderTrack.children];
    const targetOffset= sliderElements[index].offsetLeft;

    sliderTrack.scrollTo({ left: targetOffset});
    moveIndicator(index);
}

// Update indicator when user scrolls manually
sliderTrack.addEventListener('scroll', () => {
    const slideWidth = sliderTrack.clientWidth;
    const currentIndex = Math.round(sliderTrack.scrollLeft / slideWidth);
    moveIndicator(currentIndex);
})

// Respect left/right arrow keys for carousel navigation
document.addEventListener('keydown', (e) => {
    // Check if focus is inside the carousel
    const carouselContainer = document.querySelector('.slider-container');
    if (!carouselContainer.contains(document.activeElement)) {
        return;
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();

        const slideWidth = sliderTrack.clientWidth;
        const currentIndex = Math.round(sliderTrack.scrollLeft / slideWidth);

        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = Math.max(0, currentIndex - 1);
        } else {
            const maxIndex = dotElements.length;
            newIndex = Math.min(maxIndex, currentIndex + 1);
        }

        // Scroll to new slide & move focus
        const sliderElements = [...sliderTrack.children];
        const targetOffset = sliderElements[newIndex].offsetLeft;
        sliderTrack.scrollTo({ left: targetOffset });
        dotElements[newIndex].focus();
    }
})

/**
 * Moves indicator dot to match slide index.
 * @param {number} index - Index to move indicator to
 */
function moveIndicator(index) {
    const styles = getComputedStyle(sliderDots);
    const gap = parseFloat(styles.gap);
    const dotWidth = dotElements[0].getBoundingClientRect().width;
    indicator.style.transform = `translateX(${(index * (dotWidth + gap))}px)`;

    // Update aria-current
    dotElements.forEach((dot, i) => {
        if (i === index) {
            dot.setAttribute('aria-current', 'true');
        } else {
            dot.removeAttribute('aria-current');
        }
    });
}

// =================
// Theme Toggle
// =================

const THEME_CONFIG = {
    active: {
        position: '65%',
        opacity: '1',
        scale: 1.2,
        strokeWidth: '1.5'
    },
    inactive: {
        position: '10%',
        opacity: '0.3',
        scale: 0.4,
        strokeWidth: '2.2'
    },
    gradients: {
        purple: 'url(#moon-gradient)',
        amber: 'url(#sun-gradient)'
    }
};

/**
 * Updates visual state of theme toggle (sun/moon positions, gradients, sizes)
 * @param {string} themeValue - Theme to update visuals to (eg, purple or amber)
 */
function updateThemeToggleVisuals(themeValue) {
    const isPurpleTheme = themeValue === 'purple';
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
    const sunPath = sun.querySelector('path');
    const moonPath = moon.querySelector('path');

    // Position: purple = moon top, amber = sun top
    sun.style.offsetDistance = isPurpleTheme ? THEME_CONFIG.inactive.position : THEME_CONFIG.active.position;
    moon.style.offsetDistance = isPurpleTheme ? THEME_CONFIG.active.position : THEME_CONFIG.inactive.position;
    
    // Opacity: active icon = 1, inactive = 0.3
    sun.style.opacity = isPurpleTheme ? THEME_CONFIG.inactive.opacity : THEME_CONFIG.active.opacity;
    moon.style.opacity = isPurpleTheme ? THEME_CONFIG.active.opacity : THEME_CONFIG.inactive.opacity;

    // Scale: active icon = 1.2, inactive = 0.4
    sun.style.transform = `translate(-50%, -50%) scale(${isPurpleTheme ? THEME_CONFIG.inactive.scale : THEME_CONFIG.active.scale})`;
    moon.style.transform = `translate(-50%, -50%) scale(${isPurpleTheme ? THEME_CONFIG.active.scale : THEME_CONFIG.inactive.scale})`;

    // Update all other SVGs (eg, demo link arrows) to match theme
    const allSvg = document.querySelectorAll('svg:not(.sun):not(.moon)');
    allSvg.forEach(svg => {
        const path = svg.querySelector('path');
        if (!path) return;
        path.setAttribute('stroke', isPurpleTheme ? 'url(#moon-gradient)' : 'url(#sun-gradient)');
    });

    // Apply gradient to active theme icon
    if (isPurpleTheme) {
        // Moon is active (purple gradient)
        moonPath.setAttribute('fill', THEME_CONFIG.gradients.purple);
        moonPath.setAttribute('stroke', THEME_CONFIG.gradients.purple);
        moonPath.setAttribute('stroke-width', THEME_CONFIG.active.strokeWidth);
        
        sunPath.setAttribute('fill', 'var(--text)');
        sunPath.setAttribute('stroke', 'var(--text)');
        sunPath.setAttribute('stroke-width', THEME_CONFIG.inactive.strokeWidth);
    } else {
        // Sun is active (amber gradient)
        sunPath.setAttribute('fill', THEME_CONFIG.gradients.amber);
        sunPath.setAttribute('stroke', THEME_CONFIG.gradients.amber);
        sunPath.setAttribute('stroke-width', THEME_CONFIG.active.strokeWidth);
        
        moonPath.setAttribute('fill', 'var(--text)');
        moonPath.setAttribute('stroke', 'var(--text)');
        moonPath.setAttribute('stroke-width', THEME_CONFIG.inactive.strokeWidth);
    }
}

/**
 * Toggles between purple & amber themes
 */
function handleThemeToggle() {
    const html = document.documentElement;
    const toggleBtn = document.querySelector('.theme-toggle');
    const currentTheme = html.dataset.theme;
    const newTheme = (currentTheme === 'purple' ? 'amber' : 'purple');

    html.dataset.theme = newTheme;
    setCookie('theme', newTheme);
    updateThemeToggleVisuals(newTheme);
    toggleBtn.setAttribute('aria-pressed', String(newTheme === 'purple'));
}

// =================
// Cookie Utilities
// =================

/**
 * Returns value of a cookie by key name.
 * 
 * @param name - Cookie name to search for
 * @returns Cookie value or null if not found
 */
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    const targetCookie = cookies.find(x => x.startsWith(`${name}=`));
    if (!targetCookie) return null;

    const [key, value] = targetCookie.split('=');
    return value
}

/**
 * Writes a cookie with configurable expiration.
 * @param name - Cookie name
 * @param value - Value to store
 * @param maxAge - Expiration in seconds (default: 1 year)
 * @example setCookie('theme', 'dark')
 */
function setCookie(name, value, maxAge = 31536000) {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}

// ======================
// Init / Event Listeners
// ======================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme from cookie or default to purple
    let themeValue = getCookie('theme') ?? 'purple';

    document.documentElement.dataset.theme = themeValue;
    updateThemeToggleVisuals(themeValue);

    if (!getCookie('theme')) {
        setCookie('theme', themeValue);
    }
});

// Delegated click handler for dots & theme toggle
document.addEventListener('click', (e) => {
    if (e.target.matches('.dot')) {
        handleDotClick(e);
    }
    if (e.target.closest('.theme-toggle')) {
        handleThemeToggle();
    }
})