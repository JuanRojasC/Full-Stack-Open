import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { NewPersonForm } from './components/NewPersonForm'
import { Persons } from './components/Persons'
import { SuccessMessage } from './components/SuccessMessage'
import phonebook from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successSave, setSuccessSave] = useState({message: ''})

  useEffect(() => {
    phonebook
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const handlerAddPerson = (e) => {
    e.preventDefault()
    setPersonsFiltered([])
    const newPerson = {name: newName, number: newPhone}
    if(checkNameNotAlreadyExists(newName)){
      phonebook
        .newContact(newPerson)
        .then(response => {
          setPersons(persons.concat(response)); 
          setSuccessSave({message: `${newName} has been added`})
        })
    }else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const id = persons.find(p => p.name === newName).id
        phonebook
          .updatecontact(id, newPerson)
          .then(response => {
            setPersons(persons.map(p => p.id === id? response : p))
            setSuccessSave({message: `${newName} has been updated`})
          })
      }
    }
  }

  const handlerDeletePerson = person => {
    if(window.confirm(`Delete to ${person.name}`)){
      phonebook
      .deleteContact(person.id)
      .then(response => setPersons(persons.filter(p => p.id !== person.id)))
      .catch(error => alert(`This user does not exist`))
    }
  }

  const handlerFindPerson = (e) => {
    e.preventDefault()
    setPersonsFiltered(persons.filter(person => person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())))
  }

  const checkNameNotAlreadyExists = (name) => {
    return !(persons.filter(person => person.name === name).length > 0)
  }

  const deploySuccessMessage = () => {
    setTimeout(()=>{
      setSuccessSave({message: ''})
    },3000)
    return <SuccessMessage message={successSave.message}/>
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {successSave.message !== ''? deploySuccessMessage() : ''}
      <Filter handlerFindPerson={handlerFindPerson} setFilterName={setFilterName}/>
      <h2>Add a New</h2>
      <NewPersonForm handlerAddPerson={handlerAddPerson} setNewName={setNewName} setNewPhone={setNewPhone}/>
      <h2>Numbers</h2>
      <Persons persons={personsFiltered.length === 0? persons : personsFiltered} deletePerson={handlerDeletePerson} />
    </div>
  )
}

export default App