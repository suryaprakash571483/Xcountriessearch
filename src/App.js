
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {error && <div className="error">Error: {error.message}</div>}
      <div className="countries-container">
        {filteredCountries.map(country => (
          <div className={`countryCard${country.name.common.toLowerCase() === searchTerm.toLowerCase() ? ' centered' : ''}`} key={country.name.common}>
            <img src={country.flags.png} alt={country.name.common} className="country-flag" />
            <div className="country-name">{country.name.common}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;