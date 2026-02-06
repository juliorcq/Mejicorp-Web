const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header?.classList.add("bg-white/95", "shadow-md");
  } else {
    header?.classList.remove("bg-white/95", "shadow-md");
  }
});
