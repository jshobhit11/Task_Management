// const express = require('express');
// const { getTasks, createTask, showCreateForm, updateTask, deleteTask } = require('../controllers/taskController');
// const router = express.Router();

// // Route to show the task creation form
// router.get('/create', showCreateForm);

// // Route to get all tasks (list)
// router.get('/', getTasks);

// // Route to handle task creation (after submitting the form)
// router.post('/create', createTask);

// // Route to handle task update
// router.post('/:id/update', updateTask);

// // Route to handle task deletion
// router.post('/:id/delete', deleteTask);

// module.exports = router;




const express = require('express');
const { getTasks, createTask, showCreateForm, showEditForm, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

// Route to show the task creation form
router.get('/create', showCreateForm);

// Route to show the task edit form
router.get('/:id/edit', showEditForm); // <-- New route to handle GET requests for editing tasks

// Route to get all tasks (list)
router.get('/', getTasks);

// Route to handle task creation
router.post('/create', createTask);

// Route to handle task update
router.post('/:id/update', updateTask);

// Route to handle task deletion
router.post('/:id/delete', deleteTask);

module.exports = router;
