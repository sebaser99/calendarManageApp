import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';

import configurStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../actions/auth';


const middlewares = [thunk];
const mockStore = configurStore(middlewares);
const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn()
jest.mock('../../../actions/auth', ()=> ({
    startLogin: jest.fn()
}))

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen/>
    </Provider>
)

describe('Vamos a probar el <LoginScreen/>', ()=> {
    
    test('debe hacer match con el snapshot', ()=> {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe llamar el dispatch de login', ()=> {
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'sebaser99@yahoo.com'
            }
        });
        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '1234567'
            }
        })

     
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
            
        })

        // expect(startLogin).toHaveBeenCalledWith('sebaser99@yahoo.com', '1234567')
        expect(startLogin).toHaveBeenCalled()
    })

} )
