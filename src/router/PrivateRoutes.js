
import { Navigate} from "react-router-dom"

export const PrivateRoutes = ({children, isLoginIn}) => {
 
    return isLoginIn ? children : <Navigate to='/auth/login' />
} 