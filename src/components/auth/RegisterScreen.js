import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startResgister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import '../../style/login.css';

export const RegisterScreen = () => {
    const dispatch = useDispatch()
    if(process.env.NODE_ENV !== 'test'){
        const navigate = useNavigate()
    }
    const [registerFormValues, handleInputChange] = useForm({
        rEmail: "sebaser99@hotmail.com", 
        rName: "Alex Rodriguez", 
        rPassword1: "1234567", 
        rPassword2: "1234567"
    })
    const {rEmail, rName, rPassword1, rPassword2} = registerFormValues

    const handleRegister = (e) => {
        e.preventDefault();
        if(rPassword1 !== rPassword2){
            return Swal.fire('Error', "Los passwords deben ser iguales", 'error')
        }
        dispatch(startResgister(rName, rEmail, rPassword1))

    }
    const handleBack = () => {
        if(process.env.NODE_ENV !== 'test'){
            navigate(-1)
        }
        
    }
  return (
    <div className="container login-container">
        <div className="col-md-8 login-form-2">
            <h3>Registro</h3>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="rName"
                        value={rName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        name="rEmail"
                        value={rEmail}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="rPassword1"
                        value={rPassword1}
                        onChange={handleInputChange} 
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repita la contraseña"
                        name="rPassword2"
                        value={rPassword2}
                        onChange={handleInputChange}  
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="submit" 
                        className="btnSubmit" 
                        value="Crear cuenta" />
                </div>
            </form>
            <div className='px-5 overline blue' onClick={handleBack}> Volver</div>
        </div>
      </div>
  )
};
