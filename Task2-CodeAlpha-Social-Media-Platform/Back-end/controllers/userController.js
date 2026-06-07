import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Notification from '../models/Notification.js';
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        token: generateToken(user._id),
        user: { id: user._id, name: user.name, email: user.email },
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio || user.bio;
      if (req.file) {
        user.profilePicture = `/uploads/${req.file.filename}`;
      } else if (req.body.profilePicture) {
        user.profilePicture = req.body.profilePicture || user.profilePicture;
      }
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        bio: updatedUser.bio,
        profilePicture: updatedUser.profilePicture,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const toggleFollow = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.userId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user._id);
    if (!userToFollow)
      return res.status(404).json({ message: 'User not found' });

    const isFollowing = currentUser.following.includes(req.params.userId);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== req.params.userId
      );
      userToFollow.followers = userToFollow.followers.filter(
        (id) => id.toString() !== req.user._id.toString()
      );

      await Notification.findOneAndDelete({
        recipient: userToFollow._id,
        sender: req.user._id,
        type: 'follow',
      });
    } else {
      currentUser.following.push(req.params.userId);
      userToFollow.followers.push(req.user._id);

      await Notification.create({
        recipient: userToFollow._id,
        sender: req.user._id,
        type: 'follow',
      });
    }

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      following: currentUser.following,
      isFollowing: !isFollowing,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling follow' });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      'followers',
      'name profilePicture bio'
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.followers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching followers' });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      'following',
      'name profilePicture bio'
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching following' });
  }
};
