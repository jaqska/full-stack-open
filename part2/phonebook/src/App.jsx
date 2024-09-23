import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [allNames, setAllNames] = useState(['Arto Hellas'])
  const [newNumber, setNewNumber] = useState('')
  const [allNumbers, setAllNumbers] = useState(['040-123456'])

  const [newFilterName, setNewFilterName] = useState('')
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  })
  

  const handleFilterInput = (event) => {
    setNewFilterName(event.target.value)
  }

  const handleContactChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (allNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } if (allNumbers.includes(newNumber)) {
      alert(`${newNumber} is already added to phonebook`) }
    else {
    const newContactObject = {
      name: newName,
      number: newNumber}
    setPersons(persons.concat(newContactObject))
    setAllNames(allNames.concat(newName))
    setAllNumbers(allNumbers.concat(setNewNumber))
    setNewName('')
    setNewNumber('')
    }
  }
  const filteredPersons = newFilterName === '' ? persons : persons.filter(person => 
    person.name.toLowerCase().includes(newFilterName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
        value={newFilterName}
        onChange={handleFilterInput}
        />  
      <h2>add a new</h2>
        <PersonForm 
        onSubmit={addContact}
        newName={newName}
        newNumber={newNumber}
        handleContactChange={handleContactChange}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons}/>
    </div>
    
  )
}

export default App