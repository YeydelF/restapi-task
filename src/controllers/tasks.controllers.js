import Task from "../Models/Task.js";
import { getPagination } from "../libs/getPagination.js"

export const findAllTasks = async (req, res) => {
  try {

    const {size, page, title} = req.query
    const condition = title ? {
      title: {$regex: new RegExp(title), $options:"i"}
    }: {};
    const {limit, offset} = getPagination(page, size)

    const tasks = await Task.paginate(condition, { offset, limit });
    res.send(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};

export const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }

  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      done: req.body.done ? req.body.done : false,
    });
    const taskSaved = await newTask.save();
    res.json(taskSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating the task",
    });
  }
};

export const findOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res
        .status(400)
        .json({ message: `Task with id ${id} does not exists` });
    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error retrieving task with id: ${id}`,
    });
  }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params
  try {
    await Task.findOneAndDelete(req.params.id);
  res.json({
    message: "Task were delete successfully",
  });
  } catch (error) {
    res.status(500).json({
        message: `Cannon delete task with id: ${id}`,
      });
  }
};

export const findAllDoneTask = async (req, res) => {
  const tasks = await Task.find({ done: true });
  res.send(tasks);
};

export const findAllUndoneTask = async (req, res) => {
  const tasks = await Task.find({ done: false });
  res.send(tasks);
};

export const updateTask = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "task was updated successfuly" });
};
