import Task from '../models/Task.js';
import Notification from '../models/Notification.js';

// create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;
    const newTask = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      dueDate,
      creatBy: req.user._id,
    });
    if (assignedTo) {
      const notification = await Notification.create({
        userId: assignedTo,
        message: `You have been assigned a new task: ${title}`,
        text: `You have been assigned a new task: ${title}`,
      });
      const io = req.app.get('io');
      io.to(assignedTo.toString()).emit('notification', notification);
    }
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

// get tasks
export const getTask = async (req, res) => {
  try {
    const populatedTask = await Task.find({ projectId: req.params.projectId });
    res.status(200).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo, dueDate } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.assignedTo = assignedTo || task.assignedTo;
    task.dueDate = dueDate || task.dueDate;
    const updateTask = await task.save();
    res.status(200).json(updateTask);
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

// delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.deleteOne();
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};
