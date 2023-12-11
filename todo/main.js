// 1. input에서 text 타이핑
// 2. + 버튼 클릭하거나 input에서 엔터를 눌렀을 때 리스트에 추가
// 3. 등록된 아이템은 list에 표기
// 4. 쓰레기통 버튼 누르면 list에서 삭제

const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');

function onAdd() {
  // 1.사용자가 입력한 텍스트 받아오기
  const text = input.value;

  // 유효성 검사 - 빈 값 입력시
  if (text === '') {
    alert('할 일을 입력해주세요!');
    input.focus();
    return;
  }

  // 2. 새로운 아이템 생성(텍스트 + 삭제 버튼)
  const item = createItem(text);

  // 3. items 컨테이너 안에 새로 만든 아이템 추가
  items.appendChild(item);

  // 4. input 초기화
  input.value = '';
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const name = document.createElement('span');
  name.setAttribute('class', 'item_name');
  name.innerText = text;

  const itemDivider = document.createElement('div');
  itemDivider.setAttribute('class', 'item_divider');

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'item_delete');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.addEventListener('click', () => {
    items.removeChild(itemRow);
  });

  item.appendChild(name);
  item.appendChild(deleteBtn);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);

  return itemRow;
}

addBtn.addEventListener('click', (e) => {
  onAdd();
});

// 엔터 입력 시
input.addEventListener('keypress', (event) => {
  console.log('enter');
  if (event.key === 'Enter') {
    onAdd();
  }
});
