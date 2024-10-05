const Persons = (props) => {
  return (
    <ul>
      {props.filteredPersons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.deleteContact(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons