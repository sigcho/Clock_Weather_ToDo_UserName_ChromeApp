const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
  const image = new Image();
  image.src = `image/${imgNumber +1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER); //랜덤으로 0~2까지 3개 이미지 보여준다
  return number;
}

function init(){
  const randomNumber = genRandom();
  paintImage(randomNumber)
}

init();