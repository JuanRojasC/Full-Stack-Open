import { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handler={()=>setGood(good + 1)} text='good'/>
      <Button handler={()=>setNeutral(neutral + 1)} text='neutral'/>
      <Button handler={()=>setBad(bad + 1)} text='bad'/>

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App