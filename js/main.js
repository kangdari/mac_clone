"use strict";
(() => {
  // 각 section(scene)의 기본 정보
  const sceneInfo = [
    // section_1
    {
      type: "sticky", // sticky :
      heightNum: 2,
      scrollHeight: 0,
      obj: {
        container: document.querySelector("#scroll_section_1"),
      },
    },
    // section_2
    {
      type: "normal",
      heightNum: 1,
      scrollHeight: 0,
      obj: {
        container: document.querySelector("#scroll_section_2"),
      },
    },
    // section_3
    {
      type: "sticky",
      heightNum: 2,
      scrollHeight: 0,
      obj: {
        container: document.querySelector("#scroll_section_3"),
      },
    },
    // section_4
    {
      type: "sticky",
      heightNum: 2,
      scrollHeight: 0,
      obj: {
        container: document.querySelector("#scroll_section_4"),
      },
    },
  ];

  // 섹션 높이 설정
  const setLayout = () => {
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].obj.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    // console.log(sceneInfo);
  };

  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout);
})();
