import React, { useState } from 'react';
import { viewPortfolio } from '../api'; // Import the API function to fetch portfolio data

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]); // State to store portfolio data
  const [error, setError] = useState(''); // State to store error messages
  const [loading, setLoading] = useState(false); // State to indicate loading status

  // Function to fetch portfolio data from the API
  const fetchPortfolio = async () => {
    try {
      setLoading(true); // Show loading indicator
      const data = await viewPortfolio(); // Fetch portfolio data
      setPortfolio(data); // Update portfolio state
      setError(''); // Clear previous error messages
    } catch (err) {
      setError(err.message); // Handle errors
      setPortfolio([]); // Reset portfolio on error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Styles for the component
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    portfolioContainer: {
      backgroundColor: '#6a11cb',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      color: 'white',
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: '24px',
      margin: 0,
    },
    button: {
      padding: '10px 15px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'transform 0.1s',
    },
    buttonLoading: {
      backgroundColor: '#007bff',
      cursor: 'not-allowed',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    tableContainer: {
      marginTop: '20px',
      background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '12px',
      textAlign: 'left',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    td: {
      padding: '12px',
      textAlign: 'left',
      color: 'white',
    },
    trEven: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.portfolioContainer}>
        <div style={styles.headerContainer}>
          <h2 style={styles.title}>Your Portfolio</h2>
          <button
            onClick={fetchPortfolio} // Fetch portfolio data on click
            style={{
              ...styles.button,
              ...(loading ? styles.buttonLoading : {}),
            }}
          >
            {loading ? 'Loading...' : 'View Portfolio'}
          </button>
        </div>
        {error && <p style={styles.error}>{error}</p>} {/* Display error message */}
        {portfolio.length > 0 ? ( // Display portfolio data in a table
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Ticker</th>
                  <th style={styles.th}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock, index) => (
                  <tr key={`${stock.ticker}-${index}`} style={index % 2 === 0 ? styles.trEven : {}}>
                    <td style={styles.td}>{stock.name}</td>
                    <td style={styles.td}>{stock.ticker}</td>
                    <td style={styles.td}>{stock.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No stocks in your portfolio yet.</p>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
