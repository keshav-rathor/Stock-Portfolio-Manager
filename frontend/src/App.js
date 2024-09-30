// Importing necessary libraries and components
import React from 'react';
import StockSearch from './components/StockSearch'; // Component for searching stocks
import BuySell from './components/BuySell'; // Component for buying/selling stocks
import Portfolio from './components/Portfolio'; // Component for displaying portfolio

// Main App component
const App = () => {
  return (
    // Main application container
    <div className="App">
      {/* Header section with a gradient background and image */}
      <div style={{
          background: 'linear-gradient(to right, rgba(97, 63, 113, 0.8), rgba(150, 150, 150, 0.8)), url("./img.jpg")', // Background gradient and image
          backgroundSize: 'cover', // Ensures the background covers the entire area
          color: 'Black', // Text color
          padding: '50px 0', // Vertical padding for the header
          textAlign: 'center', // Center-aligns text within the header
          borderRadius: '15px', // Rounds the corners of the header
          marginBottom: '20px', // Space below the header
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Shadow effect for the header
          height: '200px', // Fixed height for the header
        }}>
        {/* Main title of the app */}
        <h1 style={{
          fontSize: '50px', // Font size for the title
          fontWeight: 'bold', // Bold font weight for emphasis
          margin: '1', // Margin for spacing
          letterSpacing: '30px', // Spacing between letters
          background: 'linear-gradient(to right, #ff5f6d, #ffc371)', // Gradient background for the title
          WebkitBackgroundClip: 'text', // Clips the background to the text
          WebkitTextFillColor: 'transparent', // Makes the text color transparent, showing the gradient
        }}>
          SellScale
        </h1>
        {/* Subtitle below the main title */}
        <p style={{
          fontSize: '20px', // Font size for the subtitle
          marginTop: '10px', // Space above the subtitle
          color: '#320000', // Different color for the subtitle
        }}>
          <h2>Manage your stocks</h2> {/* Subtitle text */}
        </p>
      </div>
      
      {/* Uncomment the following line to include the BuySell component */}
      {/* <BuySell /> */}
      <StockSearch /> {/* Component for searching stocks */}
      <BuySell /> {/* Component for buying and selling stocks */}
      <Portfolio /> {/* Component for displaying the stock portfolio */}
    </div>
  );
};

// Exporting the App component for use in other parts of the application
export default App;
