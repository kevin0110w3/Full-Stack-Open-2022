import { useState } from 'react'

const Heading = ({ text }) => {
  return (
    <><h1>{text}</h1></>
  )
}
const Anecdote = ({ anecdote, votes }) => {
  if (!votes || votes === 0) {
    return (
      <div><p>{anecdote}</p><p>has 0 votes</p></div>
    )
  }
  return (
    <div><p>{anecdote}</p><p>has {votes} votes</p></div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [allPoints, setPoints] = useState({
    0:0, 
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0
  })
  const [anecdoteOfDay, setAnecdoteOfDay] = useState(0)

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const newPointsObj = { ...allPoints }
    newPointsObj[selected] += 1;
    setPoints(newPointsObj)
    checkAnecdoteOfDay()
  }

  const checkAnecdoteOfDay = () => {
    let select = allPoints[0];

    for (const key in allPoints) {
      if (allPoints[key] > allPoints[select]) {
        select = key;
      }
    }
    setAnecdoteOfDay(select)
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={allPoints[selected]} />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
      <Heading text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[anecdoteOfDay]} votes={allPoints[anecdoteOfDay]} />
    </div>
  )
}

export default App;