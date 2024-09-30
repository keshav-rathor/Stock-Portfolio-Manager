import React, { useState } from 'react'; // Importing React and the useState hook for managing component state.
import { buyStock, sellStock } from '../api'; // Importing API functions for buying and selling stocks from a separate file.


const BuySell = () => {
  // Defining state variables using React's useState hook.
  const [ticker, setTicker] = useState(''); // State for the stock ticker (e.g., AAPL).
  const [quantity, setQuantity] = useState(''); // State for the quantity of stock to buy or sell.
  const [message, setMessage] = useState(''); // State for displaying success or info messages.
  const [error, setError] = useState(''); // State for displaying error messages.


  //--------------------- Function to handle buying stocks----------------------
  const handleBuy = async () => {
    console.log("Handling buy now, creating request"); // Logging that the buy operation has started.
    try {
      const response = await buyStock(ticker, Number(quantity)); // Calling the API function buyStock with the ticker and quantity.
      setMessage(response.message); // If successful, set the success message.
      setError(''); // Clear any previous error messages.
      console.log("Response received", response.message); // Log the success response message.
    } catch (err) {
      setMessage(''); // Clear the success message if an error occurs.
      setError(err.message); // Set the error message to display to the user.
      console.log("Request failed! ", err); // Log the error for debugging.
    }
  };


  // ---------------------Function to handle selling stocks-------------------------
  const handleSell = async () => {
    try {
      console.log("Attempting to sell stock with the following parameters:");
      console.log("Ticker:", ticker); // Logging the ticker symbol for the stock to be sold.
      console.log("Quantity:", quantity); // Logging the quantity of stock to be sold.

      const response = await sellStock(ticker, Number(quantity)); // Calling the sellStock API function.
      console.log("Response received from the API:", response); // Log the response from the API.

      if (response && response.message) { // Check if the response contains a message.
        setMessage(response.message); // Set the success message.
        setError(''); // Clear any previous error messages.
      } else {
        throw new Error("Unexpected API response format."); // Throw an error if the response is in an unexpected format.
      }
    } catch (err) {
      console.error("Failed to sell stock:", err.message || err); // Log the error message or the entire error object.
      setError(err.message || "An unknown error occurred."); // Set the error message for display.
      setMessage(''); // Clear the success message in case of an error.
    }
  };

  // Return JSX that renders the form for buying/selling stocks.
  return (
    <div style={{ 
      background: 'linear-gradient(to right, #000000, #434343)', 
      padding: '20px', 
      borderRadius: '10px', 
      textAlign: 'center', 
      color: 'white', 
      margin: '20px 0' 
    }}>
      <h2>Buy/Sell Stock</h2> {/* Heading for the component */}

      {/* Input field for the stock ticker */}
      <input
        type="text"
        value={ticker} // Binding the input value to the ticker state.
        onChange={(e) => setTicker(e.target.value)} // Update the ticker state when the input changes.
        placeholder="Enter stock ticker (e.g., AAPL)" // Placeholder text for the input.
        style={{
          padding: '10px', 
          width: '200px', 
          marginRight: '10px', 
          borderRadius: '5px', 
          border: '1px solid #ccc', 
          marginBottom: '10px' 
        }}
      />

      {/* Input field for the quantity of stocks */}
      <input
        type="number"
        value={quantity} // Binding the input value to the quantity state.
        onChange={(e) => setQuantity(e.target.value)} // Update the quantity state when the input changes.
        placeholder="Enter quantity" // Placeholder text for the input.
        style={{
          padding: '10px', 
          width: '200px', 
          marginRight: '10px', 
          borderRadius: '5px', 
          border: '1px solid #ccc', 
          marginBottom: '10px' 
        }}
      />

      {/* Buttons for buying and selling stocks */}
      <div style={{ marginTop: '10px' }}> {/* Container for the buttons */}
        <button
          onClick={handleBuy} // Call handleBuy when the button is clicked.
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            marginRight: '10px' 
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} // Change button color on hover.
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'} // Revert button color on mouse out.
        >
          Buy {/* Button text */}
        </button>

        <button
          onClick={handleSell} // Call handleSell when the button is clicked.
          style={{
            padding: '10px 20px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'} // Change button color on hover.
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'} // Revert button color on mouse out.
        >
          Sell {/* Button text */}
        </button>
      </div>

      {/* Display success or error messages */}
      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>} {/* Show message if it exists */}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} {/* Show error if it exists */}
    </div>
  );
};

export default BuySell; // Exporting the BuySell component as the default export.
