import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  const [personsFiltered, setPersonsFiltered] = useState([])

  const handlerAddPerson = (e) => {
    e.preventDefault()
    setPersonsFiltered([])
    if(checkNameNotAlreadyExists(newName)){
      setPersons(persons.concat({name: newName, number: newPhone, id: persons.length + 1}))
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handlerFindPerson = (e) => {
    e.preventDefault()
    setPersonsFiltered(persons.filter(person => person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())))
  }

  const checkNameNotAlreadyExists = (name) => {
    return !(persons.filter(person => person.name === name).length > 0)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlerFindPerson}>
        <div>
          filter show with: <input onChange={e => setFilterName(e.target.value)}/>
        </div>
        <div>
          <button type="submit">find</button>
        </div>
      </form>
      <h2>Add a New</h2>
      <form onSubmit={handlerAddPerson}>
        <div>
          name: <input onChange={e => setNewName(e.target.value)}/>
        </div>
        <div>
          number: <input onChange={e => setNewPhone(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{personsFiltered.length === 0? persons.map(person => <div key={person.id}>{person.name} {person.number}</div>) 
                                      : personsFiltered.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
      </div>
    </div>
  )
}

export default App