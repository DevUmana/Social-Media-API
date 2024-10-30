# Social-Media-API

## Description

**Social Media APIs** is a backend application using MongoDB to manage three main entities: Users, Thoughts, and Reactions. It offers CURL endpoints for creating, retrieving, updating, and deleting user profiles (Users), user-generated content (Thoughts), and feedback (Reactions) such as likes and emojis on posts. MongoDB’s document-based structure provides flexibility in managing social interactions within a scalable, RESTful API design.

[![MIT license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

2. Clone the repository to your computer
3. Invoke npm install
4. Invoke npm run start

## Usage

- Walkthrough [https://drive.google.com/file/d/1nQxnwJFYFQ958CtEFOrViIHGQQUt2e0x/view](https://drive.google.com/file/d/1nQxnwJFYFQ958CtEFOrViIHGQQUt2e0x/view)

<img width="1458" alt="Screenshot 2024-10-29 at 8 14 07 PM" src="https://github.com/user-attachments/assets/202983ea-081c-4383-ba48-f51dd34ba062">

<img width="1454" alt="Screenshot 2024-10-29 at 8 13 58 PM" src="https://github.com/user-attachments/assets/867aa7fd-8e45-4265-8a9f-e1d354642dad">

## API Endpoints

### Users

- GET /api/users - Get all users
- GET /api/users/:userId - Get a single user by ID
- POST /api/users - Create a new user
- PUT /api/users/:userId - Update a user by ID
- DELETE /api/users/:userId - Delete a user by ID
- POST /api/users/:userId/friends/:friendId - Add a friend to a user's friend list
- DELETE /api/users/:userId/friends/:friendId - Remove a friend from a user's friend list

### Thoughts

- GET /api/thoughts - Get all thoughts
- GET /api/thoughts/:thoughtId - Get a single thought by ID
- POST /api/thoughts - Create a new thought
- PUT /api/thoughts/:thoughtId - Update a thought by ID
- DELETE /api/thoughts/:thoughtId - Delete a thought by ID

### Reactions

- POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction by ID

## License

MIT License

Copyright (c) 2024 David Umana

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

I am open to any feedback and improvements that others may have!

## Test Cases

### Users Endpoint Test Cases

1. **Create a New User**  
   **Method:** POST /api/users  
   **Request Body:**

   ```json
   {
     "username": "john_doe",
     "email": "johndoe@example.com"
   }
   ```

   **Expected Response:**  
   **Status:** 201 Created  
   **Body:** JSON object containing the new user's details, including a unique `_id`.

2. **Get All Users**  
   **Method:** GET /api/users  
   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** JSON array of all users with their `_id`, `username`, `email`, `thoughts`, and `friends`.

3. **Get a Single User by ID**  
   **Method:** GET /api/users/:userId  
   **Parameters:** Replace `:userId` with a valid user ID.  
   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** JSON object of the user with populated thoughts and friends data.

4. **Update User by ID**  
   **Method:** PUT /api/users/:userId  
   **Parameters:** Replace `:userId` with a valid user ID.  
   **Request Body:**

   ```json
   {
     "username": "john_doe_updated"
   }
   ```

   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** JSON object of the updated user.

5. **Delete User by ID**  
   **Method:** DELETE /api/users/:userId  
   **Parameters:** Replace `:userId` with a valid user ID.  
   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** Confirmation message.  
   **Note:** User's associated thoughts should also be deleted.

6. **Add a Friend to a User's Friend List**  
   **Method:** POST /api/users/:userId/friends/:friendId  
   **Parameters:** Replace `:userId` and `:friendId` with valid IDs.  
   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** JSON object showing the updated friend list.

7. **Remove a Friend from a User's Friend List**  
   **Method:** DELETE /api/users/:userId/friends/:friendId  
   **Parameters:** Replace `:userId` and `:friendId` with valid IDs.  
   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** Confirmation message.

### Thoughts Endpoint Test Cases

1. **Create a New Thought**  
   **Method:** POST /api/thoughts  
   **Request Body:**

   ```json
   {
     "thoughtText": "This is a new thought.",
     "username": "john_doe"
   }
   ```

   **Expected Response:**  
   **Status:** 201 Created  
   **Body:** JSON object containing the new thought's details, including a unique `_id`.

2. **Get All Thoughts**  
   **Method:** GET /api/thoughts  
   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** JSON array of all thoughts.

3. **Get a Single Thought by ID**  
   **Method:** GET /api/thoughts/:thoughtId  
   **Parameters:** Replace `:thoughtId` with a valid thought ID.  
   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** JSON object of the thought.

4. **Update Thought by ID**  
   **Method:** PUT /api/thoughts/:thoughtId  
   **Parameters:** Replace `:thoughtId` with a valid thought ID.  
   **Request Body:**

   ```json
   {
     "thoughtText": "This thought has been updated."
   }
   ```

   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** JSON object of the updated thought.

5. **Delete Thought by ID**  
   **Method:** DELETE /api/thoughts/:thoughtId  
   **Parameters:** Replace `:thoughtId` with a valid thought ID.  
   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** Confirmation message.

### Reactions Endpoint Test Cases

1. **Add a Reaction to a Thought**  
   **Method:** POST /api/thoughts/:thoughtId/reactions  
   **Parameters:** Replace `:thoughtId` with a valid thought ID.  
   **Request Body:**

   ```json
   {
     "reactionBody": "Great thought!",
     "username": "jane_doe"
   }
   ```

   **Expected Response:**  
   **Status:** 201 Created  
   **Body:** JSON object containing the new reaction's details, including a unique `_id`.

2. **Remove a Reaction by ID**  
   **Method:** DELETE /api/thoughts/:thoughtId/reactions/:reactionId  
   **Parameters:** Replace `:thoughtId` and `:reactionId` with valid IDs.  
   **Expected Response:**  
   **Status:** 200 OK  
   **Body:** Confirmation message.

## Authors and acknowledgment

- Badge information was pulled from [https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba](https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba)

## Questions

For any questions, please contact me using the information below:

GitHub: [DevUmana](https://github.com/DevUmana)

Email: [dumana92@gmail.com](mailto:dumana92@gmail.com)
