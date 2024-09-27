const Persons = (props) => {
  return (
      <ul>
        {props.filteredPersons.map(person => (
          <div key={person.name}>
            <li>
              {person.name} {person.number}
            </li>
            <button onClick={() => props.deleteContact(person.id)}>Delete</button>
          </div>
        ))}
      </ul>
)}
export default Persons