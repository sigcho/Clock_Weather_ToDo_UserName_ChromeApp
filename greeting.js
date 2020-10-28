const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser"; // "sigcho"처럼 유저이름이다
const SHOWING_CN ="showing";

function saveName(text){
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
  event.preventDefault(); //엔터를 눌렀을 때 default 되는 것을 막는다
  const currentValue = input.value; //input의 입력값을 저장
  paintGreeting(currentValue); //입력값을 넣어 환영한다
  saveName(currentValue); //입력값을 storage에 저장한다
}

function askForName(){
  form.classList.add(SHOWING_CN); //showing 추가한다 = form 보여준다
  form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text){
  form.classList.remove(SHOWING_CN); //greeting 보일땐 form지워야 한다
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  } else {
    paintGreeting(currentUser); //유저이름 호출
  }
}

function init(){
  loadName();
}

init();