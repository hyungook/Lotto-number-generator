/*
lotto.js

로또 관련 기능을 제공하는 자체 제작 라이브러리
*/

let isCreate = false;  // 생성중인 상태 표시
const lotto = new Array(6);  //  6칸짜리 배열
const creatingComment = ["생성중..","생성중...","생성중."]
let step = 0;  // 현재 생성된 번호의 개수
let intervalId = 0;  //  주기적인 동작의 데이터!



function resetNumbers(){
  
  clearNumbers();
  
  //  결과창을 싹 비우고, 자기 자신도 숨는다.
  $(".result").empty();
  $(".js-reset").hide();
  
}



function displayNumbers(){
  const nNumberContainer = $('<div>')  // div 생성!
  nNumberContainer.attr('class', 'cNumbers');
  for(let i = 0; i < 6; i++){
    const nNumber = $('<div>')
    nNumber.attr('class', 'cNumber');
    nNumber.text(`${lotto[i]}`);
    nNumberContainer.append(nNumber);
    
    nNumberContainer.css('display','none')
  }
  $(".result").append(nNumberContainer);
  nNumberContainer.fadeIn(1500);  //  보여지기 위해서는 먼저 display를 none으로
  
  $(".js-reset").show();
}




function clearNumbers(){
  $('.selected').removeClass('selected');
}





//  만들어진 번호 표시하기(500ms 마다 한번씩)
function pointNumbers(){
  
  $(`#no-${lotto[step]}`).addClass("selected");
  $(".ing").text(creatingComment[step%3])  //  step%3 = 숫자 제한
  step++;
  
  //  모든 번호에 대해서 조회사 끝났다면!
  if(step == 6){
    
    displayNumbers();
    
    $(".ing").removeClass("visible");
    clearInterval(intervalId);
    step = 0;
    isCreate = false;
  }
}





//  로또 번호 랜덤으로 생성하기
function createNumbers(){
  if(isCreate){
    //  만들어지고 있을 때는 만들기 함수 사용불가!
    return;
  }
  
  // 기존에 표시된 번호들 있다면, 다 지우고 시작!
  clearNumbers();
  
  isCreate=true;
  
  let count = 0;
  let mFlag = true;  //중복 검사용 데이터!
  while(count < 6){
    let number;
    number = parseInt(Math.random()*45)+1;  //parseInt 정수로
    for(let i = 0; i < count; i++){
      if(lotto[i] == number){
        mFlag = false;
      }
    }
    if(mFlag){
      lotto[count] = number;
      count++;
    }
    mFlag = true;
  }
  
  $('.ing').addClass("visible");
  console.log(lotto);
  
  //완성된 로또 번호를 가지고, 번호별 색칠하기!
  
  intervalId = setInterval(pointNumbers,500);
  
}




// 1to 45 숫자를 웹문서에 뿌려주기
function createWholeNumber(){
  for(let i = 1; i <= 45; i++){
    const numDiv = document.createElement('div')
    numDiv.innerHTML = `<p class="number">${i}</p>`;
    numDiv.id = `no-${i}`;
    $(".js-numbers").append(numDiv);
  }
}

// 시작할 때 해야할 일들을 하는 함수
function init(){
  createWholeNumber();
  $('.ing').removeClass("visible");
}

// 웬문서 로드가 완료되면 실핼될 실행문!!
$(document).ready(function(){
  init();
  $(".js-btn").click(createNumbers);
  $(".js-reset").click(resetNumbers);
  
})



























