import React from 'react'

export const Filter = ({handlerFindPerson, setFilterName}) => {
  return (
    <form onSubmit={handlerFindPerson}>
    <div>
      filter show with: <input onChange={e => setFilterName(e.target.value)}/>
    </div>
    <div>
      <button type="submit">find</button>
    </div>
  </form>
  )
}
