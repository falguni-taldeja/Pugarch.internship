const toggleCheckbox = document.getElementById("toggle-checkbox");
const sliderIcon = document.querySelector(".slider .icon");

// Apply saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
  toggleCheckbox.checked = true;
  sliderIcon.textContent = "🌙";
} else {
  sliderIcon.textContent = "🌞";
}

toggleCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    sliderIcon.textContent = "🌙";
  } else {
    localStorage.setItem("theme", "light");
    sliderIcon.textContent = "🌞";
  }
});
