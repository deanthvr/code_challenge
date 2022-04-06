#  Node.js Word Counter
By: Vic DeAnthony

This is an express/node.js server side implementation of an API endpoint providing the frequency of word use in text file.  The API will respond to a POST request at the '/api/parse' endpoint; the request must include how many words to return and the text file to analyze.  The API will respond with a JSON formatted list of the words contained in the file along with their frequency of use. The response is sorted in descending order from the highest frequency use word.

This is for test/demonstration purposes only and does not include a front end for form submittal.

## Installation Instructions

1. Install Node.js if not yet installed (https://nodejs.org/)
2. Clone this repository
3. Open command line and cd into the project directory
4. From the command line run ```npm install```
5. Once complete run ```npm run start``` to start the server

The server is set to run on PORT 3000.  You can change the port in the .env file in the main directory if necessary.

To test that the server is responding, open your browser and enter http://localhost:3000/api/ and you should receive a response that you have reached the GET API endpoint.

## Basic Operation
To run the parser, you must use a REQUEST generator such as Postman (https://www.postman.com/) to POST a request to the API endpoint /api/parse/.

Depending on your request generator, create and send a POST type request to: http://localhost:3000/api/parse/ (change to port if necessary).  

The request must inlcude the following 2 form-data keys:
   * key:  'top_n',  value: 3  <-- enter your value
   * key:  'file',   value: attach your text file

The following example shows the setup for postman:
![image](https://user-images.githubusercontent.com/12240944/161981957-207e6a22-60da-492a-ada7-57443e59c018.png)

The attached file must be a utf8 encoded text file with a .txt extension.  The current size limit is 1GB.  

Based on your input text file and top_n value,  you will receive a JSON formatted response as:
```
{
    "frequencies": [
        {
            "word": "the",
            "count": 9
        },
        {
            "word": "and",
            "count": 8
        },
        {
            "word": "in",
            "count": 5
        }
    ]
}
```
Any generated errors will be provided with at status code of 400 and a json formatted message.

## Test
To run the tests, make sure the server is stopped and run ```npm run test``` from the command line.  This will run the tests in the test folder.
  
## Additions/Improvements
While functional, the following improvements are necessary:

 * Add SSL
 * Add express route guard middleware using jwt or equivalent to secure the end points
 * Add a front end for testing purposes
 * Expand to other doc types (docx, pdf, etc.) 
