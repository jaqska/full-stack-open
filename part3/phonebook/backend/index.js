require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/persons.js')

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({}).then(person => {
    const numberOfPersons = person.length
    response.send(`Phonebook has info for ${numberOfPersons} people <br>${new Date()}`)
  })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ error: 'name is missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number is missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// let persons = [
//   {
//     "id": "1",
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": "2",
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": "3",
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": "4",
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ]

// app.get('/info', (request, response) => {
//   response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
// })

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

// const generateId = (n) => Math.floor(Math.random() * n)

// app.post('/api/persons', (request, response) => {
//   const body = request.body

//   if (!body.name) {
//     return response.status(400).json({
//       error: 'name is missing'
//     })
//   }

//   if (!body.number) {
//     return response.status(400).json({
//       error: 'number is missing'
//     })
//   }
//   const nameExists = persons.find(person => person.name === body.name)
//   if (nameExists) {
//     return response.status(400).json({
//       error: 'name must be unique'
//     })
//   }

//   const person = {
//     id: String(generateId(1000000)),
//     name: body.name,
//     number: body.number,
//   }

//   persons = persons.concat(person)

//   response.json(person)
// })

// app.get('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   const person = persons.find(person => Number(person.id) === Number(id))
//   if (person) {
//     response.send(`<p>Name: ${person.name}</p><p>Phone number: ${person.number}</p>`)
//   } else {
//     response.status(404).end()
//   }
// })

// app.delete('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   persons = persons.filter(person => Number(person.id) !== Number(id))

//   response.status(204).end()
// })



