/**
 * @swagger
 * components:
 *   schemas:
 *     post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Post
 *         title:
 *           type: string
 *           description: The title of your Post
 *         content:
 *           type: string
 *           description: The content author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         content: post 1
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Post
 *         title:
 *           type: string
 *           description: The title of your Post
 *         content:
 *           type: string
 *           description: The content author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         content: post 1
 *
 */


const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post('/Posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  await post.save();
  res.send(post);
});

router.get('/posts/:id', async (req, res) => {
  try {
    const id = req.params._id;
    const post = await Post.findOne(id);
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.patch('/posts/:id', async (req, res) => {
  try {
    const id = req.params._id;
    const post = await Post.findOne(id);

    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist" });
  }
});

router.delete('/posts/:id', async (req, res) => {
  try {
    const id = req.params._id;
    const post = await Post.deleteOne(id);
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post does'nt exist!" });
  }
});

module.exports = router;
