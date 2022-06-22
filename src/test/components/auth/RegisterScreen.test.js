import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';

import configurStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startResgister } from '../../../actions/auth';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import Swal from 'sweetalert2';


const middlewares = [thunk];
const mockStore = configurStore(middlewares);
const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn()
jest.mock('../../../actions/auth', ()=> ({
    startResgister: jest.fn()
}))


jest.mock('sweetalert2', ()=> ({
    fire: jest.fn()
}))

const wrapper = mount(
    <Provider store={store}>
        <RegisterScreen/>
    </Provider>
)

describe('vamos a probar el <RegisterScreen/>', ()=> {

    beforeEach(()=> {
        jest.clearAllMocks()
    })
    test('debe retornar el swal cuando las contraseñas sean erroneas', ()=> {
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '12345'
            }
        });
        
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        expect(wrapper).toMatchSnapshot()
        expect(startResgister).not.toHaveBeenCalled()
        expect(Swal.fire).toBeCalledWith("Error", "Los passwords deben ser iguales", "error")
    })
})