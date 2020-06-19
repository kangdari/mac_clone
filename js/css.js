(() => {
  const gn_btn = document.querySelector(".gn_header .gn_menuIcon");
  gn_btn.addEventListener("click", () => {
    const gn_search_container = document.querySelector(".gn_search_container");
    const gn_list = document.querySelector(".gn_list");
    const gn = document.querySelector(".gn");
    const gn_mark = document.querySelector(".gn_mark");

    gn.classList.toggle("open_menu");
    gn_search_container.classList.toggle("visible");
    gn_list.classList.toggle("visible");
    document.body.classList.toggle("open_menu");
    gn_mark.classList.toggle("open_menu");
  });
})();
