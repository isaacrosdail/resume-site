
type ThemeValue = 'amber' | 'purple';

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


// =================
// Theme Toggle
// =================


/**
 * Updates visual state of theme toggle (sun/moon positions, gradients, sizes)
 * @param {string} themeValue - Theme to update visuals to (eg, purple or amber)
 */
function updateThemeToggleVisuals(themeValue: ThemeValue) {
    const isPurpleTheme = (themeValue === 'purple');
    const sun = document.querySelector<SVGElement>('.sun')!;
    const moon = document.querySelector<SVGElement>('.moon')!;
    const sunPath = sun.querySelector<SVGPathElement>('path')!;
    const moonPath = moon.querySelector<SVGPathElement>('path')!;

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
    const toggleBtn = document.querySelector<HTMLButtonElement>('.theme-toggle')!;
    const currentTheme = html.dataset["theme"];
    const newTheme: ThemeValue = (currentTheme === 'purple' ? 'amber' : 'purple');

    html.dataset["theme"] = newTheme;
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
function getCookie(name: string) {
    const cookies = document.cookie.split('; ');
    const targetCookie = cookies.find(x => x.startsWith(`${name}=`));
    if (!targetCookie) return null;

    const [_key, value] = targetCookie.split('=');
    return value
}

/**
 * Writes a cookie with configurable expiration.
 * @param name - Cookie name
 * @param value - Value to store
 * @param maxAge - Expiration in seconds (default: 1 year)
 * @example setCookie('theme', 'dark')
 */
function setCookie(name: string, value: string, maxAge = 31536000) {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}


export function init() {
    // Initialize theme from cookie or default to purple
    const raw = getCookie('theme');
    const themeValue: ThemeValue =(raw === 'amber' || raw === 'purple') 
        ? raw
        : 'purple';

    document.documentElement.dataset["theme"] = themeValue;
    updateThemeToggleVisuals(themeValue);
    if (!getCookie('theme')) {
        setCookie('theme', themeValue);
    }

    document.addEventListener('click', (e) => {
        if ((e.target as HTMLButtonElement).closest('.theme-toggle')) handleThemeToggle();
    });
}

document.addEventListener('DOMContentLoaded', init);