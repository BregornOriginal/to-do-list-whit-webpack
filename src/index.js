import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
};

const $listContainer = document.getElementById('list-container');
const $textNewTask = document.getElementById('textNewTask');

const toDoTasks = [];

const addTask = () => {
  const $taskContainer = document.createElement('div');
  $taskContainer.classList.add('task-container');
  $taskContainer.classList.add('input-group');
  $taskContainer.classList.add('mb-3');
  $listContainer.appendChild($taskContainer);

  const $checkBoxContainer = document.createElement('div');
  $checkBoxContainer.classList.add('input-group-text');
  $checkBoxContainer.classList.add('bg-light');
  $checkBoxContainer.classList.add('text-dark');
  $taskContainer.appendChild($checkBoxContainer);

  const $checkBox = document.createElement('input');
  $checkBox.setAttribute('id', 'checkbox')
  $checkBox.classList.add('form-check-input');
  $checkBox.classList.add('mt-0');
  $checkBox.setAttribute('type', 'checkbox');
  $checkBox.setAttribute('value', '');
  $checkBox.setAttribute('aria-label', 'Checkbox for following text input');
  $checkBoxContainer.appendChild($checkBox);

  $checkBox.addEventListener('click', () => {
    $checkBox.parentElement.nextElementSibling.classList.toggle('checked');
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
  $dotsOption.classList.add('edit-button');
  $dotsOption.classList.add('bi');
  $dotsOption.classList.add('bi-three-dots-vertical');
  $dotsOption.classList.add('bg-secondary');
  $dotsOption.classList.add('text-white');
  $taskContainer.appendChild($dotsOption);

  $dotsOption.addEventListener('click', () => {
    editText($taskContainer, $placeHolderTask);
  })

  const $trash = document.createElement('i');
  $trash.classList.add('hidden');
  $trash.classList.add('trash-icon');
  $trash.classList.add('fa-solid');
  $trash.classList.add('fa-trash-can');
  $taskContainer.appendChild($trash);

  const object = new Task($textNewTask.value, false, toDoTasks.length)
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

const editText = ($checkBoxContainer, toDo) => {
  const $newPlaceHolderTask = document.createElement('input');
  $newPlaceHolderTask.classList.add('checked');
  $newPlaceHolderTask.classList.add('form-control');
  $newPlaceHolderTask.setAttribute('type', 'text');
  console.log($checkBoxContainer)
  console.log(toDo)
  $newPlaceHolderTask.value = toDo.textContent;
  $newPlaceHolderTask.setAttribute('aria-label', 'Text input with checkbox');
  $checkBoxContainer.replaceChild($newPlaceHolderTask, toDo);
  $newPlaceHolderTask.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      const $allTaskContainers = document.querySelectorAll('task-container');
      const localData = JSON.parse(localStorage.getItem('list'));
      for (let i = 0; i < $allTaskContainers.length; i += 1) {
        if ($allTaskContainers[i].classList.contains('checked')) {
          localData[i].description = $newPlaceHolderTask.value;
          localStorage.setItem('list', JSON.stringify(localData));
        }
      }
      $newPlaceHolderTask.classList.remove('checked');
      $checkBoxContainer.replaceChild(toDo, $newPlaceHolderTask);
      toDo.textContent = $newPlaceHolderTask.value;
    }
  })
}
