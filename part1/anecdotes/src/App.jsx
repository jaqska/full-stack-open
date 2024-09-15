import { useState } from 'react'

const Button = (props) => {
  return (
  <div>
    <button onClick={props.event}>{props.text}</button>
  </div>
  )}

const ShowAnecdote = (props) => {
  return (
    <div>
      <p>{props.anecdotes[props.selected]}</p>
    </div>
  )
}

const ShowVotes = (props) => {
  return <p>has {props.votes[props.selected]}.</p>
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const [anecdote, setAnecdote] = useState(0);
  const [vote0, setVote0] = useState(0);
  const [vote1, setVote1] = useState(0);
  const [vote2, setVote2] = useState(0);
  const [vote3, setVote3] = useState(0);
  const [vote4, setVote4] = useState(0);
  const [vote5, setVote5] = useState(0);
  const [vote6, setVote6] = useState(0);
  const [vote7, setVote7] = useState(0);
  const votes = [vote0, vote1, vote2, vote3, vote4, vote5, vote6, vote7]
  const setVotes = [setVote0, setVote1, setVote2, setVote3, setVote4, setVote5, setVote6, setVote7]
  const highestVote = Math.max(...votes)
  const maxIndex = votes.indexOf(highestVote)

  const anecdoteClick = () => {
    const updatedAnecdote = Math.floor(Math.random() * anecdotes.length);
    setAnecdote(updatedAnecdote);
  }
  const voteClick = () => {
    const updatedVote = votes[anecdote] + 1;
    setVotes[anecdote](updatedVote);
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <ShowAnecdote anecdotes={anecdotes} selected={anecdote}/>
      <ShowVotes votes={votes} selected={anecdote}/>
      <Button event={voteClick} text="Vote"/>
      <Button event={anecdoteClick} text="Next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <ShowAnecdote anecdotes={anecdotes} selected={maxIndex}/>
      <ShowVotes votes={votes} selected={maxIndex}/>
    </div>
  )
}

export default App