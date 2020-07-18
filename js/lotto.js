let isCreate = false;
const lotto = new Array(6);
const creatingComment = ['생성중..','생성중...','생성중.']
let step = 0;
let intevalId = 0;

function createWholeNumber(){
  for(let i = 1; i <= 45; i++){
    const numDiv = document.createElement('div');
    numDiv.innerHTML = `<p class="number">${i}</p>`;
    numDiv.id = `no-${i}`;
    $('.js-numbers').append(numDiv);
  }
}

function clearNumbers(){
  $('.selected').removeClass('selected');
}

function pointNumbers(){
  $(`#no-${lotto[step]}`).addClass('selected');
  $('.ing').text(creatingComment[step%3])
  step++;
  console.log('ing...')
  if(step==6){
    clearInterval(intevalId)
    displayNumbers();
    $('.ing').removeClass("visible")
    step = 0;
    isCreate = false;
  }
}

function createNumbers(){
  if(isCreate) return;
  
  isCreate = true;
  clearNumbers();

  let count = 0;
  let mFlag = true;
  while(count < 6){
      let number;
      number = parseInt(Math.random()*45)+1
      for(let i=0; i<count; i++){
        if(lotto[i] == number) mFlag = false;
      }
      if(mFlag){
        lotto[count] = number;
        count++;
      }
      mFlag = true;
  }
  lotto.sort(function(a, b) {
    return a - b;
  }); // 오름차순 정렬
  $('.ing').addClass("visible")
  intevalId = setInterval(pointNumbers, 500)
}

function displayNumbers(){
  const nNumberContainer = $('<div>')
  nNumberContainer.attr('class', 'cNumbers');
  for(let i = 0 ; i < 6; i++){
    const nNumber = $('<div>');
    nNumber.attr('class', `cNumber`);
    nNumber.text(`${lotto[i]}`);
    if(lotto[i] < 10){
      nNumber.css('backgroundColor','orange')
    }else if(lotto[i] < 20){
      nNumber.css('backgroundColor','blue')
    }else if(lotto[i] < 30){
      nNumber.css('backgroundColor','red')
    }else if(lotto[i] < 40){
      nNumber.css('backgroundColor','yellowgreen')
    }else{
      nNumber.css('backgroundColor','purple')
    }
    nNumberContainer.append(nNumber);
    nNumberContainer.css('display', 'none');
  }
  $(".result").append(nNumberContainer)
  nNumberContainer.fadeIn(1500);
  $(".js-reset").show();
}
function resetNumbers(){
  clearNumbers();

  $(".result").empty();
  $('.js-reset').hide();
}
function init(){
  createWholeNumber();
  $('.ing').removeClass("visible")
}

$(document).ready(function(){

  init();
  $('.js-btn').click(createNumbers);
  $('.js-reset').click(resetNumbers);
  
});