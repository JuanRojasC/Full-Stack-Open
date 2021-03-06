import { useState } from "react";

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [points, setPoints] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
  const [selected, setSelected] = useState(0)

  const handlerShowAnecdote = () => {
      setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const handlerVote = () => {
    const updatePoints = {...points}
    updatePoints[selected] = points[selected] + 1
    setPoints(updatePoints)
  }

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <div>{anecdotes[selected]}</div>
      <div>votes: {points[selected]}</div>
      <button onClick={handlerVote}>Vote</button>
      <button onClick={handlerShowAnecdote}>Next Anecdote</button>

      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[Object.values(points).indexOf(Object.values(points).reduce((previous, current) => Math.max(previous, current)))]}</div>
    </div>
  )

}

export default App;
