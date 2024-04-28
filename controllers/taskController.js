const Task = require('../models/Task');
const asycWrapper = require('../middlewares/asyncWrapper');
const { createCustomError } = require('../middlewares/errorHandler');

const getAllTasks = asycWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  res.status(200).json({
    result: tasks,
  });
});

const createTask = asycWrapper(async (req, res, next) => {
  const { name, completed = false } = req.body;
  let task = await Task.create({ name, completed: completed });

  if (!task) return next(createCustomError(`Failed to create Task`, 500));

  res.status(201).json({
    result: task,
  });
});

const updateTask = asycWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { name, completed } = req.body;

  let task = await Task.findById({ _id: id });
  if (!task) {
    return next(createCustomError(`No Task found for the id :${id}`, 404));
  }
  task.name = name;
  task.completed = completed;

  await Task.updateOne(
    { _id: id },
    { name, completed },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    result: 'taskUpdated',
  });
});

const deleteTask = asycWrapper(async (req, res, next) => {
  let { deletedCount } = await Task.deleteOne({ _id: id });
  if (deletedCount === 1) {
    return res.status(200).json({
      result: `Task with " ${id} " successfully deleted`,
    });
  }
  return next(
    createCustomError(`Faield to Delete the Task with " ${id}"`, 404)
  );
});

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};
