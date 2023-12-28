const mongoose = require("mongoose")
const supertest = require('supertest');
const createServer = require("./server")
const Post = require("./models/Post");

beforeEach(async() => {
   await  mongoose.connect(
        "mongodb://localhost:27017/blog-app")
})

afterEach(async() => {
	await mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close()
	})
})

test("GET /posts", async () => {
	const post = await Post.create({
		title: "Post 1",
		content: "Lorem ipsum",
	})

	await supertest(app)
		.get("/api/posts")
		.expect(200)
		.then((response) => {
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toBeTruthy()
            expect(response.body[0]._id).toBe(post.id)
			expect(response.body[0].title).toBe(post.title)
			expect(response.body[0].content).toBe(post.content)
		})
})

test("POST /api/posts", async()=>{
    const data = {
        title: "post 1",
        content:"context 1"
    }

    await supertest(app)
        .post("/api/posts")
        .send(data)
        .expect(200)
        .then(async (response) => {
            expect(response.body._id).toBeTruthy();
            expect(response.body.title).toBe(data.title);
            expect(response.body.content).toBe(data.content);

            const post  = await Post.findOne({_id:response.body._id})
            expect(post).toBeTruthy()
            expect(post.title).toBe(data.title)
            expect(post.content).toBe(data.content)
        })
})

test("GET /api/posts/:id", async () => {
	const post = await Post.create({
		title: "Post 1",
		content: "content 1",
	})

	await supertest(app)
		.get("/api/posts/" + post.id)
		.expect(200)
		.then((response) => {
			expect(response.body._id).toBe(post.id)
			expect(response.body.title).toBe(post.title)
			expect(response.body.content).toBe(post.content)
		})
})

test("PATCH /api/posts/:id", async ()=> {
    const post = await Post.create({
        title: "post 1",
        content: "content 1"
    })

    const data = {
        title: "new post",
        content: " new content ahead"
    }

    await supertest(app)
    .patch("/api/posts/" + post.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
        expect(response.body._id).toBe(post.id)
        expect(response.body.title).toBe(data.title)
        expect(response.body.content).toBe(data.content)

        const newPost = await Post.findOne({_id:response.body._id})
        expect(newPost).toBeTruthy()
        expect(newPost.title).toBe(data.title)
        expect(newPost.content).toBe(data.content)
    }) 
})

test("DELETE /api/posts/:id", async()=>{
    const post = await Post.create({
        title: "post 1",
        content: "content 1"
    })

    await supertest(app)
        .delete("/api/posts/"+post.id)
        .expect(204)
        .then(async()=> {
            expect(await Post.findOne({_id:post.id})).toBeFalsy()
        })
})

const app = createServer()
