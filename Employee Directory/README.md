# Employee Directory

## Requirements
- Node.js installed
- MongoDB Community Server running locally

## 1. Backend
Open a terminal in the `backend` folder:

```bash
npm install
npm start
```

If `npm start` is not available in the backend package.json, use:

```bash
node server.js
```

The backend uses:
`mongodb://127.0.0.1:27017/employeeDB`

## 2. Frontend
Open another terminal in the `frontend` folder:

```bash
npm install
npm run dev
```

Then open the URL shown by Vite, usually:
`http://localhost:5173`

## Important
The ZIP intentionally does NOT include `node_modules`.
Run `npm install` once on the computer where the project is being run.

The MongoDB database itself is not included in this ZIP. MongoDB must be installed and running locally.
