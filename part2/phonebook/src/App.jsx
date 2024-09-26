import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log('Promise fulfilled')
      })
  }, [])

  const handleFilterInput = (event) => {
    setSearchName(event.target.value)
  }

  const handleContactChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    const numberExists = persons.some(person => person.number === newNumber)
  
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    } else if (numberExists) {
      alert(`${newNumber} is already added to phonebook`)
      setNewNumber('')
      return
    } else {
      const newContactObject = {
        name: newName,
        number: newNumber
      }
      
      axios.post('http://localhost:3001/persons', newContactObject).then(res => {
        console.log(res)
        const updatedPersons = persons.concat(newContactObject)
        setPersons(updatedPersons)
        setNewName('')
        setNewNumber('')
      })
  
      setSearchName('') 
    }
  }
  
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchName.toLowerCase())
  )


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={searchName}
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
      <Persons 
        filteredPersons={filteredPersons} 
      />
    </div>
  )
}

export default App
