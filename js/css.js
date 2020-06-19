(() => {
  // global_nav open하면 스크롤바 안생기도록 설정
  const gn_label = document.querySelector(".gn_label");
  gn_label.addEventListener("click", () => {
    document.body.classList.toggle("gn_noScroll");
  });

  window.addEventListener("resize", () => {
    const checkbox = document.querySelector("#gn_menuState");
    if (
      matchMedia("screen and (min-width: 768px)").matches &&
      checkbox.checked
    ) {
      checkbox.checked = false;
      document.body.classList.remove("gn_noScroll");
    }
  });
})();
