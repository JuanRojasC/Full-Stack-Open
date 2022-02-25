import React from 'react'

export const Persons = ({persons, deletePerson}) => {
  return (
    <div>
      {persons.map(person => 
        <div key={person.id}>
          <span>{person.name} {person.number}  </span> 
          <button onClick={e => deletePerson(person)}>delete</button>
        </div>
      )}
    </div>
  )
}
