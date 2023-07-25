const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/async");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({ user: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
});

const createTask = asyncWrapper(async (req, res) => {
  req.body.user = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
});

const getTask = asyncWrapper(async (req, res, nxt) => {
  const { id: taskID } = req.params;
  const {
    user: { userId },
  } = req;
  const task = await Task.findOne({ _id: taskID, user: userId });
  if (!task) {
    return res.status(StatusCodes.NOT_FOUND).send("No task with this id");
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, nxt) => {
  const { id: taskID } = req.params;
   req.body.user = req.user.userId;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  if (!task) {
    return res.status(StatusCodes.NOT_FOUND).send("No task with this id");
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const {
    user: { userId },
  } = req;
  const task = await Task.findOneAndDelete({ _id: taskID, user: userId });
  if (!task) {
    return res.status(StatusCodes.NOT_FOUND).send("No job with this id");
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
