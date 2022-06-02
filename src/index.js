import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

const toDoTasks = [{
  description: 'Wash the dishes',
  completed: true,
  index: 1,
},
{
  description: 'Complete To Do list project',
  completed: true,
  index: 2,
}];

const createList = () => {
  const $listContainer = document.getElementById('list-container');
  for (let i = 0; i < toDoTasks.length; i += 1) {
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
    $checkBox.classList.add('form-check-input');
    $checkBox.classList.add('mt-0');
    $checkBox.setAttribute('type', 'checkbox');
    $checkBox.setAttribute('value', '');
    $checkBox.setAttribute('aria-label', 'Checkbox for following text input');
    $checkBoxContainer.appendChild($checkBox);

    const $placeHolderTask = document.createElement('input');
    $placeHolderTask.classList.add('form-control');
    $placeHolderTask.setAttribute('type', 'text');
    $placeHolderTask.setAttribute('placeholder', `${toDoTasks[i].description}`);
    $placeHolderTask.setAttribute('aria-label', 'Text input with checkbox');
    $taskContainer.appendChild($placeHolderTask);

    const $dotsOption = document.createElement('a');
    $dotsOption.classList.add('bi');
    $dotsOption.classList.add('bi-three-dots-vertical');
    $dotsOption.classList.add('bg-secondary');
    $dotsOption.classList.add('text-white');
    $taskContainer.appendChild($dotsOption);
  }

  const $clearButton = document.createElement('button');
  $clearButton.classList.add('btn');
  $clearButton.classList.add('btn-secondary');
  $clearButton.classList.add('btn-lg');
  $clearButton.classList.add('bg-success');
  $clearButton.classList.add('text-white');
  $clearButton.classList.add('clear-button');
  $clearButton.innerText = 'Clear all Completed';
  $listContainer.appendChild($clearButton);
};

createList();
