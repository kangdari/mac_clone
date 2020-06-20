(() => {
  // global_nav open하면 스크롤바 안생기도록 설정
  const gn_label = document.querySelector(".gn_label");
  gn_label.addEventListener("click", () => {
    document.body.classList.toggle("gn_noScroll");
  });

  window.addEventListener("resize", () => {
    if (matchMedia("screen and (min-width: 768px)").matches) {
      const checkbox = document.querySelector("#gn_menuState");
      const ln_checkbox = document.querySelector("#ln_menuState");
      if (checkbox.checked) {
        document.body.classList.remove("gn_noScroll");
        checkbox.checked = false;
      }
      if (ln_checkbox.checked) ln_checkbox.checked = false;
    }
  });

  const back = document.querySelector(".back");
  back.addEventListener("click", () => {
    const ln_checkbox = document.querySelector("#ln_menuState");
    ln_checkbox.checked = false;
  });
})();
