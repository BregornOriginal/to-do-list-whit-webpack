import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

import { editText, addTask, saveStorage } from './modules/functions.js';

window.addEventListener('load', saveStorage());

editText();
addTask();
