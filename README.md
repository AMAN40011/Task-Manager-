Task Manager

A full-stack Task Manager application built using the MERN Stack. Users can create an account,
log in securely, and manage their tasks with a simple and responsive interface.

🚀 Features
User registration and login
JWT-based authentication
Secure password hashing
Create new tasks
View tasks
Update task status
Delete tasks
User-specific tasks
Protected backend routes
RESTful APIs
Toast notifications
Responsive React UI
MongoDB database integration


🛠️ Tech Stack
Frontend

React.js
React Router
Axios
Tailwind CSS / CSS
React Toastify
Vite
Backend
Node.js
Express.js
MongoDB
Mongoose
JSON Web Token (JWT)
bcrypt
Zod

📁 Project Structure
Task-Manager/
│
├── Backend/
│   ├── controller/
│   │   ├── todo.js
│   │   └── user.js
│   │
│   ├── jwt/
│   │   └── token.js
│   │
│   ├── middleware/
│   │   └── authentication.js
│   │
│   ├── model/
│   │   ├── todo.js
│   │   └── user.js
│   │
│   ├── routes/
│   │   ├── todo.js
│   │   └── user.js
│   │
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── component/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
⚙️ Installation
1. Clone the repository
git clone https://github.com/AMAN40011/Task-Manager-.git

Move into the project directory:

cd Task-Manager-
🔧 Backend Setup

Move into the backend directory:

cd Backend

Install dependencies:

npm install

Create a .env file inside the Backend folder:

PORT=4001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend server:

npm start

Or, if your project uses Node directly:

node index.js
💻 Frontend Setup

Open another terminal and move into the frontend directory:

cd Frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will normally run on:

http://localhost:5173
🔐 Authentication

The application uses JWT authentication to protect user-specific routes.

The authentication flow is:

User
  ↓
Signup / Login
  ↓
Backend validates credentials
  ↓
JWT Token Generated
  ↓
Authenticated Request
  ↓
Protected Todo APIs

Passwords are securely hashed using bcrypt before being stored in the database.

🔄 Application Flow
React Frontend
      ↓
     Axios
      ↓
Express REST API
      ↓
Authentication Middleware
      ↓
Controllers
      ↓
Mongoose
      ↓
MongoDB

📌 API Functionality
User
POST   /user/signup
POST   /user/login
Todo
POST   /todo/create
GET    /todo/fetch
PUT    /todo/update/:id
DELETE /todo/delete/:id

API routes may vary depending on the current backend configuration.

🔒 Environment Variables

Do not upload your .env file to GitHub.

Example:
PORT=
MONGO_URI=
JWT_SECRET=
Keep your actual credentials private.

🎯 What I Learned

Building this project helped me gain practical experience with:

Building REST APIs using Express
Connecting MongoDB with Mongoose
JWT authentication
Password hashing with bcrypt
React state management
React Router
Axios API integration
CRUD operations
Protected routes
Middleware
Error handling

Git and GitHub
🔮 Future Improvements
Add task categories
Add task priority
Add due dates
Add search and filtering
Add dark mode
Add pagination
Deploy frontend and backend
Add automated testing

👨‍💻 Author
Aman Pal
B.Sc. Information Technology
Mumbai, India
GitHub

https://github.com/AMAN40011

⭐ If you find this project useful, consider giving it a star.
