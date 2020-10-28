const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];  //배열로 만든다  //바뀌면 안되기 때문에 let으로 한다

//todo 지우기
function deleteToDo(event){
  const btn = event.target;  //event의 .target은 버튼이 계속 뜨게한다  
  const li = btn.parentNode;  //.parentNode는 부모의 값이다
  toDoList.removeChild(li);  //li의 자식을 지운다
  const cleanToDos = toDos.filter(function(toDo){  //filterFn은 toDos(=array)의 모든 아이템들을 지나가면서 true인 값만 있는 배열 만든다
    return toDo.id !== parseInt(li.id);  //li에 없는 id인 toDos를 체크하고 싶다  //parseInt는 string을 숫자로 바꾼다
  })
  toDos = cleanToDos //같은 값으로 바꾼다
  saveToDos();  //함수 호출, toDos를 저장한다
}

//로컬에 저장하기
function saveToDos(){  //toDos에서 가져와서 로컬에 저장한다
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON 이용해서 글자화 한다, 그래야 로컬에 저장된다, 로컬은 문자만 저장되기 때문
}

//화면에 표시하기
function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length+1; //b.length +1 하면 1이 나온다
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);  //delBtn을 li에 넣는다
  li.appendChild(span);  //span을 li에 넣는다
  li.id = newId; //li에도 id값 주기 위해서이다
  toDoList.appendChild(li);  //li를 toDoList에 넣는다
  const toDoObj = {
    text: text,
    id: newId  
  };
  toDos.push(toDoObj); //toDos array안에 toDoObj 넣는다
  saveToDos();  //push해서 들어가고 난 뒤에 saveToDos()를 호출해야 한다
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; //입력후에 초기화한다
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){  
    const parsedToDos = JSON.parse(loadedToDos);  //parse를 해주면 object로 바뀐다
    parsedToDos.forEach(function(toDo){ //array에 있는 것들에 각각 함수 실행
      paintToDo(toDo.text);  //paintToDo에 있는 것이 자동으로 출력된다, 로컬에 저장해놨기 때문
    });
  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}

init();