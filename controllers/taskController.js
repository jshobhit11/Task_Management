// const Task = require('../models/Task');

// // Render the task creation form
// exports.showCreateForm = (req, res) => {
//   res.render('tasks/create');
// };

// // Fetch all tasks for the logged-in user
// exports.getTasks = async (req, res) => {
//   const tasks = await Task.find({ user: req.session.userId });
//   res.render('tasks/list', { tasks });
// };

// // Handle task creation
// exports.createTask = async (req, res) => {
//   const { title, description, priority, dueDate } = req.body;
//   try {
//     const task = new Task({
//       user: req.session.userId, // Associate the task with the logged-in user's ID
//       title,
//       description,
//       priority,
//       dueDate,
//     });
//     await task.save();
//     res.redirect('/tasks');
//   } catch (error) {
//     res.status(400).send('Error creating task');
//   }
// };

// // Handle task update
// exports.updateTask = async (req, res) => {
//   const { id } = req.params;
//   const { title, description, priority, dueDate, status } = req.body;
//   await Task.findByIdAndUpdate(id, { title, description, priority, dueDate, status });
//   res.redirect('/tasks');
// };

// // Handle task deletion
// exports.deleteTask = async (req, res) => {
//   const { id } = req.params;
//   await Task.findByIdAndDelete(id);
//   res.redirect('/tasks');
// };



const Task = require('../models/Task');

// Render the task creation form
exports.showCreateForm = (req, res) => {
  res.render('tasks/create');
};

// Render the task edit form
exports.showEditForm = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.render('tasks/edit', { task }); // Pass the task to the edit form view
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Fetch all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.session.userId });
  res.render('tasks/list', { tasks });
};

// Handle task creation
exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  try {
    const task = new Task({
      user: req.session.userId,
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null, // Convert to Date object if provided
    });
    await task.save();
    res.redirect('/tasks');
  } catch (error) {
    res.status(400).send('Error creating task');
  }
};

// Handle task update
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, status } = req.body;
  try {
    await Task.findByIdAndUpdate(id, { title, description, priority, dueDate, status });
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send('Error updating task');
  }
};

// Handle task deletion
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send('Error deleting task');
  }
};
