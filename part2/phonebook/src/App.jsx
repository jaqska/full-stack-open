import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [allNames, setAllNames] = useState(['Arto Hellas'])

  const addContact = (event) => {
    event.preventDefault()
    if (allNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
    const newContactObject = {
      name: newName}
    setPersons(persons.concat(newContactObject))
    setAllNames(allNames.concat(newName))
    setNewName('')
    }
  }

  const handleContactChange = (event) => {
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input 
          value={newName}
          onChange={handleContactChange}/>
        </div>
        <div>
          number: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>
            {person.name}
            </li> 
            ))}
      </ul>
    </div>
    
  )
}

export default App