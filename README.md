# FoodScanner - Price Comparison Tool

FoodScanner is a web application designed to help users find the lowest prices for grocery items across major Hungarian supermarket chains. Unlike traditional scrapers, this tool leverages **Reverse Engineering** to communicate directly with the backend APIs of mobile applications, ensuring real-time pricing and stock information.

## Features

* **Real-time Data:** Fetches live prices and stock availability upon search.
* **Multi-Store Comparison:** Aggregates data from major chains:
    * Tesco, Spar, Lidl, Aldi, Penny, Auchan, Rossmann, DM.
* **Smart Sorting:** Automatically calculates unit prices (e.g., Ft/kg) to find the true cheapest option.
* **Responsive UI:** Mobile-first design using CSS Grid and Flexbox.

## Architecture & Tech Stack

The system follows a client-server architecture where the backend acts as a proxy and data normalizer between the client and the third-party private APIs.

* **Frontend:** HTML5, CSS3 (Custom styling), Vanilla JavaScript (ES6+), Axios for async requests.
* **Backend:** PHP (cURL for handling HTTP requests).
* **Data Handling:** JSON processing and normalization.

### How it works:

1.  **User Input:** The user searches for a product (e.g., "Milk").
2.  **Request:** The frontend sends an AJAX request to the PHP backend.
3.  **Aggregation (The Core Logic):**
    * The PHP script iterates through the enabled stores.
    * It constructs specific HTTP headers and payloads (reverse-engineered from mobile app traffic).
    * It sends parallel/sequential cURL requests to the stores' internal APIs.
4.  **Normalization:** The disparate JSON responses are parsed and converted into a unified structure.
5.  **Response:** The frontend receives a clean JSON list and renders the product cards.

## Disclaimer & Source Code

This project was created for **educational and research purposes only** to demonstrate skills in:
* Reverse Engineering network traffic.
* Handling REST APIs.
* Data normalization and backend development.

**Note on Source Code:**
Due to the proprietary nature of the third-party API endpoints and the use of private authentication tokens, the **backend logic (`config.php`, `ajax.php`) is not included in this public repository**. This repository contains the frontend implementation and the architectural documentation.
