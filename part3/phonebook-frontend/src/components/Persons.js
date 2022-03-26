const Person = ({ person, personService, setPersons, persons, setFilteredPersons, filteredPersons,delPerson }) => {
    if (person && person.name !== '') {
        return (
            <>
                <p>{person.name} {person.number}<button onClick={() => delPerson(person.id)}>delete</button></p>
            </>
        )
    }
    return (
        <>
        </>
    )
}

const Persons = ({ personService, setPersons, persons, setFilteredPersons, filteredPersons, delPerson }) => filteredPersons.map(person => <Person key={person.id} person={person} personService={personService} setPersons={setPersons} persons={persons} setFilteredPersons={setFilteredPersons} filteredPersons={filteredPersons} delPerson={delPerson}/>);

export default Persons