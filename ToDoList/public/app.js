document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Fetch tasks and display them
    const loadTasks = async () => {
      const response = await fetch('/tasks');
      const tasks = await response.json();
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}">${task.task}</span>
          <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
      });
    };
  
    // Add a new task
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const taskDescription = taskInput.value.trim();
      if (taskDescription) {
        const response = await fetch('/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task: taskDescription })
        });
        const newTask = await response.json();
        loadTasks();
        taskInput.value = '';
      }
    });
  
    // Delete a task
    window.deleteTask = async (taskId) => {
      await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
      loadTasks();
    };
  
    loadTasks();
  });
  