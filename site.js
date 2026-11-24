let arr = JSON.parse(localStorage.getItem('checks')) || [{
  name : 'Panel Power',
  status : 'pending',
  id : '1'
},{
  name : 'Sensor Reading',
  status : 'pending',
  id : '2'
},{
  name : 'Controller Working',
  status : 'pending',
  id : '3'
},{
  name : 'Trip Status',
  status : 'pending',
  id : '4'
}];

function saveToStorage() {
  localStorage.setItem('checks', JSON.stringify(arr));
}

render();

function render() {
  let wholeHTML = '';

  arr.forEach((obj) => {
    wholeHTML += `<div class="check-row">
    <div class="check-name">${obj.name} - ${obj.status}</div>
    <div class="check-buttons">
      <button class="js-pass-btn" data-check-id="${obj.id}">Pass</button>
      <button class="js-fail-btn" data-check-id="${obj.id}">Fail</button>
      <button class="js-delete-btn" data-check-id="${obj.id}">Delete</button>
    </div>
  </div>`;
  });

  let passedcount = 0;
  let failedcount = 0;
  let pendingcount = 0;
  arr.forEach((obj) => {
    if (obj.status === 'passed') {
      passedcount++;
    } else if (obj.status === 'failed') {
      failedcount++;
    } else {
      pendingcount++;
    }
  });

  document.querySelector('.header')
    .innerHTML = 
    `<span>Passed : ${passedcount}</span>
    <span>Failed : ${failedcount}</span>
    <span>Pending : ${pendingcount}</span>`;

  document.querySelector('.names').innerHTML = wholeHTML;

  document.querySelectorAll('.js-pass-btn').forEach((button) => {
    button.addEventListener('click', () => {
      changeStatus(button.dataset.checkId, 'passed');
    });
  });

  document.querySelectorAll('.js-fail-btn').forEach((button) => {
    button.addEventListener('click', () => {
      changeStatus(button.dataset.checkId, 'failed');
    });
  });

  document.querySelectorAll('.js-delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
      deleteCheck(button.dataset.checkId);
    });
  });
}

// CHANGE STATUS OF CHECK
function changeStatus(id, newStatus) {
  let matchingObj;
  arr.forEach((obj) => {
    if (obj.id === id) {
      matchingObj = obj;
    }
  });
  matchingObj.status = newStatus;
  saveToStorage();
  render();
}

// DELETE CHECK
function deleteCheck(id) {
  const newArr = [];

  arr.forEach((obj) => {
    if (obj.id !== id) {
      newArr.push(obj);
    }
  });

  arr = newArr;
  saveToStorage();
  render();
}


// RESET BUTTON
const resetBtn = document.querySelector('.js-reset-btn');
resetBtn.addEventListener('click', () => {
  arr.forEach((obj) => {
    obj.status = 'pending';
  });
  saveToStorage();
  render();
});


// ADD new check
const inputElem = document.querySelector('.js-new');
const addBtn = document.querySelector('.js-add-btn');

addBtn.addEventListener('click', () => {
  const name = inputElem.value.trim();

  if (name !== '') {
    arr.push({
      name: name,
      status: 'pending',
      id: String(Date.now())
    });
    inputElem.value = '';
    saveToStorage();
    render();
  }
});