## Word Frequency API

This project is a web API that takes a text input and returns the top 10 most frequent words along with their frequencies.

## API Documentation
### Count Words [POST]

Counts the frequency of words in a text.

**Request** 
- Method: POST
- Content-Type: text/plain

The request body should contain the text for which word frequency needs to be calculated.

**Response** 
- Status 200 OK
- Content-Type:application/json

Returns the top 10 most frequent words along with their frequencies.

**Attributes**

   - word1 (number) - The frequency of word1.
   - word2 (number) - The frequency of word2.
   - ...
   - word10 (number) - The frequency of word10.

+ Request Example

    ```plaintext
    Banan Hund Katt Banan Banan Hund Hund Hund
    ```

+ Response Example 200 (application/json)

    ```json
    {
      "hund": 4,
      "banan": 3,
      "katt": 1,
    }
    ```
## Error Handling 
- Invalid Requests: If an invalid request is made, such as a missing or malformed request body, the API will throw an error. This error is caught by the route handler using a try-catch block. The error is then passed to the error handling middleware, which sends a JSON response with a 500 status code and an appropriate error message.

- Endpoint Not Found: If a request is made to an invalid endpoint that doesn't exist, the API responds with an "Endpoint not found" error. This error is caught by the endpoint not found middleware, which creates a new Error object with the message "Endpoint not found" and passes it to the next middleware.

- Server Errors: If a server error occurs during the execution of the API's logic, such as an unexpected exception or an error in the code, it is caught by the error handling middleware. The error is logged to the console, and a JSON response with a 500 status code and an error message is sent back to the client.
## Installation

Follow these step-by-step instructions to set it up locally.

1. Clone the project from the GitHub repository: git clone https://github.com/MrJonkoRisin/Hemuppgift.git
2. Install dependencies: `npm install`
3. Configure environment variables by creating a .env file and specifying the port on which the server should run. (if not, the server runs on port 5000)

## Usage

To interact with the API I have used Postman and added instructions down below.

1. Start the server in terminal: `npm start` (Look for "Server running on port: 5000" in terminal)
2. Open Postman and create a new POST request by clicking the "New" button in the left sidebar.
3. In the "Create a Request" dialog, select "POST" as the method.
4. Enter the URL http://localhost:5000/count in the address bar, or use a different port if you specified one.
5. Go to the "Body" tab.
6. Select "raw" and "Text" from the options.
7. Enter the text input to be used.
8. Click "Send".

This will send a request to the API, and the response will contain the top 10 most frequent words and their frequencies.