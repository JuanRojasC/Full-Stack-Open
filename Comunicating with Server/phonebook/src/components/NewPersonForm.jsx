import React from 'react'

export const NewPersonForm = ({handlerAddPerson, setNewName, setNewPhone}) => {
  return (
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
  )
}
