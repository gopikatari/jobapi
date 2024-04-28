const express = require('express');
const {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController');
const router = express.Router();

// router.get('/', getAllTasks);
// router.post('/', createTask);
// router.put('/:id', updateTask);
// router.delete('/:id', deleteTask);

router.route('/').get(getAllTasks).post(createTask);

router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
