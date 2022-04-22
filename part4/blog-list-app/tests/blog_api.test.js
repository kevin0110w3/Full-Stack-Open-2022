const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

jest.useFakeTimers()

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const PromiseArray = blogObjects.map(blog => blog.save())

    await Promises.all(promiseArray)
})

test('blogs are returned as json and there are two', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs have a unique identifer', async () => {
    const blogsAtEnd = await helper.blogsInDb()

    await api
        .get(`/api/blogs/${blogsAtEnd[0].id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toBeDefined();
})


describe('likes', () => {
    test('blogs are added correctly', async () => {
        const newBlog = {
            "tile": "a title",
            "author": "an author",
            "url": "www.url.com",
            "likes": 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain(
            'a title'
        )
    })

    test('blogs without likes defaults to 0', async () => {
        const newBlog = {
            "tile": "a title",
            "author": "an author",
            "url": "www.url.com",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)

        const blogsAtEnd = await helper.blogsInDb()

        const contents = blogsAtEnd.find(b => b.title === 'a title')
        expect(contents.likes).toContain(
            0
        )
    })

    test('blogs added without title/url results in a 400', async () => {
        const newBlog = {
            "author": "an author",
            "likes": 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('test deletions', () => {
    test('blogs are deleted correctly', async () => {
        const blogsAtEnd = await helper.blogsInDb()

        const test = blogsAtEnd[0]

        await api
            .delete(`/api/blogs/${test.id}`)
            .expect(204)

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    })
})

describe('test updates', () => {
    test('blogs are updated correctly', async () => {
        const blogsAtBeginning = await helper.blogsInDb()
        const testBlog = blogsAtBeginning[0]
        const updatedTestBlog = {
            ...testBlog, title: "Changed"
        }

        await api
            .put(`/api/blogs/${updatedTestBlog.id}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(b => b.title)
        expect(titles).toContain(
            'Changed'
        )
    })
})


afterAll(() => {
    mongoose.connection.close()
})