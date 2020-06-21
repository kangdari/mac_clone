"use strict";
(() => {
  let yOffset = 0; // 현재 스크롤 위치, window.pageYoffset
  let currentSection = 0; // 현재 활성화된 섹션
  let prevScrollHeight = 0; // 현재 활성화 섹션 이전 섹션들의 높이 합
  let changeSection = false; // 섹션이 바뀌는 순간 true
  // 각 section(scene)의 기본 정보
  const sectionInfo = [
    // section_1
    {
      type: "sticky", // sticky :
      heightNum: 2,
      scrollHeight: 0,
      obj: {
        container: document.querySelector("#scroll_section_1"),
        message1: document.querySelector("#scroll_section_1 .main_message1"),
        message2: document.querySelector("#scroll_section_1 .main_message2"),
      },
      value: {
        message1_opacity_out: [0, 1],
        // message1_opacity_out: [1, 0, { start: 0, end: 0.2 }],
      },
    },
    // section_2
    {
      type: "normal",
      heightNum: 2,
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

  const calcValue = (values, currentYoffset) => {
    let result;
    // 현재 섹션에서의 스크롤 위치 비율
    let scrollRatio = currentYoffset / sectionInfo[currentSection].scrollHeight;
    // 전체 범위 = 끝점 - 시작점
    // result = 현재 섹션 스크롤 비율 * (전체 범위) + 시작점
    // result는 현재 스크롤 위치에 해당하는 value 값
    result = scrollRatio * (value[1] - value[0]) + value[0];
    return result;
  };

  const playAnimation = () => {
    const obj = sectionInfo[currentSection].obj;
    const value = sectionInfo[currentSection].value;
    // 현재 섹션에서의 스크롤 위치 값
    const currentYoffset = yOffset - prevScrollHeight;
    switch (currentSection) {
      case 0:
        let message1_opacity_out = calcValue(
          value.message1_opacity_out,
          currentYoffset
        );
        obj.message1.style.opacity = `${message1_opacity_out}`;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  };

  // 스크롤 이벤트 발생 시 현재 섹션 계산 후 반영
  const scrollLoop = () => {
    changeSection = false;
    // 현재 섹션의 이전 섹션들의 높이 합
    prevScrollHeight = 0;
    for (let i = 0; i < currentSection; i++) {
      prevScrollHeight += sectionInfo[i].scrollHeight;
    }
    // 다음 섹션으로 바뀔 때
    if (yOffset > prevScrollHeight + sectionInfo[currentSection].scrollHeight) {
      currentSection++;
      changeSection = true;
      document.body.setAttribute("id", `show_section_${currentSection + 1}`);
    }
    // 이전 섹션으로 바뀔 때
    if (prevScrollHeight > yOffset) {
      // currentSection이 -1 되는 것을 방지
      if (currentSection === 0) return;
      currentSection--;
      changeSection = true;
      document.body.setAttribute("id", `show_section_${currentSection + 1}`);
    }

    if (changeSection) return; // 섹션이 바뀌는 순간에는 리턴
    playAnimation();
  };

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener("resize", setLayout);
  // window.addEventListener("load", setLayout);
  window.addEventListener("load", () => {
    setLayout();
    // opacity, transform
    const head_line = document.querySelector(".head_line");
    const section1_message = document.querySelector(
      "#scroll_section_1 .main_message2"
    );

    head_line.style.opacity = "1";
    head_line.style.transform = "translateY(0)";
    section1_message.style.opacity = "1";
    section1_message.style.transform = "translateY(0)";
  });
})();
