
// =================
// Slider / Carousel
// =================

let sliderDots: HTMLDivElement;
let dotElements: HTMLButtonElement[];
let sliderTrack: HTMLDivElement;
let indicator: HTMLDivElement;


/**
 * Scrolls carousel to a specific slide index.
 * Mechanical action only, IntersectionObserver handles visual updates.
 * @param index Slide index to scroll to
 */
function navigateToIndex(index: number) {
    const sliderElements = Array.from(sliderTrack.children) as HTMLElement[];
    const el = sliderElements[index];
    if (!el) {
        console.warn('Error: index out of bounds')
        return;
    }
    const targetOffset = el.offsetLeft;
    sliderTrack.scrollTo({ left: targetOffset });
}

/**
 * Updates visual indicators for active slide (dot indicator position, aria-current)
 * Called exclusively by IntersectionObserver.
 * Ensures visuals always reflect actual scroll position, not 'what we wanted'.
 * @param index Slide index to mark as active
 */
function activateIndex(index: number) {
    // Position .indicator dot
    const styles = getComputedStyle(sliderDots);
    const gap = parseFloat(styles.gap);
    const dotWidth = dotElements[0]!.getBoundingClientRect().width;
    indicator.style.transform = `translateX(${(index * (dotWidth + gap))}px)`;

    // Update accessibility state
    dotElements.forEach((dot, i) => {
        if (i === index) {
            dot.setAttribute('aria-current', 'true');
        } else {
            dot.removeAttribute('aria-current');
        }
    });
}


// ======================
// Init / Event Listeners
// ======================


export function init() {
    sliderTrack = document.querySelector<HTMLDivElement>('.slider-track')!;
    sliderDots = document.querySelector<HTMLDivElement>('.slider-dots')!;
    dotElements = Array.from(sliderDots.querySelectorAll('.dot'));
    indicator = sliderDots.querySelector('.indicator')!;
    

    document.addEventListener('click', (e) => {
        if (!(e.target instanceof HTMLButtonElement)) {
            return;
        }
        if (e.target.matches('.dot')) {
                const index = dotElements.indexOf(e.target);
                navigateToIndex(index); // scroll only, no UI
        };
        // if (e.target.closest('.theme-toggle')) handleThemeToggle();
    });

    // Respect left/right arrow keys for carousel navigation
    document.addEventListener('keydown', (e) => {
        // Check if focus is inside the carousel
        const carouselContainer = document.querySelector('.slider-container');
        if (!carouselContainer?.contains(document.activeElement)) return;
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

        e.preventDefault();
        const slideWidth = sliderTrack.clientWidth;
        const currentIndex = Math.round(sliderTrack.scrollLeft / slideWidth);
        const maxIndex = dotElements.length -1;

        let newIndex: number;
        if (e.key === 'ArrowLeft') {
            newIndex = Math.max(0, currentIndex - 1);
        } else {
            newIndex = Math.min(maxIndex, currentIndex + 1);
        }

        navigateToIndex(newIndex);
    });

    // Source of truth for "which slide is visually active"
    const sliderElements = Array.from(sliderTrack.children) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const index = sliderElements.indexOf(e.target as HTMLElement);
                if (index === -1) console.log("index === -1");
                activateIndex(index); // only call this here
                console.log(`new idx: ${index}`)
            }
        });
    }, { root: sliderTrack, threshold: 0.7 });

    sliderElements.forEach(slide => observer.observe(slide));
}

document.addEventListener('DOMContentLoaded', init);