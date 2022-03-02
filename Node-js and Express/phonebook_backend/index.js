const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

var persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

// GET List (3.1)
app.get('/api/persons', (request, response) => {
    response.send(persons)
})

// GET List length (3.2)
app.get('/info', (request, response) => {
    const html = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
    response.send(html)
})

// GET Single phonebook (3.3)
app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(p => p.id === Number(request.params.id))
  if(person) response.send(person)
  else response.status(404).end()
})

// DELETE Single phonebook (3.4)
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if(person) {
    response.status(204).end()
    persons = persons.filter(p => p.id !== id)
  }
  else response.status(404).end()
})

// POST Save single phonebook (3.5)
// POST Exceptions when saving a single phonebook (3.6)
const generateId = _ => {
  return Math.floor(Math.random() * 9999999 + 1)
}
app.post('/api/persons', (request, response) => {
  const id = generateId()
  const body = request.body

  if(!body) 
    return response.status(400).json({ error: 'Content Missing'})
  else if(!body.name)
    return response.status(400).json({ error: 'name is Missing'})
  else if(!body.number)
    return response.status(400).json({ error: 'number is Missing'})
  
  if(persons.find(p => p.name === body.name))
    return response.status(400).json({ error: 'name must be unique' })

  const person = {id: id, name: body.name, number: body.number}
  
  persons = persons.concat(person)
  
  response.json(person)
  
})

// MORGAN (3.7)
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
})

// MORGAN TOKENS (3.8)
morgan.token('body', (req, res) => JSON.stringify(req.body))

const PORT = 3001
app.listen(PORT, () => {
    console.log(`running in PORT ${PORT}`)
})