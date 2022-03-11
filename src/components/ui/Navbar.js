import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { eventsLogout } from '../../actions/events';

export const Navbar = () => {
  const {name} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(startLogout())
    dispatch(eventsLogout())
  }
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
        <span className='navbar-brand'>
           {name}
        </span>
        <button className='btn btn-outline-danger' onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket"></i>
            <span> Salir</span>
        </button>
    </div>
  ) 
};
