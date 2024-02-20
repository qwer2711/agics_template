// 메뉴선택
// function IndexActive__show(groupCode, no) {
//   $(".index-active-group-" + groupCode).removeClass("active");
//   $(".index-active-group-" + groupCode + "-" + no).addClass("active");
// }

/* *******************************************************
 * 설명 : 풀스크린 모드 감지
 ******************************************************** */

$(window).resize(function () {
  if ($(window).width() < 830) {
    $(".nav").addClass("active");
  } else {
    $(".nav").removeClass("active");
  }
});

var Common = (function () {
  return {
    init: function () {
      // Common.tabBox();
      Common.navActive();
      Common.programInstall();
      Common.moreFolder();
      Common.acodianMenu();
      Common.starScroe();
      Common.fishGame();
      Common.scrollTop();
    },

    sideMenuTree: function (groupCode, no) {
      $(".index-active-group").removeClass("active");
      $(".index-active-group-" + groupCode + "-" + no).addClass("active");
    },
    navActive: function () {
      $(".nav-close").click(function (e) {
        $(this).toggleClass("active");
        $(".nav").toggleClass("active");
      });

      $(window).resize(function () {
        if ($(window).width() < 830) {
          $(".nav").addClass("active");
        } else {
          $(".nav").removeClass("active");
        }
      });
    },
    // b-7
    tabBox: function (groupCode, no) {
      $(".tab-box > .head > ul > li").click(function () {
        var $this = $(this);
        var $current = $(".tab-box > .head > ul > li.active");
        $current.removeClass("active");
        $this.addClass("active");

        $(".tab-active-group").removeClass("active");
        $(".tab-active-group-" + groupCode + "-" + no).addClass("active");
      });
    },
    //b-10
    moreFolder: function () {
      $(".more").click(function () {
        if ($(".more").hasClass("more")) {
          $(".more").addClass("close").removeClass("more");
        } else if ($(".close").hasClass("close")) {
          $(".close").addClass("more").removeClass("close");
        }
      });
    },
    //b-13
    acodianMenu: function () {
      $(".aco > li").click(function () {
        if ($(this).hasClass("active")) {
          $(this).find(" > ul").stop().slideUp(300);
          $(this).removeClass("active");
        } else {
          $(this).find(" > ul").stop().slideDown(300);
          $(this).addClass("active");
        }
      });
    },
    //b-14
    scrollTop: function () {
      $(".top-fix").fadeOut();
      $(".cont.scroll").scroll(function () {
        var scrollTop = $(".cont.scroll").scrollTop();
        console.log(scrollTop);

        if (scrollTop > 100) {
          $(".top-fix").fadeIn();
        } else {
          $(".top-fix").fadeOut();
        }
      });
      $(".top-fix").click(function () {
        $(".cont.scroll").animate({ scrollTop: 0 }, 1000);
        return false;
      });
    },
    //b-15
    starScroe: function () {
      //별평점
      $(".star_rating a").click(function () {
        $(this).parent().children("a").removeClass("on");
        $(this).addClass("on").prevAll("a").addClass("on");
        return false;
      });
    },

    //c-1
    programInstall: function () {
      var text = null;
      $("#btnStart").click(function () {
        $(".bar_js_1")
          .stop()
          .animate(
            {
              width: 500,
            },
            2000,
            "linear",
            function () {
              text = "프로그램 설치완료";
              $("#txt_js_1").html(text);
            }
          );
      });
      $("#btnStop").click(function () {
        $(".bar_js_1").stop().animate(
          {
            width: 1,
          },
          2000,
          "swing"
        );
        text = "프로그램 설치취소";
        $("#txt_js_1").html(text);
      });
    },
    //c-2
    fishGame: function () {
      //물고기잡기

      var cnt = 0;
      var $score = null;
      var $fish = null;
      var play = false; //플래그변수
      var timeID = 0;

      $(document).ready(function () {
        //요소들 초기화
        init();
        //이벤트 등록
        initEvent();
      });

      function init() {
        $score = $("#score");
        $fish = $("#fish");
      }

      //이벤트 등록하기
      function initEvent() {
        //버튼을 누르면 게임시작
        $("#start").click(function () {
          alert("게임시작");
          startGame();
        });

        //물고기 클릭하면 점수가 증가
        $fish.click(function () {
          addScore();
        });
      }

      function startGame() {
        //플래그 변수로 false일때 게임 시작할 수 있게 만든다.
        if (play == false) {
          cnt = 0;
          $score.html(cnt);

          //게임 10초뒤에 종료
          checkEndGame();

          play = true;
          timeID = setInterval(function () {
            //물고기가 움직이기
            moveFish();
          }, 800);
        }
      }

      //점수를 증가시키는 addScore()구현
      function addScore() {
        if (play == true) {
          cnt++;
          $score.html(cnt);
        }
      }

      //물고기 움직이게 하는 moveFish()구현
      function moveFish() {
        //물고기크기 120*70
        //패널 600 * 400
        //물고기가 x축 이동영역 0~350
        //물고기가 y축 이동영역 0~300

        var x = parseInt(Math.random() * 350);
        var y = parseInt(Math.random() * 300);

        $fish.css({
          left: x,
          top: y,
        });
      }

      function checkEndGame() {
        //게임이 5초뒤에 종료가 되게한다.
        setTimeout(function () {
          play = false;
          //물고기 움직이는 타이머 종료함
          clearInterval(timeID);
          alert("게임종료");
        }, 10000);
      }
    },
  };
})();

window.addEventListener("load", function () {
  Common.init();
});
