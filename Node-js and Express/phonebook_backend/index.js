const express = require('express')
const app = express()
app.use(express.json())

const persons = [
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


const PORT = 3001
app.listen(PORT, () => {
    console.log(`running in PORT ${PORT}`)
})