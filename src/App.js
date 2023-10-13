import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
  const [convertTo, setconvertTo] = useState('');
  const [convertedVal, setconvertedVal] = useState('');
  const [inputval, setInputval] = useState('');
 

  useEffect(() => {
    const apiUrl = 'https://open.er-api.com/v6/latest/USD';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData.rates);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCurrencyCodeChange = (e) => {
    setSelectedCurrencyCode(e.target.value);
    
  };
  const handleCurrencyCodeChangeto = (e) => {
    setconvertTo(e.target.value);
  
  };
  

  const Convert=()=>{
   

    let val1=inputval*selectedCurrencyCode
    let val2=val1*convertTo
    setconvertedVal(val2);
    
  }
  const handleInput=(e)=>{
    setInputval(e.target.value);
  }
  

  return (
    <div>
  
      {Object.keys(data).length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <label htmlFor="currencyCode">Select Currency Code:</label>
          <select
            id="currencyCode"
            onChange={handleCurrencyCodeChange}
            value={selectedCurrencyCode}
          >
            <option value="">-- Select Currency Code --</option>
            {Object.keys(data).map((currencyCode) => (
              <option key={currencyCode} value={data[currencyCode]}>
                {currencyCode}
              </option>
            ))}
          </select>
          <br />

          <label htmlFor="currencyName">Currency Name:</label>
          <input type="number" onChange={handleInput}>
          </input>
          <br/>
          <label htmlFor="currencyCode">Select Currency Code convert to:</label>
          <select
            id="currencyCode"
            onChange={handleCurrencyCodeChangeto}
            value={convertTo}
          >
            <option value="">-- Select Currency Code --</option>
            {Object.keys(data).map((currencyCode) => (
              <option key={currencyCode} value={data[currencyCode]}>
                {currencyCode}
              </option>
            ))}
          </select>

          <button onClick={Convert}>convert</button>
          <div>converted value:
              {convertedVal}
            </div>
        </div>
      )}
    </div>
  );
}

export default App;

