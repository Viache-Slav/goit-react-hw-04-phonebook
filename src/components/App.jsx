import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './app.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [
      { id: 'id-1', name: 'Andriy Shevchenko', number: '645-17-79' },
      { id: 'id-2', name: 'Vitali Klitschko', number: '658-25-63' },
      { id: 'id-3', name: 'Volodymyr Zelensky', number: '698-45-75' },
      { id: 'id-4', name: 'Vasyl Virastyuk', number: '158-35-61' },
    ];
  });
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newName, newNumber) => {
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === newName.toLowerCase() || contact.number === newNumber
    );

    if (existingContact) {
      alert(`${newName} or ${newNumber} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    };

    console.log('New contact:', newContact);

    setContacts((prevContacts) => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteContact = (contactId) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.body}>
      <h1>Phone Book</h1>
      <ContactForm
        name={name}
        number={number}
        onNameChange={(e) => setName(e.target.value)}
        onNumberChange={(e) => setNumber(e.target.value)}
        onSubmit={handleAddContact}
      />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;


