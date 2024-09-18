const Persons = (props) => {
  return (
    <ul>
      {props.filteredPersons.map(person => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
)}
export default Persons