import React from 'react';
import css from './filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <>
    <h3>Find contacts by name</h3>
    <input className={css.input}
      type="text"
      name="filter"
      value={value}
      onChange={onChange}
      placeholder="Make contact"
    />
  </>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
