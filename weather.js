const weatehr = document.querySelector(".js-weather");

const API_KEY = "f701fce2f7c115c5c3da2b4229e31147" // Open Weather Map이라는 외부 API 사용한다
const COORDS = "coords";

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(function(response){
    return response.json(); 
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weatehr.innerText = `${temperature} @ ${place}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//위도, 경도 알아내기
function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, //자바스크립트에서 변수와 key의 값이 같으면(ex. good: good) 하나로 합칠 수 있음
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude)

}

function handleGeoError(){
  console.log('Cant access geo location')
}

//위치 정보 읽기
function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError) //성공했을 때, 실패했을 때
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();