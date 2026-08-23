Employee Directory

A full-stack Employee Directory application built using React, Node.js, Express.js, and MongoDB.

Features

- Add a new employee
- View all employees
- Edit employee details
- Delete an employee
- Store employee data in MongoDB
- REST API using Express.js

Technologies Used

Frontend

- React
- Vite
- Axios
- CSS

Backend

- Node.js
- Express.js
- Mongoose
- MongoDB Atlas

Project Structure

Employee Directory/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── package.json
└── README.md

How to Run

1. Backend

Open a terminal inside the "backend" folder:

npm install

Create a ".env" file inside the "backend" folder:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string

Then start the backend:

node server.js

The backend will run on:

http://localhost:5000

2. Frontend

Open another terminal inside the "frontend" folder:

npm install
npm run dev

Then open the URL shown by Vite in the terminal.

MongoDB Atlas

This project uses MongoDB Atlas for database storage.

The MongoDB connection string is stored in the ".env" file and is not included in the GitHub repository for security.

Important

Do not upload ".env" or "node_modules" to GitHub.

Author

Sneha Samanta