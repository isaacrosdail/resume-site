
// LANGUAGE TOGGLE
// Store a cookie when toggle is pressed as a test first
const langToggle = document.getElementById("language-toggle");

const langSelect = document.getElementById("lang-select");
const gerSelect = document.getElementById("german");
const engSelect = document.getElementById("english");
langToggle.onclick = () => {

    // Reveal dropdown menu
    langSelect.classList.remove("hidden");
    gerSelect.onclick = () => {
        document.cookie = "lang=de; path=/"; // Set cookie for lang to DE
        location.reload();                   // Reload to apply change
    }
    engSelect.onclick = () => {
        document.cookie = "lang=en; path=/";
        location.reload();
    }
    // document.cookie = "firstName=SpongeBob"

    //console.log(document.cookie);
    //alert(document.cookie);
}