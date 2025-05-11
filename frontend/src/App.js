import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/user/Dashboard";
import VerifierDashboard from "./pages/verifier/Dashboard";
import UserLoans from "./pages/user/Loans";
import LoanApplication from "./pages/user/LoanApplication";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/loans"
            element={
              <ProtectedRoute role="user">
                <UserLoans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/apply"
            element={
              <ProtectedRoute role="user">
                <LoanApplication />
              </ProtectedRoute>
            }
          />

          {/* Verifier Routes */}
          <Route
            path="/verifier/dashboard"
            element={
              <ProtectedRoute role="verifier">
                <VerifierDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
