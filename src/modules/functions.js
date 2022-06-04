/* eslint implicit-arrow-linebreak: ["error", "below"] */
/* eslint no-multi-assign: ["error", { "ignoreNonDeclaration": true }] */

import { updateIndex, updateElementId } from './update-index.js';

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

let toDoTasks = [];

const $listContainer = document.getElementById('list-container');
const $textNewTask = document.getElementById('textNewTask');
const $clearButton = document.querySelector('.clear-button');

export const editText = ($checkBoxContainer, toDo) => {
  const $newPlaceHolderTask = document.createElement('input');
  $newPlaceHolderTask.classList.add('checked', 'form-control');
  $newPlaceHolderTask.setAttribute('type', 'text');
  $newPlaceHolderTask.value = toDo.textContent;
  $newPlaceHolderTask.setAttribute('aria-label', 'Text input with checkbox');
  $checkBoxContainer.replaceChild($newPlaceHolderTask, toDo);
  $newPlaceHolderTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const $allTaskContainers = document.querySelectorAll('.task-container');
      const localData = JSON.parse(localStorage.getItem('list'));
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
  });
};

export const addTask = () => {
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

    if ($checkBox.checked) {
      toDoTasks[parseInt($checkBox.parentElement.parentElement.id, 10) - 1].completed = true;
    } else {
      toDoTasks[parseInt($checkBox.parentElement.parentElement.id, 10) - 1].completed = false;
    }
    localStorage.setItem('list', JSON.stringify(toDoTasks));
  });

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
  });

  const $trash = document.createElement('i');
  $trash.classList.add('hidden', 'trash-icon', 'fa-solid', 'fa-trash-can');
  $taskContainer.appendChild($trash);

  $trash.addEventListener('click', () => {
    $trash.parentElement.remove();
    const newToDoTask = toDoTasks.filter((task) =>
      task.index !== parseInt($trash.parentElement.id, 10));
    toDoTasks = [...newToDoTask];
    updateIndex(toDoTasks);
    updateElementId(toDoTasks);
    localStorage.setItem('list', JSON.stringify(toDoTasks));
  });

  const object = new Task($textNewTask.value, false, toDoTasks.length + 1);
  toDoTasks.push(object);
  localStorage.setItem('list', JSON.stringify(toDoTasks));
};

const $addButton = document.querySelector('.add-button');

$textNewTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && $textNewTask.value) {
    e.preventDefault();
    addTask($textNewTask.value);
    $textNewTask.value = '';
  }
});

$addButton.addEventListener('click', (e) => {
  if ($textNewTask.value) {
    e.preventDefault();
    addTask($textNewTask.value);
    $textNewTask.value = '';
  }
});

export const saveStorage = () => {
  const data = JSON.parse(localStorage.getItem('list'));
  data.forEach((i) => {
    toDoTasks.push(i);
    const $taskContainer = document.createElement('div');
    $taskContainer.setAttribute('id', toDoTasks.length);
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

      if ($checkBox.checked) {
        toDoTasks[parseInt($checkBox.parentElement.parentElement.id, 10) - 1].completed = true;
      } else {
        toDoTasks[parseInt($checkBox.parentElement.parentElement.id, 10) - 1].completed = false;
      }
      localStorage.setItem('list', JSON.stringify(toDoTasks));
    });

    const $placeHolderTask = document.createElement('span');
    $placeHolderTask.classList.add('form-control');
    $placeHolderTask.setAttribute('type', 'text');
    $placeHolderTask.innerText = i.description;
    $placeHolderTask.setAttribute('aria-label', 'Text input with checkbox');
    $taskContainer.appendChild($placeHolderTask);

    const $dotsOption = document.createElement('a');
    $dotsOption.classList.add('edit-button', 'bi', 'bi-three-dots-vertical', 'bg-secondary', 'text-white');
    $taskContainer.appendChild($dotsOption);

    $dotsOption.addEventListener('click', () => {
      editText($taskContainer, $placeHolderTask);
    });

    const $trash = document.createElement('i');
    $trash.classList.add('hidden', 'trash-icon', 'fa-solid', 'fa-trash-can');
    $taskContainer.appendChild($trash);

    $trash.addEventListener('click', () => {
      $trash.parentElement.remove();
      const newToDoTask = toDoTasks.filter((task) =>
        task.index !== parseInt($trash.parentElement.id, 10));
      toDoTasks = [...newToDoTask];
      updateIndex(toDoTasks);
      updateElementId(toDoTasks);
      localStorage.setItem('list', JSON.stringify(toDoTasks));
    });
  });
  localStorage.setItem('list', JSON.stringify(toDoTasks));
};

const clearAll = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const $allTaskContainers = document.querySelectorAll('.task-container');
  $allTaskContainers.forEach((i) => {
    if (i.childNodes[1].classList.contains('line-through')) {
      i.remove();
    }
  });
  let count = 0;
  const data = Array.from(localData).filter((i) =>
    i.completed === false);
  data.map((i) => {
    i.index = count += 1;
    return localStorage.setItem('list', JSON.stringify(data));
  });
};

$clearButton.addEventListener('click', clearAll);
