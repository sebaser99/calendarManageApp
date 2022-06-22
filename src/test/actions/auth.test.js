import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startChecking, startLogin, startLogout, startResgister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch'

jest.mock('sweetalert2', ()=> ({
    fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();

describe('Pruebas en las acciones del Auth', ()=> {
    beforeEach(()=> {
        store = mockStore(initState)
        jest.clearAllMocks()
    })

    test('startLogin correcto', async ()=> {
        await store.dispatch(startLogin('sebaser99@yahoo.com', '1234567'));

        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload:{
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        // console.log(localStorage.setItem.mock.calls[0][1])
    })

    test('startLogin incorrecto', async ()=> {
        await store.dispatch(startLogin('sebaser99@yahoo.com', '12345678'));

        let actions = store.getActions()
        expect(actions).toEqual([]);

        expect(Swal.fire).toHaveBeenCalledWith("Error", "Invalid password", "error")

        // console.log(localStorage.setItem.mock.calls[0][1])

        await store.dispatch(startLogin('sebasery99@yahoo.com', '1234567'));
        expect(Swal.fire).toHaveBeenCalledWith("Error", "No existe un usuario con ese email", "error")
    })

    test('startRegister Correcto', async ()=> {
        fetchModule.fetchSinToken = jest.fn(()=>({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123ABC123'
                }
            }
        }))
        await store.dispatch(startResgister('df@df.com', '123456', 'df'))
        const actions = store.getActions();
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    })

    test('startChecking Correcto', async ()=> {
        fetchModule.fetchConToken = jest.fn(()=>({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123ABC123'
                }
            }
        }))

        await store.dispatch(startChecking());
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos'
            }
        })
     
        expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123ABC123")
        // expect(localStorage.setItem).toHaveBeenCalledWith("token-init-date", 1649725402508)
    })

    test('startLogout', async ()=> {
        await store.dispatch(startLogout())
        const actions = store.getActions()
        
        expect(localStorage.clear).toHaveBeenCalled()
    })
})