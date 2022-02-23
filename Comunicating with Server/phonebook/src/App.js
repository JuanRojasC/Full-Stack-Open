import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handlerAddPerson = (e) => {
    e.preventDefault()
    if(checkNameNotAlreadyExists(newName)){
      setPersons(persons.concat({name: newName, phone: newPhone, id: persons.length + 1}))
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handlerNewName = (e) => {
    setNewName(e.target.value)
  }

  const handlerNewPhone = (e) => {
    setNewPhone(e.target.value)
  }

  const checkNameNotAlreadyExists = (name) => {
    return !(persons.filter(person => person.name === name).length > 0)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlerAddPerson}>
        <div>
          name: <input onChange={handlerNewName}/>
        </div>
        <div>
          number: <input onChange={handlerNewPhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => <div key={person.id}>{person.name} {person.phone}</div>)}</div>
    </div>
  )
}

export default App