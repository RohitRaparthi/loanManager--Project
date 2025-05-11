# Loan Manager Web Application

This is a role-based loan management system with three types of users: **Admin**, **Verifier**, and **User**. The application includes protected routes, contextual authentication, and dashboard interfaces for each role.

## 📁 Project Structure

```
src/
├── components/            # Reusable components like Sidebar, Header, etc.
│   ├── header.css
│   ├── Header.js
│   ├── LoanTable.js
│   ├── ProtectedRoute.js
│   ├── Sidebar.js
│   ├── StatCard.js
│
├── context/
│   └── UserContext.js     # React context for authentication and role management
│
├── pages/
│   ├── admin/
│   │   └── Dashboard.js   # Admin dashboard
│   │
│   ├── user/
│   │   ├── dashboard.css
│   │   ├── Dashboard.js   # User dashboard with loan stats
│   │   ├── LoanApplication.js
│   │   ├── LoanApplication.css
│   │   ├── Loans.js
│   │   └── Loans.css
│   │
│   ├── verifier/
│   │   ├── dashboard.css
│   │   └── Dashboard.js   # Verifier dashboard for reviewing loan requests
│   
├── Login.js               # Login screen
├── Register.js            # User registration
├── App.js
├── App.css
└── index.js
```

## 🚀 Features

- Role-based login (admin / verifier / user)
- Protected dashboard routes using `ProtectedRoute`
- React Context API for global auth state
- Persistent login using `localStorage` and `Cookies`
- Loan Application form for users
- Dynamic dashboards with statistics and loan listings
- Modular CSS for each page

## 🔐 Roles and Access

| Role      | Dashboard Path         | Features                                     |
|-----------|------------------------|----------------------------------------------|
| User      | `/user/dashboard`      | Submit and view loan applications            |
| Verifier  | `/verifier/dashboard`  | Review and verify submitted loans            |
| Admin     | `/admin/dashboard`     | View overall stats and manage loans          |

## 🧪 Demo Credentials

Use any of the following emails during login to simulate different roles:

- **Admin**: `admin@example.com`
- **Verifier**: `verifier@example.com`
- **User**: `user@example.com`

All demo accounts use: `password123`

## 📦 Installation

### Prerequisites
- Node.js (v14 or later)

### Clone and Setup

```bash
git clone https://github.com/RohitRaparthi/loan-manager.git
cd loan-manager
npm install
```

### Run Locally

```bash
npm start
```

> The app will run at [http://localhost:3000](http://localhost:3000)

## 🌐 Backend API

Make sure your backend is deployed or running locally. This frontend is configured to make requests to:

```
https://loanmanager-project.onrender.com
```

> Adjust the endpoint in your fetch calls if needed.

## 🛠️ Future Improvements

- Form validations using Yup / React Hook Form
- Admin control to edit/delete users or loans
- Better error messaging & toast notifications
- Mobile responsive design

## 📄 License

This project is licensed under the MIT License.

## 🙌 Acknowledgments

Built with ❤️ using React and styled-components as part of a role-based full-stack loan management project.