# Poll API

A simple RESTful API for creating and managing polls. Users can create polls with multiple options, vote on options, and retrieve poll results.

## Database Schema

### Poll Collection

```javascript
{
  question: String,    // Required - The poll question
  options: [          // Array of option objects
    {
      optionText: String,  // Required - The text of the option
      votes: Number        // Default: 0 - Number of votes for this option
    }
  ],
  createdAt: Date     // Default: Current timestamp
}
```

## API Endpoints

### Create a New Poll
- **URL**: `/post`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "question": "Your poll question",
    "options": [
      { "optionText": "Option 1" },
      { "optionText": "Option 2" }
    ]
  }
  ```
- **Success Response**: 
  - **Code**: 201
  - **Content**: Returns the created poll object
- **Error Response**: 
  - **Code**: 400
  - **Content**: `{ "error": "error message" }`

### Vote on a Poll Option
- **URL**: `/polls/:pollId/vote`
- **Method**: `POST`
- **URL Parameters**: `pollId=[string]`
- **Request Body**:
  ```json
  {
    "optionIndex": 0  // Index of the option to vote for
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: Returns the updated poll object
- **Error Response**: 
  - **Code**: 404 if poll not found
  - **Code**: 400 for other errors

### Get a Specific Poll
- **URL**: `/polls/:pollId`
- **Method**: `GET`
- **URL Parameters**: `pollId=[string]`
- **Success Response**: 
  - **Code**: 200
  - **Content**: Returns the poll object
- **Error Response**: 
  - **Code**: 404 if poll not found
  - **Code**: 400 for other errors

### Get All Polls
- **URL**: `/polls`
- **Method**: `GET`
- **Success Response**: 
  - **Code**: 200
  - **Content**: Returns an array of all poll objects
- **Error Response**: 
  - **Code**: 404 if no polls found
  - **Code**: 400 for other errors

## Setup and Installation

1. Ensure MongoDB is installed and running
2. Install dependencies: `npm install`
3. Start the server: `npm start`

The server will run on port 3000 by default.

## Dependencies

- Express.js
- Mongoose
- CORS

## Environment Variables

Make sure to set up your MongoDB connection string in the database configuration file.
