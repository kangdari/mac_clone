window.addEventListener("resize", () => {
  const checkbox = document.querySelector("#gn_menuState");
  if (matchMedia("screen and (min-width: 768px)").matches && checkbox.checked) {
    checkbox.checked = false;
  }
});
