import React, { useState } from 'react';
import { searchStock } from '../api'; // Import the API function to search stock

const StockSearch = () => {
  const [ticker, setTicker] = useState(''); // State for stock ticker input
  const [stockData, setStockData] = useState(null); // State for fetched stock data
  const [error, setError] = useState(''); // State for error messages

  // Function to handle stock search
  const handleSearch = async () => {
    try {
      const data = await searchStock(ticker); // Call API with ticker
      setStockData(data); // Set stock data on success
      setError(''); // Clear previous errors
    } catch (err) {
      setError(err.message); // Set error message on failure
      setStockData(null); // Clear stock data on error
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(to right, #000000, #434343)', // Gradient background
      padding: '20px', // Padding for spacing
      borderRadius: '10px', // Rounded corners
      textAlign: 'center', // Center text
      color: 'white', // White text
      margin: '20px 0' // Margin for spacing
    }}>
      <h2>Search for a Stock</h2> {/* Component heading */}

      {/* Input for stock ticker */}
      <input
        type="text"
        value={ticker} // Bind input value to state
        onChange={(e) => setTicker(e.target.value)} // Update state on change
        placeholder="Enter stock ticker (e.g., AAPL)" // Placeholder text
        style={{
          padding: '10px', // Input padding
          width: '200px', // Input width
          marginRight: '10px', // Right margin
          borderRadius: '5px', // Rounded corners
          border: '1px solid #ccc' // Border styling
        }}
      />

      {/* Search button */}
      <button
        onClick={handleSearch} // Trigger search on click
        style={{
          padding: '10px 20px', // Button padding
          backgroundColor: '#28a745', // Button background color
          color: 'white', // Button text color
          border: 'none', // No border
          borderRadius: '5px', // Rounded corners
          cursor: 'pointer', // Pointer cursor
          transition: 'background-color 0.3s' // Transition effect
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'} // Hover effect
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'} // Revert hover effect
      >
        Search
      </button>

      {/* Display error message */}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {/* Display stock data if available */}
      {stockData && (
        <div style={{ marginTop: '20px', overflowX: 'auto' }}>
          <table style={{
            width: '100%', // Full width table
            borderCollapse: 'collapse', // Collapse borders
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow
            borderRadius: '8px', // Rounded corners
            overflow: 'hidden', // Hide overflow
            backgroundColor: '#343a40' // Table background
          }}>
            <thead>
              <tr>
                {/* Table headers */}
                <th style={{
                  padding: '10px', // Header cell padding
                  border: '1px solid #ddd', // Cell border
                  color: 'white', // Header text color
                  backgroundColor: '#495057' // Header background
                }}>Name</th>
                <th style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  color: 'white',
                  backgroundColor: '#495057'
                }}>Ticker</th>
                <th style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  color: 'white',
                  backgroundColor: '#495057'
                }}>Price</th>
                <th style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  color: 'white',
                  backgroundColor: '#495057'
                }}>Currency</th>
              </tr>
            </thead>
            <tbody>
              {/* Display stock data in a row */}
              <tr style={{ backgroundColor: 'white', color: 'black' }}>
                <td style={{
                  padding: '10px', // Cell padding
                  border: '1px solid #ddd', // Cell border
                  borderBottom: 'none' // No bottom border
                }}>{stockData.name}</td>
                <td style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderBottom: 'none'
                }}>{stockData.ticker}</td>
                <td style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderBottom: 'none'
                }}>${stockData.price}</td>
                <td style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderBottom: 'none'
                }}>{stockData.currency}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
