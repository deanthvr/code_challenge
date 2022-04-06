#  Node.js Word Counter
By: Vic DeAnthony

This is an express/node.js server side implementation of a text file word counter.  It will accept a POST request to /api/parse route inluding both the how many words to return and a text file.  The server will response with a JSON file that lists the words contained and the file along with their frequency of use. The response is sorted from the hightest frequency down and has the following form:
{
    "frequency": [
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
        },
        {
            "word": "of",
            "count": 3
        },
        {
            "word": "with",
            "count": 3
        },
        {
            "word": "a",
            "count": 3
        },
        {
            "word": "we",
            "count": 3
        },
        {
            "word": "on",
            "count": 3
        },
        {
            "word": "out",
            "count": 2
        },
        {
            "word": "rain",
            "count": 2
        }
    ]
}

This is for test/demonstration purposes only and does not inlcude a front end for form submital.

##Installation Instructions

1. Install Node.js if not yet installed (https://nodejs.org/)
2. Clone this repository
3. Open command line and cd into the project directory
4. From the command line run ```npm install```
5. Once complete run ```npm run start``` to start the server

The server is set to run on PORT 3000.  You can change the port in the .env file in the main directory if necessary.

To test that the server is responding, open your browser and enter http://localhost:3000/api and you should receive a response that you have reached the GET API endpoint.

##Basic Operation
To run the parser, you must use a REQUEST generator such as Postman (https://www.postman.com/)

Depending on you request generator, create an send a post request to: http://localhost:3000/api/parse.  Include 2 form-data keys post for:
  key:  'top_n',  value: <enter the number of words you would like to have returned >
  key:  'file',   value: attach your text file

  

