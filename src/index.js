import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

import { updateIndex, updateElementId } from './modules/update-index.js';

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
};

const $listContainer = document.getElementById('list-container');
const $textNewTask = document.getElementById('textNewTask');
const $addButton = document.querySelector('.add-button');

let toDoTasks = [];

const addTask = () => {
  const $taskContainer = document.createElement('div');
  $taskContainer.setAttribute('id', toDoTasks.length + 1);
  $taskContainer.classList.add('task-container', 'input-group', 'mb-3');
  $listContainer.appendChild($taskContainer);

  const $checkBoxContainer = document.createElement('div');
  $checkBoxContainer.classList.add('input-group-text', 'bg-light', 'text-dark');
  $taskContainer.appendChild($checkBoxContainer);

  const $checkBox = document.createElement('input');
  $checkBox.setAttribute('id', 'checkbox');
  $checkBox.classList.add('form-check-input', 'mt-0');
  $checkBox.setAttribute('type', 'checkbox');
  $checkBox.setAttribute('value', '');
  $checkBox.setAttribute('aria-label', 'Checkbox for following text input');
  $checkBoxContainer.appendChild($checkBox);

  $checkBox.addEventListener('click', () => {
    $checkBox.parentElement.nextElementSibling.classList.toggle('line-through');
    $checkBox.parentElement.parentElement.lastElementChild.classList.toggle('trash-active');
    $checkBox.parentElement.parentElement.lastElementChild.previousElementSibling.classList.toggle('hidden');
  })

  const $placeHolderTask = document.createElement('span');
  $placeHolderTask.classList.add('form-control');
  $placeHolderTask.setAttribute('type', 'text');
  $placeHolderTask.innerText = $textNewTask.value;
  $placeHolderTask.setAttribute('aria-label', 'Text input with checkbox');
  $taskContainer.appendChild($placeHolderTask);

  const $dotsOption = document.createElement('a');
  $dotsOption.classList.add('edit-button', 'bi', 'bi-three-dots-vertical', 'bg-secondary', 'text-white');
  $taskContainer.appendChild($dotsOption);

  $dotsOption.addEventListener('click', () => {
    editText($taskContainer, $placeHolderTask);
  })

  const $trash = document.createElement('i');
  $trash.classList.add('hidden', 'trash-icon', 'fa-solid', 'fa-trash-can');
  $taskContainer.appendChild($trash);

  $trash.addEventListener('click', () => {
    $trash.parentElement.remove();
    const newToDoTask = toDoTasks.filter(task => task.index !== parseInt($trash.parentElement.id, 10));
    toDoTasks = [...newToDoTask];
    updateIndex(toDoTasks);
    updateElementId(toDoTasks);
    localStorage.setItem('list', JSON.stringify(toDoTasks));
  })

  const object = new Task($textNewTask.value, false, toDoTasks.length + 1);
  toDoTasks.push(object);
  localStorage.setItem('list', JSON.stringify(toDoTasks));
};

$textNewTask.addEventListener('keypress', e => {
  if (e.key === 'Enter' && $textNewTask.value) {
    e.preventDefault();
    addTask($textNewTask.value);
    $textNewTask.value = '';
  }
})

$addButton.addEventListener('click', e => {
  if ($textNewTask.value) {
    e.preventDefault();
    addTask($textNewTask.value);
    $textNewTask.value = '';
    console.log(JSON.parse(localStorage.getItem('list')))
    console.log(toDoTasks)
  }
})

const editText = ($checkBoxContainer, toDo) => {
  const $newPlaceHolderTask = document.createElement('input');
  $newPlaceHolderTask.classList.add('checked', 'form-control');
  $newPlaceHolderTask.setAttribute('type', 'text');
  $newPlaceHolderTask.value = toDo.textContent;
  $newPlaceHolderTask.setAttribute('aria-label', 'Text input with checkbox');
  $checkBoxContainer.replaceChild($newPlaceHolderTask, toDo);
  $newPlaceHolderTask.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      const $allTaskContainers = document.querySelectorAll('.task-container');
      let localData = JSON.parse(localStorage.getItem('list'));
      for (let i = 0; i < $allTaskContainers.length; i += 1) {
        if ($allTaskContainers[i].firstChild.nextSibling.classList.contains('checked')) {
          localData[i].description = $newPlaceHolderTask.value;
          localStorage.setItem('list', JSON.stringify(localData));
        }
      }
      $newPlaceHolderTask.classList.remove('checked');
      $checkBoxContainer.replaceChild(toDo, $newPlaceHolderTask);
      toDo.textContent = $newPlaceHolderTask.value;
      toDoTasks = [...localData];
    }
  })
};
