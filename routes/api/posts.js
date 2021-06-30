// const { Router } = require("express");
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

const { check, validationResult } = require("express-validator");


/**
 *
 *
 *
 *
 *
 */
//@route    Delete api/Posts/comments/:id/:commentId
//@desc     Delete a comment
//@access   private
router.delete('/comments/:id/:commentId', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const post = await Post.findById(req.params.id);

  try {
    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId
    );

    if (!comment) return res.status(404).json({ msg: "Comment dos'et exist" });

    if (comment.user.id !== req.user.id)
      return res.status(401).json({ msg: 'User is not authorized!!!' });

    const reomoveIndex = post.comments
      .filter((comment) => comment.id)
      .indexOf(req.params.commentId);

    post.comments.splice(reomoveIndex, 1);
    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});
/**
 *
 *
 *
 *
 *
 */
//@route    GET api/Posts/comments/:id
//@desc     Create a comment
//@access   private
router.post(
  '/comments/:id',
  [auth, [check('text', 'ccText is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    try {
      const newComment = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);

      res.send('Post route');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);
/**
 *
 *
 *
 *
 *
 *
 *
 */
//@route    PUT api/Posts/unlike/:id
//@desc     Unlike Post by Id
//@access   private
router.put('/unlike/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(400).json({ msg: 'Post not found  ' });

    if (post.likes.filter((like) => like.user.toString() === req.user.id) === 0)
      return res.status(400).json({ msg: 'Post has not yet liked' });

    const removeIndex = post.likes
      .map((like) => {
        like.user.toString();
      })
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    // ({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Post not found     ' });

    res.status(500).send('Server Error');
  }
});
/**
 *
 *
 *
 *
 *
 */
//@route    PUT api/Posts/like/:id
//@desc     like  Post by Id
//@access   private
router.put('/like/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(400).json({ msg: 'Post not found  ' });

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res.status(400).json({ msg: 'Post already Liked' });

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Post not found     ' });

    res.status(500).send('Server Error');
  }
});
/**
 *
 *
 *
 *
 *
 */
//@route    Delete api/Posts
//@desc     Delete  Post by Id
//@access   private
router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(400).json({ msg: 'Post not found  ' });
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User is not authorized' });

    await post.remove();
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Post not found     ' });

    res.status(500).send('Server Error');
  }
});
/**
 *
 *
 *
 *
 *
 */
//@route    GET api/Posts
//@desc     Get   Post by Id
//@access   private
router.get('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
    if (!post) return res.status(400).json({ msg: 'Post not found     ' });
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Post not found     ' });

    res.status(500).send('Server Error');
  }
});
/**
 *
 *
 *
 *
 *
 */
//@route    GET api/Posts
//@desc     Get All  Posts
//@access   private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});
/**
 *
 *
 *
 *
 *
 */
//@route    GET api/Posts
//@desc     Create a Post
//@access   private
router.post(
  '/',
  [auth, [check('text', 'ccText is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const user = await User.findById(req.user.id).select('-password');
    try {
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);

      res.send('Post route');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
