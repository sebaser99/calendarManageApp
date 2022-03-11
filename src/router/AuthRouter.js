
import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { Error } from "../components/error/Error";

export const AuthRouter = () => {
    return (
            <div className="auth__main">
                <div className="auth__box-container">
                <Routes>
                    <Route  path='/login' element={<LoginScreen/> } />
                    <Route  path='/register' element={<RegisterScreen />} />
                    <Route  path='*' element={<Error />} />
                </Routes>
                </div>
            </div>
    )
}
