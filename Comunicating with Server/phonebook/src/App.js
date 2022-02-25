import axios from 'axios'
import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { NewPersonForm } from './components/NewPersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  const baseURL = 'http://localhost:3001/persons'

  useEffect(() => {
    axios
      .get(baseURL)
      .then(response => setPersons(response.data))
  }, [])

  const handlerAddPerson = (e) => {
    e.preventDefault()
    setPersonsFiltered([])
    if(checkNameNotAlreadyExists(newName)){
      const person = {name: newName, number: newPhone}
      axios
        .post(baseURL, person)
        .then(response => setPersons(persons.concat(response.data)))
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
      <Filter handlerFindPerson={handlerFindPerson} setFilterName={setFilterName}/>
      <h2>Add a New</h2>
      <NewPersonForm handlerAddPerson={handlerAddPerson} setNewName={setNewName} setNewPhone={setNewPhone}/>
      <h2>Numbers</h2>
      <Persons persons={personsFiltered.length === 0? persons : personsFiltered} />
    </div>
  )
}

export default App