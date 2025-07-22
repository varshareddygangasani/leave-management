🗂️ Leave Management System
A full-stack Leave Management System built with React (TypeScript) on the frontend and Node.js + Express + MongoDB on the backend. It provides role-based login, leave request submission, and an interactive dashboard to view and manage leave applications.

<br>
🔍 Features
🔐 Authentication with secure login using tokens and middleware

📝 Leave Request Form for submitting leave applications

📋 Dashboard to view leave status and history

👤 Role-based access: Admin/User functionalities

🌐 REST API built with Express and MongoDB

🎨 Responsive UI with React & custom styling

✅ Modular & Scalable Architecture using MVC pattern

📊 UML Diagrams for architecture, use cases, and workflows

<br>
⚙️ Tech Stack
Frontend	Backend	Database	Tools & Others
React + TypeScript	Node.js + Express	MongoDB	Git, GitHub, JWT, CSS
React Router	RESTful APIs	Mongoose	Postman, Vite

<br>
📁 Project Structure
php
Copy
Edit
leave-management/
│
├── backend/
│   ├── middleware/             # authMiddleware.js
│   ├── models/                 # Leave.js, User.js, etc.
│   ├── routes/                 # leaveRoutes.js, userRoutes.js
│   ├── server.js               # Entry point for backend
│   └── createTestUser.js       # Utility to seed test user
│
├── frontend/
│   ├── public/                 # Static HTML
│   ├── src/
│   │   ├── pages/              # Login.tsx, Dashboard.tsx
│   │   ├── services/           # api.ts for API calls
│   │   ├── App.tsx             # Routing logic
│   │   └── index.tsx, index.css
│   └── package.json
│
├── diagrams/                   # UML diagrams (.puml files)
│
└── README.md
<br>
🚀 Getting Started
📦 Backend Setup
bash
Copy
Edit
cd backend
npm install
node server.js
Make sure MongoDB is running locally or update the connection string in server.js.

💻 Frontend Setup
cd frontend
npm install
npm run dev
This starts the React app at http://localhost:5173

📸 Screenshots
Login Page	Dashboard Page
![leave](https://github.com/user-attachments/assets/c87b0d5b-2811-495e-ac1c-a5de805c72c1)
![leavema](https://github.com/user-attachments/assets/c984e8c5-306a-44ce-9303-db8e8ca25154)

