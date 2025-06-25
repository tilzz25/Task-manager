
import './style.css';
import { renderTasks, setupUIEvents } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  setupUIEvents();
});

