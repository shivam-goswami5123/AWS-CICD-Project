const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for tasks
let tasks = [];

// Route to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route to add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task description is required' });
  }
  const newTask = { id: tasks.length + 1, task, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Route to mark a task as completed
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.completed = true;
  res.json(task);
});

// Route to delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).end();
});

// Start the server
app.listen(port, () => {
  console.log(`To-Do app listening at http://localhost:${port}`);
});
