import React from 'react';
import css from './contactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => (
  <>
    {contacts.map((contact) => (
      <div key={contact.id}>
        <span className={css.mobileIcon}>📳</span>
        <span className={css.name}>{`${contact.name}: `}</span>
        <span className={css.number}>{contact.number}</span>
        <button className={css.button} onClick={() => onDeleteContact(contact.id)}>
          Delete
        </button>
      </div>
    ))}
  </>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;




