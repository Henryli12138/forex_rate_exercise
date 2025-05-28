import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  // State variables to store forex rates and modified rates
  const [rates, setRates] = useState({});
  const [modifiedRates, setModifiedRates] = useState({});

  // Fetch forex rates from the API
  const fetchForexRates = async () => {
    const apikey = '9sOx2d1gWYZrKY0uD4hCbOMIQzLcL4KQ';
    const response = await fetch(`https://api.apilayer.com/fixer/latest`, {
      method: 'GET',
      headers: {
        'apikey': apikey,
      },
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to fetch forex rates');
    }

    const data = await response.json();
    return data.rates;
  };

  // Check if a value is even
  const isEven = (value) => value % 2 === 0;

  // Fetch forex rates from the API and create a new variable with the previous obtained data from the REST API call, 
  // but in this new variable, add 10.0002 to each values of those currencies.
  useEffect(() => {
    const getRates = async () => {
      try {
        // Fetch forex rates from the API
        const fetchedRates = await fetchForexRates();
        setRates(fetchedRates);

        // Create a new variable with the previous obtained data from the REST API call, 
        // but in this new variable, add 10.0002 to each values of those currencies.
        const updatedRates = {};
        for (const currency in fetchedRates) {
          updatedRates[currency] = (fetchedRates[currency] + 10.0002).toFixed(4);
        }
        setModifiedRates(updatedRates);
      } catch (error) {
        console.error('Error fetching forex rates:', error);
      }
    };

    getRates();
  }, []);

  return (
    <div className="App">
      <h1>Forex Rates</h1>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Modified Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rates).map(currency => {
            const isRowEven = isEven(rates[currency]) || currency === 'HKD';
            return (
              <tr key={currency} className={isRowEven ? 'even-row' : ''}>
                <td>{currency}</td>
                <td>{rates[currency]}</td>
                <td>{modifiedRates[currency]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;