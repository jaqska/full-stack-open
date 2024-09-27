import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contacts from './services/contacts'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => { 
    contacts.getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
        console.log('Promise fulfilled')
      })
      .catch(error => {
        console.error(error,'Failed to retrieve contacts from database')
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
  
  const deleteContact = (id) => {
    contacts.deleteContact(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
      console.log('Contact deleted')
    }).catch(error => {
      console.error(error, 'Failed to delete contact')
    })
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
      
      contacts.create(newContactObject).then(returnedContact => {
        console.log(`${returnedContact.name} successfully added to database`)
        const updatedPersons = persons.concat(newContactObject)
        setPersons(updatedPersons)
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        console.error(error,'Failed to create new contact')
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
        deleteContact={deleteContact}
      />
    </div>
  )
}

export default App
