import Task from './task.js';
import { loadTasks, saveTasks } from './storage.js';

const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');

let tasks = loadTasks();

const renderTasks = () => {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}" />
      <span contenteditable="true" data-id="${task.id}">${task.description}</span>
      <button data-id="${task.id}" class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
  });
};

const addTask = (description) => {
  const id = Date.now().toString();
  const newTask = new Task(id, description);
  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks();
};

const deleteTask = (id) => {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks(tasks);
  renderTasks();
};

const toggleComplete = (id) => {
  tasks = tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t);
  saveTasks(tasks);
};

const editTask = (id, newDescription) => {
  tasks = tasks.map((t) => t.id === id ? { ...t, description: newDescription } : t);
  saveTasks(tasks);
};

const setupUIEvents = () => {
  document.getElementById('add-btn').addEventListener('click', () => {
    if (taskInput.value.trim()) {
      addTask(taskInput.value.trim());
      taskInput.value = '';
    }
  });

  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      deleteTask(e.target.dataset.id);
    } else if (e.target.type === 'checkbox') {
      toggleComplete(e.target.dataset.id);
      renderTasks();
    }
  });

  taskList.addEventListener('blur', (e) => {
    if (e.target.isContentEditable) {
      editTask(e.target.dataset.id, e.target.innerText);
    }
  }, true);
};

export { renderTasks, setupUIEvents };