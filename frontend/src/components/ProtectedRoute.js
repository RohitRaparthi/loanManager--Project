import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext"

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useUser()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== role) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />
    } else if (user?.role === "user") {
      return <Navigate to="/user/dashboard" replace />
    } else if (user?.role === "verifier") {
      return <Navigate to="/verifier/dashboard" replace />
    }
  }

  return <>{children}</>
}

export default ProtectedRoute
