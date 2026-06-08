import Project from '../models/Project.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

// create Project
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newProject = await Project.create({
      title,
      description,
      owner: req.user._id,
      members: [req.user._id],
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
};

// get pojects
export const getProject = async (req, res) => {
  try {
    const populatedProject = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    }).populate('owner', 'name email');
    res.status(200).json(populatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error not found project' });
  }
};
// get my project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      'members',
      'name email'
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error found project' });
  }
};

//update project
export const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Post not found' });

    project.title = title || project.title;
    project.description = description || project.description;
    const updatedproject = await project.save();
    res.status(200).json(updatedproject);
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

// delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'project not found' });
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await project.deleteOne();
    res.status(200).json({ message: 'project removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

// invite member
export const inviteMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'project not found' });
    // if (project.owner.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }
    const { email } = req.body;
    const userToInvite = await User.findOne({ email });
    if (!userToInvite)
      return res.status(404).json({ message: 'User not found' });
    if (project.members.includes(userToInvite._id)) {
      return res.status(400).json({ message: 'Useer already a member' });
    }

    project.members.push(userToInvite._id);
    await project.save();
    const notification = await Notification.create({
      userId: userToInvite._id,
      message: `${req.user.name} invited you to join project: ${project.title}`,
      text: `${req.user.name} invited you to join project: ${project.title}`,
    });
    const io = req.app.get('io');
    io.to(userToInvite._id.toString()).emit('notification', notification);
    res.status(200).json({ message: 'Member invited successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};
