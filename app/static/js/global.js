
// LANGUAGE TOGGLE
// Store a cookie when toggle is pressed as a test first
const langToggle = document.getElementById("language-toggle");

const langSelect = document.getElementById("lang-select");

langToggle.onclick = () => {

    console.log("Language toggle clicked!");
    // Reveal dropdown menu
    langSelect.classList.remove("hidden");
    console.log("Dropdown shown!");

    const gerSelect = document.getElementById("toggle-de");
    const engSelect = document.getElementById("toggle-en");
    
    if (gerSelect) {
        gerSelect.onclick = () => {
            document.cookie = "lang=de; path=/"; // Set cookie for lang to DE
            location.reload();                   // Reload to apply change
        }
    }
    if (engSelect) {
        engSelect.onclick = () => {
            document.cookie = "lang=en; path=/";
            location.reload();
        }
    }
    // Close dropdown if clicking anywhere outside of it
    // DIVE IN TO HOW THIS WORKS EXACTLY LATER
    document.addEventListener("click", (e) => {
        if (!langSelect.contains(e.target) && !langToggle.contains(e.target)) {
            langSelect.classList.add("hidden");
        }
    });

}