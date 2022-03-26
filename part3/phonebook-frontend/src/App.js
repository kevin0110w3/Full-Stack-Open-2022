import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'
import './components/error.css'
import './components/notification.css'
import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setFilteredPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const dupe = persons.find(person => person.name === newName);

    if (newName !== '' && newNumber !== '') {
      if (dupe) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const newPerson = {
            ...dupe, number: newNumber
          }

          personService
            .update(newPerson.id, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
              setNotification(`Updated ${newPerson.name}`)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
            .catch(error => {
              setError(error.response.data)
              setTimeout(() => {
                setError(null)
              }, 5000)
            })
        }
      } else {
        const newPerson = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }

        personService
          .create(newPerson)
          .then(person => {
            setPersons(persons.concat(person))
            setNotification(`Added ${newPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setError(error.response.data)
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
      }
      setNewName('');
      setNewNumber('');
    }
  }

  const filterPerson = (event) => {
    event.preventDefault();
    if (filterName.length !== 0) {
      const filtered = persons.filter(person =>
        person.name.toLowerCase().includes(filterName.toLowerCase()
        )
      );
      setFilteredPersons(filtered);
    }
  }

  const delPerson = (id) => {
    const P = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${P.name}`)) {
      personService
        .del(id)
        .then(person => {
          setPersons(persons.filter(person => person.id !== id))
          setFilteredPersons(filteredPersons.filter(person => person.id !== id))
        })
        .catch(error => {
          setError(error.response.data)
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    }
  }

  const handleFilterInput = (event) => setFilterName(event.target.value)
  const handleNameInput = (event) => setNewName(event.target.value)
  const handleNumberInput = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter
        filterPerson={filterPerson}
        filterName={filterName}
        handleFilterInput={handleFilterInput}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <h2>Numbers</h2>
      <Persons personService={personService} setPersons={setPersons} persons={persons} setFilteredPersons={setFilteredPersons} filteredPersons={filteredPersons} setError={setError} delPerson={delPerson} />
    </div>
  )
}

export default App