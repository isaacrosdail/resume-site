
// Scrollspy logic (for homepage anchor links)
const sections = document.querySelectorAll("section[id]");

// Only run scrollspy logic if sections exist
if (sections.length > 0) {
    const navLinks = document.querySelectorAll("nav a[data-section]");
    
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const top = section.offsetTop - 72; // adjust for nav height
            if (pageYOffset >= top) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("bg-gray-700"); // remove active class
            if (link.dataset.section === current) {
                link.classList.add("bg-gray-700"); // add active class
            }
        });
    });
}

