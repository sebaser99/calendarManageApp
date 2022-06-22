import { login, checkingFinish, logout  } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";
import {types} from '../../types/types';

const initialState = {
    checking: true
}

describe('pruebas en authReducer', ()=> {
    test('debe retornar el estado por defecto', ()=> {
        const state = authReducer(initialState, {})
        expect(state).toEqual(initialState)
    })

    test('Debe autenticar el usuario', ()=> {
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123', 
                name: 'Sebastian'
            }
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual({ checking: false, uid: '123', name: 'Sebastian' })
    })

    test('debe retornar el estado con el login', ()=> {
        const logint =   login()
        const state = authReducer(initialState, logint)
        expect(state).toEqual({checking: false})
        // expect(state).toEqual({checking: true})
    })
    test('debe retornar el estado con el checkingFinish', ()=> {
        const checkingF = checkingFinish()
        const state = authReducer(initialState, checkingF)
        expect(state).toEqual({checking: false})
    })

    test('debe retornar el estado con el logout', ()=> {
        const lOut = logout()
        const state = authReducer(initialState, lOut)
        expect(state).toEqual({checking: false})
    })

})