const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "How to alienate friends and win enemies",
        "author": "Scrooby Doo",
        "url": "www.help.com",
        "likes": 10
    },
    {
        "title": "Picking up giants",
        "author": "Dyno",
        "url": "www.ee.com",
        "likes": 1
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}