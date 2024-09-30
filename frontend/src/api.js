// Base URL for the API
const API_BASE_URL = 'http://127.0.0.1:5000';

// -----------------Function to search for a stock ---------------------
export const searchStock = async (ticker) => {
  try {
    // Send a GET request to the search endpoint with the ticker symbol
    const response = await fetch(`${API_BASE_URL}/search/${ticker}`);
    console.log("Response Status (searchStock):", response.status);

    // Check if the response is not OK (status outside the range 200-299)
    if (!response.ok) {
      throw new Error('Stock not found'); // Throw an error if stock is not found
    }

    // Parse the response data as JSON
    const data = await response.json();
    console.log("Response Data (searchStock):", data);
    return data; // Return the parsed data
  } catch (error) {
    console.error("Error in searchStock:", error);
    throw error; // Rethrow the error for further handling
  }
};

// -------------------Function to buy a stock----------------------
export const buyStock = async (ticker, quantity) => {
  console.log("Buying stock:", { ticker, quantity });
  try {
    // Send a POST request to the buy endpoint with the stock details
    const response = await fetch(`${API_BASE_URL}/buy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker, quantity }),
    });

    console.log("Response Status (buyStock):", response.status);

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response (buyStock):", errorData);
      throw new Error(errorData.message || 'Failed to buy stock');
    }

    // Parse the response data as JSON
    const data = await response.json();
    console.log("Response Data (buyStock):", data);
    return data; // Return the parsed data
  } catch (error) {
    console.error("Error in buyStock:", error.message);
    throw error; // Rethrow the error for further handling
  }
};

// ---------------Function to sell a stock--------------------
export const sellStock = async (ticker, quantity) => {
  console.log("Selling stock:", { ticker, quantity });
  try {
    // Send a POST request to the sell endpoint with the stock details
    const response = await fetch(`${API_BASE_URL}/sell`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker, quantity }),
    });

    console.log("Response Status (sellStock):", response.status);

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response (sellStock):", errorData);
      throw new Error(errorData.message || 'Failed to sell stock');
    }

    // Parse the response data as JSON
    const data = await response.json();
    console.log("Response Data (sellStock):", data);
    return data; // Return the parsed data
  } catch (error) {
    console.error("Error in sellStock:", error.message);
    throw error; // Rethrow the error for further handling
  }
};

// ------------Function to view the portfolio---------------------
export const viewPortfolio = async () => {
  try {
    // Send a GET request to the portfolio endpoint
    const response = await fetch(`${API_BASE_URL}/portfolio`);
    console.log("Response Status (viewPortfolio):", response.status);

    // Check if the response is not OK
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio'); // Throw an error if portfolio fetch fails
    }

    // Parse the response data as JSON
    const data = await response.json();
    return data; // Return the parsed data
  } catch (error) {
    console.error("Error in viewPortfolio:", error.message);
    throw error; // Rethrow the error for further handling
  }
};
