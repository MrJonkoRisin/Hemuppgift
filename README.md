## Word Frequency API

This project is a web API that takes a text input and returns the top 10 most frequent words along with their frequencies.

## Installation

Follow these step-by-step instructions to set it up locally.

1. Clone the project from the GitHub repository: git clone https://github.com/MrJonkoRisin/Hemuppgift.git
2. Install dependencies: `npm install`
3. Configure environment variables by creating a .env file and specifying the port on which the server should run. 

## Usage

To interact with the API I have used Postman and added instructions down below.

1. Start the server: npm start
2. Open Postman and create a new POST request by clicking the "New" button in the left sidebar.
3. In the "Create a Request" dialog, select "POST" as the method.
4. Enter the URL http://localhost:5000/count in the address bar, or use a different port if you specified one.
5. Go to the "Body" tab.
6. Select "raw" and "Text" from the options.
7. Enter the text input to be used.
8. Click "Send".

This will send a request to the API, and the response will contain the top 10 most frequent words and their frequencies.