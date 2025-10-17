// app/static_src/js/index.js
function handleDotClick(e) {
  const sliderDots = document.querySelector(".slider-dots");
  const dotElements = [...sliderDots.children];
  const index = dotElements.indexOf(e.target);
  const slideTrack = document.querySelector(".slide-track");
  const sliderElements = [...slideTrack.children];
  const targetOffset = sliderElements[index].offsetLeft;
  slideTrack.scrollTo({ left: targetOffset });
  const indicator = sliderDots.querySelector(".indicator");
  const styles = getComputedStyle(sliderDots);
  const gap = parseFloat(styles.gap);
  const dotWidth = dotElements[0].getBoundingClientRect().width;
  indicator.style.transform = `translateX(${index * (dotWidth + gap)}px)`;
}
var sunPos = 75;
var moonPos = 25;
function handleThemeToggle(e) {
  const thing = e.target.closest(".thing");
  const sun = thing.querySelector(".sun");
  const moon = thing.querySelector(".moon");
  sunPos += 50;
  moonPos += 50;
  sun.style.offsetDistance = `${sunPos}%`;
  moon.style.offsetDistance = `${moonPos}%`;
}
document.addEventListener("click", (e) => {
  console.log(`Clicked: ${e.target.classList}`);
  if (e.target.matches(".dot")) {
    handleDotClick(e);
  }
  if (e.target.closest(".thing")) {
    handleThemeToggle(e);
  }
});

// app/static_src/js/theme-manager.js
function between(string, left, right) {
  const l = string.indexOf(left) + left.length;
  if (l === -1) return "";
  let r = string.indexOf(right);
  if (r === -1) r = string.length;
  return string.slice(l, r);
}
var themeMap = {
  sun: "light",
  moon: "dark",
  laptop: "system"
};
var reverseThemeMap = {
  light: "sun",
  dark: "moon",
  system: "laptop"
};
function getCookie() {
  const themeSelect = document.querySelector("#theme");
  if (!themeSelect) return;
  const cookie = document.cookie;
  const themeValue = between(cookie, "=", ";");
  themeSelect.value = reverseThemeMap[themeValue] ?? "laptop";
}
function setCookie() {
  const themeSelect = document.querySelector("#theme");
  if (!themeSelect) return;
  const themeSetting = themeSelect.value;
  const cookieVal = themeMap[themeSetting] ?? "system";
  document.cookie = `theme=${cookieVal}; path=/; max-age=31536000`;
}
function applyThemeFromCookie() {
  document.querySelector("#theme").dispatchEvent(new Event("change"));
}
document.addEventListener("DOMContentLoaded", () => {
  getCookie();
  applyThemeFromCookie();
  document.querySelector("#theme").addEventListener("change", setCookie);
});
//# sourceMappingURL=bundle.js.map
