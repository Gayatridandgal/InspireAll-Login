# InspireAll-Login
A secure user authentication system built with Node.js, Express, MongoDB, and EJS, featuring:

- Sign Up and Login functionality
- Email & Password authentication
- Numeric CAPTCHA verification
- Session-based user management

 ## 🔧Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS Templating Engine
- connect-mongo for session store
- dotenv for environment variables

## 📁 Project Structure

```

inspirelogin/
│
├── public/               # Static files (CSS, JS, images)
├── routes/               # Express routes
│   └── auth.js
├── views/                # EJS templates
│   ├── login.ejs
│   └── signup.ejs
├── .env                  # Environment variables
├── server.js             # Entry point
├── package.json
└── README.md

````

## ⚙️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Gayatridandgal/InspireAll-Login
   cd inspirelogin
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   MONGO_URI=mongodb://localhost:27017/inspirelogin
   SESSION_SECRET=your_session_secret_here
   ```

4. Run the server:

   ```bash
   node server.js
   ```
