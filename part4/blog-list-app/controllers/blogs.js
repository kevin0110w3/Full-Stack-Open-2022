const blogsRouter = require('express').Router()
const { update } = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', userExtractor, async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.get('/:id', userExtractor, async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => { 
  const user = request.user
  const retrievedBlog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1})

  if (retrievedBlog === null) {
    return response.status(401).json({
      error: 'invalid blog'
    })
  } else if (retrievedBlog.user._id.toString() !== user._id.toString()) {
    return response.status(401).json({
      error: 'user is not the creator of this blog'
    })
  }

  const blogs = await retrievedBlog.deleteOne()
  const userBlogs = user.blogs.filter(blog => blog._id.toString() !== retrievedBlog._id.toString())
  user.blogs = userBlogs
  await user.save();

  response.json(blogs)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, })

  response.status(201).json(updatedBlog)
})


module.exports = blogsRouter