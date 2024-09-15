import { useState } from 'react'

const calculateSum = (array) => array.reduce((acc, curr) => acc + curr);

const calculateAverage = (array) => {
  const sumGood = array[0];
  const sumBad = array[2] * -1;
  const sumGoodBad = sumGood + sumBad;
  const sumAll = calculateSum(array);
  return sumGoodBad / sumAll
}

const calculatePositive = (array) => {
  const sumGood = array[0];
  const sumAll = calculateSum(array);
  return sumGood / sumAll * 100;
}


const Button = (props) => {
  return <button onClick={props.event}>{props.text}</button>
}

const StatisticsLine = (props) => {
  if (props.text ==='positive') {
    return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value} %</td>
    </tr>
    )}
  else {
    return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
  }
}

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } 
  const stateList = [props.good, props.neutral, props.bad]
  const all = calculateSum(stateList)
  const average = calculateAverage(stateList)
  const positive = calculatePositive(stateList)
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.good}/>
        <StatisticsLine text="neutral" value={props.neutral}/>
        <StatisticsLine text="bad" value={props.bad}/>
        <StatisticsLine text="all" value={all}/>
        <StatisticsLine text="average" value={average}/>
        <StatisticsLine text="positive" value={positive}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const goodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setAll(allClicks.concat(1));
  }
  const neutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setAll(allClicks.concat(1));
  }

  const badClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setAll(allClicks.concat(1));
  }
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button event={goodClick} text="Good"/>
      <Button event={neutralClick} text="Neutral"/>
      <Button event={badClick} text="Bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
    </div>
  )
}

export default App