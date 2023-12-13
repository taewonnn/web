// 1. input에서 text 타이핑
// 2. + 버튼 클릭하거나 input에서 엔터를 눌렀을 때 리스트에 추가
// 3. 등록된 아이템은 list에 표기
// 4. 쓰레기통 버튼 누르면 list에서 삭제

const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');

/**
 * 입력 함수
 */
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

  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: 'center' });

  // 5. input 초기화
  input.value = '';
  input.focus();
}

// UUID 사용하는 것이 더 좋은 방법
let id = 0;

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');
  itemRow.setAttribute('data-id', id);

  itemRow.innerHTML = `
    <div class="item">
      <span class="item_name">${text}</span>
      <button class="item_delete">
        <i class="fa-solid fa-trash" data-id=${id}></i>
      </button>
    </div>
    <div class="item_divider"></div>
  `;

  id++;
  return itemRow;

  // const item = document.createElement('div');
  // item.setAttribute('class', 'item');

  // const name = document.createElement('span');
  // name.setAttribute('class', 'item_name');
  // name.innerText = text;

  // const itemDivider = document.createElement('div');
  // itemDivider.setAttribute('class', 'item_divider');

  // const deleteBtn = document.createElement('button');
  // deleteBtn.setAttribute('class', 'item_delete');
  // deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  // // 삭제 버튼 마다 모두 addEventListner를 추가하는 것은 비효율적!
  // deleteBtn.addEventListener('click', () => {
  //   items.removeChild(itemRow);
  // });

  // item.appendChild(name);
  // item.appendChild(deleteBtn);

  // itemRow.appendChild(item);
  // itemRow.appendChild(itemDivider);

  // return itemRow;
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

// 이벤트 위임
items.addEventListener('click', (event) => {
  // console.log(event.target);
  const id = event.target.dataset.id;
  if (id) {
    // console.log('find!');
    const toBeDeleted = document.querySelector(`.item_row[data-id='${id}']`);
    toBeDeleted.remove();
  }
});
