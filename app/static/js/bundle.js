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
function updateThemeToggleVisuals(themeValue) {
  const isPurpleTheme = themeValue === "purple";
  console.log(`updateThemeToggleVisuals reads theme as: ${themeValue}`);
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  sun.style.offsetDistance = isPurpleTheme ? "10%" : "65%";
  moon.style.offsetDistance = isPurpleTheme ? "65%" : "10%";
  sun.style.opacity = isPurpleTheme ? "0.3" : "1";
  moon.style.opacity = isPurpleTheme ? "1" : "0.3";
  const sunPath = sun.querySelector("path");
  const moonPath = moon.querySelector("path");
  if (isPurpleTheme) {
    moonPath.setAttribute("fill", "url(#moon-gradient)");
    moonPath.setAttribute("stroke", "url(#moon-gradient)");
    moonPath.setAttribute("stroke-width", "1.5");
    sunPath.setAttribute("fill", "var(--text)");
    sunPath.setAttribute("stroke", "var(--text)");
    sunPath.setAttribute("stroke-width", "2.2");
  } else {
    sunPath.setAttribute("fill", "url(#sun-gradient)");
    sunPath.setAttribute("stroke", "url(#sun-gradient)");
    sunPath.setAttribute("stroke-width", "1.5");
    moonPath.setAttribute("fill", "var(--text)");
  }
  sun.style.transform = `translate(-50%, -50%) scale(${isPurpleTheme ? 0.4 : 1.2})`;
  moon.style.transform = `translate(-50%, -50%) scale(${isPurpleTheme ? 1.2 : 0.4})`;
}
function handleThemeToggle(e) {
  const html = document.querySelector("html");
  const currentTheme = html.dataset.theme;
  const newTheme = currentTheme === "purple" ? "amber" : "purple";
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
  return themeValue;
}
function setCookie(themeValue) {
  document.cookie = `theme=${themeValue}; path=/; max-age=31536000`;
  document.querySelector("html").dataset.theme = themeValue;
}
function applyTheme(themeValue) {
  const html = document.querySelector("html");
  html.dataset.theme = themeValue;
}
document.addEventListener("DOMContentLoaded", () => {
  const themeValue = getCookie();
  applyTheme(themeValue);
  updateThemeToggleVisuals(themeValue);
});
document.addEventListener("click", (e) => {
  console.log(`Clicked: ${e.target.classList}`);
  if (e.target.matches(".dot")) {
    handleDotClick(e);
  }
  if (e.target.closest(".theme-toggle")) {
    handleThemeToggle(e);
  }
});
//# sourceMappingURL=bundle.js.map
