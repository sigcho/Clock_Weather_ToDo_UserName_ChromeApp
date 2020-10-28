const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

//시간 함수
function getTime(){ //콘솔에서 미리 해보기!
  const date = new Date(); //Date는 클래스다
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = //미니 if: 10보다 작을 경우 0을 붙인다 아니라면 원래
  `${hours < 10 ? `0${hours}` : hours}:${
    minutes <10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

//입력 함수 
function init(){
  getTime(); //항상 문제를 나눠서 풀자, 여기서 함수 호출
  setInterval(getTime, 1000); //시간을 1초마다 바꾸게 해준다
}

init();