// 메모 생성하기
async function createMemo(content) {
  const response = await fetch("/memo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: content,
    }),
  }); // POST
  const response_obj = await response.json();
  readMemo(); // 서버 업데이트한 것 확인하기
}

// 메모 읽기
async function readMemo() {
  const response = await fetch("/memos");
  const response_obj = await response.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerText = "";
  response_obj.forEach(displayMemo);
}

// 메모 표출
function displayMemo(memo) {
  // 조회
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `${memo.content}`;

  // 수정
  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  // 삭제
  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제하기";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
}

// 메모 수정하기
async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요~!");

  const response = await fetch(`/memo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  }); // PUT
  readMemo();
}

// 메모 삭제하기
async function deleteMemo(event) {
  const id = event.target.dataset.id;
  console.log(id);
  const response = await fetch(`/memo/${id}`, {
    method: "DELETE",
  }); // DELETE
  readMemo();
}

// 제출했을 때
function handleSuimt(event) {
  event.preventDefault(); // 이벤트를 막는 함수
  // form은 동작하면 제출됨과 동시에 redirect를 하는 것을 preventDefault 메서드를 통해서 제거

  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

// form은 동작하면 제출됨과 동시에 redirect를 함
const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSuimt);

readMemo();
