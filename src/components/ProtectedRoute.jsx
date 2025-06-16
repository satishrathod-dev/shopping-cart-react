
import { Navigate, useLocation } from "react-router-dom"
import { useUser } from "../context/UserContext"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUser()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
