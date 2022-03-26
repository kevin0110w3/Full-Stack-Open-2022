require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Contact = require('./models/contact')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/info', (request, response, next) => {
  Contact.count()
    .then(result => {
      const message = `Phonebook has info for ${result} ${result < 2 ? 'person' : 'people'}`

      response.end(`<p>${message}</p><p>${new Date().toLocaleString()}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const person = request.body

  if (!person.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!person.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  } else if (Contact.find({})
    .then(contacts => {
      (p => p.name === person.name)
    }).catch(error => next(error))) { }

  const newPerson = new Contact({
    name: person.name,
    number: person.number,
  })

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const p = {
    name: body.name,
    number: body.number,
  }

  const P = Contact.findByIdAndUpdate(request.params.id, p, { new: true, runValidators: true, })
    .then(updatedContect => {
      response.json(updatedContect)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).send(`${error.message}`)
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)