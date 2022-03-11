import { Navigate } from "react-router-dom"

export const PublicRoutes = ({children, isLoginIn}) => {
    return isLoginIn ? <Navigate to='/' /> : children 
}