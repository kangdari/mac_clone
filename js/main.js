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
      type: "sticky",
      heightNum: 2.5,
      scrollHeight: 0,
      obj: {
        container: document.querySelector("#scroll_section_1"),
        message1: document.querySelector("#scroll_section_1 .main_message1"),
        message2: document.querySelector("#scroll_section_1 .main_message2"),
        small_text: document.querySelector("#scroll_section_1 .section_small_text"),
        main_text: document.querySelector("#scroll_section_1 .section_main_text"),
        // canvas 추가
        canvas: document.querySelector("#video_canvas_1"), // section_1의 canvas 객체
        context: document.querySelector("#video_canvas_1").getContext("2d"), // canvas의 context
        videoImages: [],
      },
      values: {
        videoImgCounts: 122, // img 개수
        imgSequence: [0, 121, { start: 0, end: 0.5 }], // 시작, 끝 인덱스
        message1_opacity: [1, 0, { start: 0, end: 0.2 }],
        message1_transform: [0, -90, { start: 0, end: 0.2 }],
      },
    },
    // section_2
    {
      type: "normal",
      heightNum: 1.04,
      scrollHeight: 0,
      obj: {
        container: document.querySelector("#scroll_section_2"),
        message1: document.querySelector("#scroll_section_2 .main_message1"),
        message2: document.querySelector("#scroll_section_2 .main_message2"),
        message3: document.querySelector("#scroll_section_2 .main_message3"),
        message4: document.querySelector("#scroll_section_2 .main_message4"),
        message5: document.querySelector("#scroll_section_2 .main_message5"),
        message6: document.querySelector("#scroll_section_2 .main_message6"),
      },
      values: {
        message1_opacity: [0, 1, { start: 0.03, end: 0.13 }],
        message2_opacity: [0, 1, { start: 0.03, end: 0.13 }],
        message3_opacity: [0, 1, { start: 0.1, end: 0.2 }],
        message4_opacity: [0, 1, { start: 0.1, end: 0.2 }],
        message5_opacity: [0, 1, { start: 0.17, end: 0.27 }],
        message6_opacity: [0, 1, { start: 0.17, end: 0.27 }],
        message1_transform: [15, 0, { start: 0.03, end: 0.13 }],
        message2_transform: [15, 0, { start: 0.03, end: 0.13 }],
        message3_transform: [15, 0, { start: 0.1, end: 0.2 }],
        message4_transform: [15, 0, { start: 0.1, end: 0.2 }],
        message5_transform: [15, 0, { start: 0.17, end: 0.27 }],
        message6_transform: [15, 0, { start: 0.17, end: 0.27 }],
      },
    },
    // section_3
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      obj: {
        container: document.querySelector("#scroll_section_3"),
        message1: document.querySelector("#scroll_section_3 .main_message1"),
        message2: document.querySelector("#scroll_section_3 .main_message2"),
        message3: document.querySelector("#scroll_section_3 .main_message3"),
        canvas: document.querySelector("#scroll_section_3 .image_blend_canvas"),
        context: document.querySelector("#scroll_section_3 .image_blend_canvas").getContext("2d"),
        imagesPath: ["../image/section_4_img_1.jpg", "../image/section_4_img_2.jpg"],
        images: [],
      },
      values: {
        message1_opacity: [0, 1, { start: 0, end: 0.2 }],
        message2_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        message2_opacity_out: [1, 0, { start: 0.65, end: 0.75 }],
        message3_opacity: [0, 1, { start: 0.2, end: 0.3 }],
        message3_transform: [10, 0, { start: 0.2, end: 0.3 }],
        // 화면 크기에 따라 값이 변하기때문에 스크롤 이벤트 발생 시 값 설정
        rect_left_X: [0, 0, { start: 0, end: 0 }],
        rect_right_X: [0, 0, { start: 0, end: 0 }],
        rectStartY: 0, // blend_canvas 애니메이션 시작점 설정
      },
    },
    // section_4
    {
      type: "sticky",
      heightNum: 2,
      scrollHeight: 0,
      obj: {
        container: document.querySelector("#scroll_section_4"),
        message1: document.querySelector("#scroll_section_4 .main_message1"),
        message2: document.querySelector("#scroll_section_4 .main_message2"),
      },
      values: {
        message1_opacity: [0, 1, { start: 0.1, end: 0.2 }],
        message2_opacity: [0, 1, { start: 0.1, end: 0.2 }],
      },
    },
  ];

  // canvas에 그릴 img 배열 설정
  const setCanvasImg = () => {
    let imgElem;
    for (let i = 0; i < sectionInfo[0].values.videoImgCounts; i++) {
      imgElem = new Image();
      imgElem.src = `../video/macbook/${i}.jpg`;
      sectionInfo[0].obj.videoImages.push(imgElem);
    }

    // section_3
    let imgElem3;
    for (let i = 0; i < sectionInfo[2].obj.imagesPath.length; i++) {
      imgElem3 = new Image();
      imgElem3.src = sectionInfo[2].obj.imagesPath[i];
      sectionInfo[2].obj.images.push(imgElem3);
    }
  };

  // 섹션 높이 설정
  const setLayout = () => {
    for (let i = 0; i < sectionInfo.length; i++) {
      sectionInfo[i].scrollHeight = sectionInfo[i].heightNum * window.innerHeight;
      sectionInfo[i].obj.container.style.height = `${sectionInfo[i].scrollHeight}px`;
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

    // canvas 크기 설정
    // const heightRatio = window.innerHeight / 1080;
    sectionInfo[0].obj.canvas.style.transform = `translate3d(-50%, 0, 0)`;
  };

  const calcValue = (values, currentYoffset) => {
    let result;
    // 현재 섹션 높이
    const scrollHeight = sectionInfo[currentSection].scrollHeight;
    // 현재 섹션에서의 스크롤 위치 비율
    let scrollRatio = currentYoffset / scrollHeight;

    // 시작, 끝 점이 있을 때
    if (!!values[2]) {
      const startPoint = scrollHeight * values[2].start; // 섹션에서 시작 위치 비율
      const endPoint = scrollHeight * values[2].end; // 섹션에서 끝점 위치 비율
      const animationPoint = endPoint - startPoint;
      if (currentYoffset >= startPoint && currentYoffset <= endPoint) {
        // animationPoint 구간에서의 스크롤 위치 비율
        result =
          ((currentYoffset - startPoint) / animationPoint) * (values[1] - values[0]) + values[0];
      } else if (currentYoffset < startPoint) {
        result = values[0];
      } else if (currentYoffset > endPoint) {
        result = values[1];
      }
    } else {
      // 전체 범위 = 끝점 - 시작점
      // result = 현재 섹션 스크롤 비율 * (전체 범위) + 시작점
      // result는 현재 스크롤 위치에 해당하는 value 값
      result = scrollRatio * (values[1] - values[0]) + values[0];
    }
    return result;
  };

  const playAnimation = () => {
    const obj = sectionInfo[currentSection].obj;
    const values = sectionInfo[currentSection].values;
    // 현재 섹션에서의 스크롤 위치 값
    const currentYoffset = yOffset - prevScrollHeight;
    const scrollHeight = sectionInfo[currentSection].scrollHeight; // 현재 섹션 높이
    const scrollRatio = currentYoffset / scrollHeight; // 현재 섹션에서의 스크롤 위치 비율

    switch (currentSection) {
      case 0:
        // 스크롤 구간에 따른 분기 처리
        if (scrollRatio <= 0.25) {
          obj.message1.style.opacity = calcValue(values.message1_opacity, currentYoffset);
          obj.message1.style.transform = `translate3d(-50%, ${calcValue(
            values.message1_transform,
            currentYoffset
          )}%, 0)`;
        }
        if (scrollRatio <= 0.55) {
          // 배열의 인덱스는 정수
          let sequence = Math.round(calcValue(values.imgSequence, currentYoffset));
          // canvas에 그리기
          obj.context.drawImage(obj.videoImages[sequence], 0, 0);
        }
        break;
      case 1:
        // section_2
        obj.message1.style.opacity = calcValue(values.message1_opacity, currentYoffset);
        obj.message2.style.opacity = calcValue(values.message2_opacity, currentYoffset);
        obj.message3.style.opacity = calcValue(values.message3_opacity, currentYoffset);
        obj.message4.style.opacity = calcValue(values.message4_opacity, currentYoffset);
        obj.message5.style.opacity = calcValue(values.message5_opacity, currentYoffset);
        obj.message6.style.opacity = calcValue(values.message6_opacity, currentYoffset);
        obj.message1.style.transform = `translate3d(0, ${calcValue(
          values.message1_transform,
          currentYoffset
        )}%,0)`;
        obj.message2.style.transform = `translate3d(0, ${calcValue(
          values.message2_transform,
          currentYoffset
        )}%,0)`;
        obj.message3.style.transform = `translate3d(0, ${calcValue(
          values.message3_transform,
          currentYoffset
        )}%,0)`;
        obj.message4.style.transform = `translate3d(0, ${calcValue(
          values.message4_transform,
          currentYoffset
        )}%,0)`;
        obj.message5.style.transform = `translate3d(0, ${calcValue(
          values.message5_transform,
          currentYoffset
        )}%,0)`;
        obj.message6.style.transform = `translate3d(0, ${calcValue(
          values.message6_transform,
          currentYoffset
        )}%,0)`;

        break;
      case 2:
        // section_3
        // blend_canvas
        // 브라우저 크기에 맞춰 캔버스 크기를 조절하기 위해서 width, height 비율 계산
        const widthRatio = window.innerWidth / obj.canvas.width;
        const heightRatio = window.innerHeight / obj.canvas.height;
        // canvas에 적용할 비율
        let canvasRatio;

        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉
          canvasRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창이 납작
          canvasRatio = widthRatio;
        }
        // canvas 크기 조절 및 img 그리기
        obj.canvas.style.transform = `scale(${canvasRatio})`;
        obj.context.drawImage(obj.images[0], 0, 0, 1920, 1080);

        // 컨버스 크기에 맞춰 가정한 innerWidth, innerHeight
        // document.body.offsetWidth: 스크롤 너비를 제외한 화면 넓이
        const recalculatedInnerWidth = document.body.offsetWidth / canvasRatio;
        // const recalculatedInnerHeight = window.innerHeight / canvasRatio;
        // 값이 없을 때만 실행됨
        if (!values.rectStartY) {
          // getBoundingClientRect()은 스크롤의 속도에 따라 리턴값이 다름.
          // values.rectStartY = obj.canvas.getBoundingClientRect().top;
          // offsetTop: 부모를 기준으로 한 요소의 위치 값
          values.rectStartY =
            obj.canvas.offsetTop + (obj.canvas.height - obj.canvas.height * canvasRatio) / 2;
          // blend_canvas 애니메이셔 시작, 끝 비율 설정
          values.rect_left_X[2].start = window.innerHeight / 5 / scrollHeight;
          values.rect_right_X[2].start = window.innerHeight / 5 / scrollHeight;
          values.rect_left_X[2].end = values.rectStartY / scrollHeight;
          values.rect_right_X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect_left_X[0] = (obj.canvas.width - recalculatedInnerWidth) / 2; // 왼쪽 흰박스 시작점
        values.rect_left_X[1] = values.rect_left_X[0] - whiteRectWidth; // 왼쪽 흰박스 끝점
        values.rect_right_X[0] = values.rect_left_X[0] + recalculatedInnerWidth - whiteRectWidth; // 우측 박스 흰박스 시작점
        values.rect_right_X[1] = values.rect_right_X[0] + whiteRectWidth; // 끝점

        obj.context.fillStyle = "white";
        // 좌 우 흰박스 그리기
        // obj.context.fillRect(values.rect_left_X[0], 0, parseInt(whiteRectWidth), obj.canvas.height);
        // obj.context.fillRect(
        //   values.rect_right_X[0],
        //   0,
        //   parseInt(whiteRectWidth),
        //   obj.canvas.height
        // );
        // 좌 우 흰박스 그리기 애니메이션
        obj.context.fillRect(
          parseInt(calcValue(values.rect_left_X, currentYoffset)),
          0,
          parseInt(whiteRectWidth),
          obj.canvas.height
        );
        obj.context.fillRect(
          parseInt(calcValue(values.rect_right_X, currentYoffset)),
          0,
          parseInt(whiteRectWidth),
          obj.canvas.height
        );

        obj.message1.style.opacity = calcValue(values.message1_opacity, currentYoffset);
        obj.message3.style.opacity = calcValue(values.message3_opacity, currentYoffset);
        obj.message3.style.transform = `translate3d(0, ${calcValue(
          values.message3_transform,
          currentYoffset
        )}%, 0)`;
        if (scrollRatio < 0.63) {
          obj.message2.style.opacity = calcValue(values.message2_opacity_in, currentYoffset);
        } else {
          obj.message2.style.opacity = calcValue(values.message2_opacity_out, currentYoffset);
        }

        break;
      case 3:
        // section_4
        obj.message1.style.opacity = calcValue(values.message1_opacity, currentYoffset);
        obj.message2.style.opacity = calcValue(values.message2_opacity, currentYoffset);
        break;
    }
  };

  const checkMenu = () => {
    // gn 높이 48px
    if (yOffset >= 48) {
      document.body.classList.add("ln_sticky");
    } else {
      document.body.classList.remove("ln_sticky");
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
    checkMenu();
    scrollLoop();
  });

  window.addEventListener("resize", setLayout);
  // window.addEventListener("load", setLayout);
  window.addEventListener("load", () => {
    setLayout();
    // 문서 첫 로드시 transition 이벤트
    const obj = sectionInfo[0].obj;
    obj.small_text.style.opacity = "1";
    obj.small_text.style.transform = "translateY(0)";
    obj.main_text.style.opacity = "1";
    obj.main_text.style.transform = "translateY(0)";
    obj.message2.style.opacity = "1";
    obj.message2.style.transform = "translateY(0)";
  });
  setCanvasImg();
})();
