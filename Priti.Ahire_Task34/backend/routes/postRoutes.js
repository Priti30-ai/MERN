const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'name email');

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, content, user } = req.body;
    const cleanTitle = typeof title === 'string' ? title.trim() : '';
    const cleanContent = typeof content === 'string' ? content.trim() : '';

    if (!cleanTitle) {
      return res.status(400).json({ success: false, message: 'Post title is required.' });
    }

    if (!cleanContent) {
      return res.status(400).json({ success: false, message: 'Post content is required.' });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(String(user))) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format.' });
    }

    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const post = await Post.create({
      title: cleanTitle,
      content: cleanContent,
      user,
    });

    const populatedPost = await Post.findById(post._id).populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Post created successfully.',
      data: populatedPost,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
