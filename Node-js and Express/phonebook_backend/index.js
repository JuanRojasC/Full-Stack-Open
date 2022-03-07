require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Phone = require('./models/Phone')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let lastResults = []

// GET List from database step1 (3.13)
app.get('/api/persons', (request, response) => {
    Phone.find({}).then(result => {
      response.send(result)
      lastResults = result
    })
})

// GET List length (3.2)
app.get('/info', (request, response) => {
    const html = `
    <p>Phonebook has info for ${lastResults.length} people</p>
    <p>${new Date()}</p>`
    response.send(html)
})

// GET Single phonebook step6 (3.18*)
app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then(result => response.json(result))
    .catch(error => next(error))
})

// DELETE Single phonebook from database step3 (3.15)
app.delete('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id)
  Phone.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

// SAVE into database step2 (3.14)
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(!body) 
    return response.status(400).json({ error: 'Content Missing'})
  else if(!body.name)
    return response.status(400).json({ error: 'name is Missing'})
  else if(!body.number)
    return response.status(400).json({ error: 'number is Missing'})

  const phone = new Phone({name: body.name, number: body.number})
  phone.save()
    .then(result => {
      lastResults = lastResults.concat(result)
      response.json(result)
    })
    .catch(error => next(error))
})

// UPDATE phone number step5 (3.17)
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id

  if(!body) 
    return response.status(400).json({ error: 'Content Missing'})
  else if(!body.name)
    return response.status(400).json({ error: 'name is Missing'})
  else if(!body.number)
    return response.status(400).json({ error: 'number is Missing'})

  const phone = {name: body.name, number: body.number}
  Phone.findByIdAndUpdate(id, phone, { new: true, runValidators: true, context: 'query'})
    .then(result => response.json(result) )
    .catch(error => next(error) )
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

// HEROKU
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`running in PORT ${PORT}`)
})

// UNKNOWN ENDPOINT(3.16)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

// ERROR HANDLER (3.16)
const errorHandler = (error, request, response, next) => {
  console.log('ERROR', error.message)
  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error['message']})
  }

  next(error)
}

app.use(errorHandler)