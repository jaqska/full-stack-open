import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contacts from './services/contacts'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [searchName, setSearchName] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => { 
    contacts.getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
        console.log('Promise fulfilled')
        setStatusMessage(
          `Successfully retrieved contacts from database`
        )
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.error(error)
        setStatusMessage(
          `Error: Failed to retrieve contacts from database`
        )
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
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
    let answer = window.confirm('Are you sure you want to delete this contact?');
    
    if (answer) {
      contacts.deleteContact(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setStatusMessage('Contact deleted');
          setTimeout(() => setStatusMessage(null), 5000);
        })
        .catch(error => {
          console.error(error, 'Failed to delete contact');
          
          if (error.response && error.response.status === 404) {
            setStatusMessage('Error: Contact already removed from server');
          } else {
            setStatusMessage(`Error: Failed to delete ${persons.find(person => person.id === id).name}`);
          }
          setTimeout(() => setStatusMessage(null), 5000);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  }
  
  const addContact = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      let answer = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      
      if (answer) {
        const updatedContact = {
          name: newName,
          number: newNumber
        };

        console.log('Updating contact with ID:', existingPerson.id);
        console.log('Updated contact data:', updatedContact);

        contacts.update(existingPerson.id, updatedContact)
          .then((returnedContact) => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedContact
            ))
            console.log('Contact updated');
            setStatusMessage(`Updated ${existingPerson.name}`);
            setTimeout(() => {
              setStatusMessage(null);
            }, 5000)
          })
          .catch(error => {
            console.error(error.message, 'Failed to update contact')
            if (error.response && error.response.status === 404) {
              setStatusMessage(`Error: Information of ${existingPerson.name} has already been removed from server`);
            } else {
              setStatusMessage(`Error: Failed to update ${existingPerson.name}.`);
            }
            setTimeout(() => setStatusMessage(null), 5000);
          })
        setNewName('');
        setNewNumber('');
      } else {
        setNewName('');
        setNewNumber('');
    }
      
    } else {
      const newContactObject = {
        name: newName,
        number: newNumber
      }
      
      contacts.create(newContactObject).then(returnedContact => {
        console.log(`${returnedContact.name} successfully added to database`)
        const updatedPersons = persons.concat(returnedContact)
        setPersons(updatedPersons)
        setStatusMessage(
          `Added ${returnedContact.name}`
        )
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        console.error(error,'Failed to add new contact')
        setStatusMessage(
          `Error: Failed to add ${returnedContact.name}`
        )
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
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
      <Notification message={statusMessage}/>
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
