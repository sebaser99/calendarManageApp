import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import '../../style/login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()  

    const [formValue, handleChangeInput]= useForm({
        lEmail: "",
        lPassword: ""
    })
    const {lEmail, lPassword} = formValue

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(startLogin(lEmail, lPassword))
    }
    const handleNewAccount = ()=> {
        if(process.env.NODE_ENV !== 'test'){
            navigate('/auth/register')
        }
        
    }

  return (
        <div className="container login-container">
                   
            <div className="col-md-6 login-form-1">
                <h3>Ingreso</h3>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                            name="lEmail"
                            value={lEmail}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="lPassword"
                            value={lPassword}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit"
                            className="btnSubmit"
                            value="Login" 
                        />
                    </div>
                </form>
                <div className='px-5 overline' onClick={handleNewAccount}>Create a new Account</div>
            </div>
        
                </div>          
     
  );
};
