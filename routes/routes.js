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
 * tags:
 *   name: POSTS
 *   description: The posts managing API
 * /posts:
 *   get:
 *     summary: Lists all the posts
 *     tags: [GET]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   $ref: '#/model/Post'
 *   post:
 *     summary: Create a new post
 *     tags: [POST]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/model/Post'
 *     responses:
 *       200:
 *         description: The created post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/model/Post'
 *       500:
 *         description: Some server error
 * /posts/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [SINGLE POST]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The posts id
 *     responses:
 *       200:
 *         description: The post response by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/model/Post'
 *       404:
 *         description: The post was not found
 *   patch:
 *    summary: Update the post by the id
 *    tags: [PATCH]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/model/Post'
 *    responses:
 *      200:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/model/Post'
 *      404:
 *        description: The post was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the post by id
 *     tags: [DELETE]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
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
