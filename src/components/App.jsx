import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
// eslint-disable-next-line
import css from './app.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Andriy Shevchenko', number: '645-17-79' },
      { id: 'id-2', name: 'Vitali Klitschko', number: '658-25-63' },
      { id: 'id-3', name: 'Volodymyr Zelensky', number: '698-45-75' },
      { id: 'id-4', name: 'Vasyl Virastyuk', number: '158-35-61' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  // pobiera dane kontaktów z localStorage. 
  // Jeżeli nie ma danych z kluczem "contacts", to wartość savedContacts będzie równa null.
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      // Przywraca kontakty z localStorage, jeżeli istnieją
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  // Zapisywanie kontaktów w localStorage w przypadku jakichkolwiek zmian
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentWillUnmount() {
    // Można wyczyścić localStorage
    // localStorage.removeItem('contacts');
  }

  handleAddContact = (name, number) => {
    const { contacts } = this.state;
    const contactNames = contacts.map((contact) => contact.name);
    const contactNumbers = contacts.map((contact) => contact.number);

    // Sprawdza, czy kontakt o danej nazwie już istnieje
    if (contactNames.includes(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
  
    // Sprawdza, czy kontakt o danym numerze już istnieje
    if (contactNumbers.includes(number)) {
      alert(`${number} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    // Dodaje nowy kontakt do stanu aplikacji
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  // Aktualizuje stan filtra na podstawie wprowadzonych danych
  handleFilterChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  handleDeleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };
  

  render() {
    const { contacts, filter } = this.state;

    // Filtruje kontakty na podstawie wprowadzonego filtra
    const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <h1>Phone Book</h1>
        {/* Renderuje formularz do dodawania nowych kontaktów */}
        <ContactForm onSubmit={this.handleAddContact} />
        
        <h2>Contacts</h2>
        {/* Renderuje filtr do wybierania kontaktów */}
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList 
          contacts={filteredContacts} 
          onDeleteContact={this.handleDeleteContact}
        />
      </>
    );
  }
}

export default App;
