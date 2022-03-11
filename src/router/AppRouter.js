import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
 Route
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { Error } from '../components/error/Error';
import { AuthRouter } from './AuthRouter';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {
 const dispatch = useDispatch()
 const {checking, uid} = useSelector(state =>state.auth)
 
  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])
  if(checking){
    return(
      <h5>Cargando. Por favor espere ...</h5>
    )
  } else {
    return (
        <BrowserRouter>
            <Routes>
              <Route  path='/auth/*' element={<PublicRoutes isLoginIn={!!uid}> <AuthRouter/> </PublicRoutes>} />
              <Route  path='/' element={ <PrivateRoutes isLoginIn={!!uid}> <CalendarScreen/> </PrivateRoutes> }  />
              <Route  path='*' element={ <Error/> }  />
            </Routes>
        </BrowserRouter>
    )

  }
};
