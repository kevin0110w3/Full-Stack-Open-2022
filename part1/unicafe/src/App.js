import { useState } from 'react'

const Heading = (props) => <div><h1>{props.text}</h1></div>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistics = ({ good, bad, neutral }) => {
  const sum = good - bad
  const totalVotes = good + bad + neutral

  const average = totalVotes === 0 ? 0 : sum / totalVotes;

  const positive = totalVotes === 0 ? 0 : (good / totalVotes) * 100;

  if (totalVotes === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good </td>
            <td><StatisticLine value={good} /></td>
          </tr>
          <tr>
            <td>neutral </td>
            <td><StatisticLine value={neutral} /></td>
          </tr>
          <tr>
            <td>bad </td>
            <td><StatisticLine value={bad} /></td>
          </tr>
          <tr>
            <td>average </td>
            <td><StatisticLine value={average} /></td>
          </tr>
          <tr>
            <td>positive </td>
            <td><StatisticLine text="positive" value={positive} /></td>
          </tr>
        </tbody>
      </table>
    </div >
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <>
        {value} %
      </>
    )
  }
  return (
    <>
      {value}
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicks = () => {
    setGood(good + 1)
  }

  const handleBadClicks = () => {
    setBad(bad + 1)
  }

  const handleNeutralClicks = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={handleGoodClicks} text="good" />
      <Button handleClick={handleNeutralClicks} text="neutral" />
      <Button handleClick={handleBadClicks} text="bad" />
      <Heading text="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App