"use strict";
(() => {
  let yOffset = 0; // 현재 스크롤 위치, window.pageYoffset
  let currentSection = 0; // 현재 활성화된 섹션
  let prevScrollHeight = 0; // 현재 활성화 섹션 이전 섹션들의 높이 합
  // 각 section(scene)의 기본 정보
  const sectionInfo = [
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
    for (let i = 0; i < sectionInfo.length; i++) {
      sectionInfo[i].scrollHeight =
        sectionInfo[i].heightNum * window.innerHeight;
      sectionInfo[
        i
      ].obj.container.style.height = `${sectionInfo[i].scrollHeight}px`;
    }
    // 현재 스크롤 위치
    yOffset = window.pageYOffset;
    // 현재 활성화 섹션 구하기
    let totalHeight = 0;
    for (let i = 0; i < sectionInfo.length; i++) {
      totalHeight += sectionInfo[i].scrollHeight;
      if (totalHeight > yOffset) {
        currentSection = i; // 현재 활성화 섹션
        break;
      }
    }
    // 현재 활성화 섹션을 body의 id 값으로 설정
    document.body.setAttribute("id", `show_section_${currentSection + 1}`);
  };

  // 스크롤 이벤트 발생 시 현재 섹션 계산 후 반영
  const scrollLoop = () => {
    // 현재 섹션의 이전 섹션들의 높이 합
    prevScrollHeight = 0;
    for (let i = 0; i < currentSection; i++) {
      prevScrollHeight += sectionInfo[i].scrollHeight;
    }
    // 다음 섹션으로 바뀔 때
    if (yOffset > prevScrollHeight + sectionInfo[currentSection].scrollHeight) {
      currentSection++;
      document.body.setAttribute("id", `show_section_${currentSection + 1}`);
    }
    // 이전 섹션으로 바뀔 때
    if (prevScrollHeight > yOffset) {
      // currentSection이 -1 되는 것을 방지
      if (currentSection === 0) return;
      currentSection--;
      document.body.setAttribute("id", `show_section_${currentSection + 1}`);
    }
    console.log(currentSection + 1);
  };

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout);
})();
