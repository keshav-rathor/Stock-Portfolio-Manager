from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__, template_folder='templates')
CORS(app)

#--------------- MongoDB Connection-----------------------------------------
client = MongoClient("mongodb+srv://keshavsingh042010:Thorkeshav1998@sellscale.natp0.mongodb.net/")
db = client['sellscale_hood']
portfolio_collection = db['portfolio']  # Portfolio collection
transactions_collection = db['transactions']  # Transactions collection


# -------------------API to search for stock----------------------------------
@app.route('/search/<ticker>', methods=['GET'])
def search_stock(ticker):
    """
    Search for stock information by ticker symbol using yfinance.
    Retrieves stock data including ticker, name, current price, and currency.
    """
    try:
        # Fetch stock data using the Ticker method from yfinance
        stock = yf.Ticker(ticker)
        stock_info = stock.info
        
        # If stock data is found, return the relevant information
        if stock_info:
            return jsonify({
                "ticker": stock_info.get('symbol'),        # Stock symbol
                "name": stock_info.get('longName'),        # Company name
                "current_price": stock_info.get('regularMarketPrice'),  # Current price
                "currency": stock_info.get('currency')     # Currency
            })
        else:
            # Return error if stock data is not found
            return jsonify({"error": "Stock not found"}), 404
    except Exception as e:
        # Return any exception as an error message
        return jsonify({"error": str(e)}), 500




#------------------------API to buy stocks----------------------------------
@app.route('/buy', methods=['POST'])
def buy_stock():
    """
    Buys stock by inserting a buy transaction into the database
    and updating the user's portfolio. If the stock is already present in the portfolio,
    it updates the quantity; otherwise, it creates a new entry.
    """
    try:
        data = request.json
        ticker = data.get('ticker')      # Ticker symbol from the request
        quantity = data.get('quantity')  # Number of shares to buy

        # Fetch stock information using yfinance
        stock = yf.Ticker(ticker)
        stock_info = stock.info

        # If stock data is found, process the transaction
        if stock_info and 'symbol' in stock_info:
            # Insert a new buy transaction into the transactions collection
            transactions_collection.insert_one({
                "ticker": stock_info.get('symbol'),
                "name": stock_info.get('longName'),           # Company name
                "current_price": stock_info.get('regularMarketPrice'),
                "currency": stock_info.get('currency'),
                "quantity": quantity,
                "transaction_type": "buy"                    # Transaction type is "buy"
            })

            # Update the portfolio by incrementing the quantity of the stock
            portfolio_collection.update_one(
                {"ticker": stock_info.get('symbol')},  # Find the stock by ticker
                {
                    "$inc": {"quantity": quantity},  # Increase the stock quantity
                    "$set": {
                        "name": stock_info.get('longName'),  # Set company name
                        "currency": stock_info.get('currency'),  # Store currency
                        "current_price": stock_info.get('regularMarketPrice')  # Store current price
                    }
                },
                upsert=True  # Create a new entry if the stock doesn't exist in the portfolio
            )

            # Return success message
            return jsonify({"message": "Stock bought successfully!"}), 201
        else:
            # Return error if stock is not found
            return jsonify({"error": "Stock not found"}), 404

    except Exception as e:
        # Return any exception as an error message
        return jsonify({"error": str(e)}), 500


# -------------------API to sell stocks------------------------------------
@app.route('/sell', methods=['POST'])
def sell_stock():
    """
    Sells stock by inserting a sell transaction into the database and updating
    the portfolio. If the stock quantity becomes zero, it removes the stock from the portfolio.
    """
    try:
        data = request.json
        ticker = data.get('ticker')      # Ticker symbol from the request
        quantity = data.get('quantity')  # Number of shares to sell

        # Check if the stock exists in the portfolio
        stock = portfolio_collection.find_one({"ticker": ticker})

        # If the stock exists and the user has enough quantity, process the sell
        if stock and stock['quantity'] >= quantity:
            # Insert a new sell transaction into the transactions collection
            transactions_collection.insert_one({
                "ticker": ticker,
                "name": stock.get('name'),      # Company name from portfolio
                "quantity": quantity,
                "transaction_type": "sell"      # Transaction type is "sell"
            })

            # Update the portfolio by decrementing the quantity of the stock
            portfolio_collection.update_one(
                {"ticker": ticker},             # Find the stock by ticker
                {"$inc": {"quantity": -quantity}}  # Decrease the stock quantity
            )

            # If the quantity becomes zero, remove the stock from the portfolio
            portfolio_collection.delete_one({"ticker": ticker, "quantity": 0})

            # Return success message
            return jsonify({"message": "Stock sold successfully"}), 200
        else:
            # Return error if the stock is not found or insufficient quantity
            return jsonify({"error": "Insufficient stock quantity"}), 400

    except Exception as e:
        # Return any exception as an error message
        return jsonify({"error": str(e)}), 500

# -----------------API to retrieve the user's portfolio-------------------------
@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    """
    Retrieves the user's portfolio, displaying the top 20 stocks sorted by quantity.
    """
    try:
        # Query the portfolio collection and sort by stock quantity (descending order)
        portfolio = portfolio_collection.find().sort("quantity", -1).limit(20)

        portfolio_list = []
        # Loop through the portfolio documents and create a list of stocks
        for stock in portfolio:
            portfolio_list.append({
                "ticker": stock.get("ticker"),  # Stock symbol
                "name": stock.get("name"),      # Company name
                "quantity": stock.get("quantity")  # Quantity of shares
            })

        # If the portfolio is empty, return a message
        if not portfolio_list:
            return jsonify({"message": "Portfolio is empty"}), 404

        # Return the portfolio as JSON
        return jsonify(portfolio_list), 200

    except Exception as e:
        # Return any exception as an error message
        return jsonify({"error": str(e)}), 500



# ------------------Run the Flask app----------------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run on port 5000, can change to any available port
