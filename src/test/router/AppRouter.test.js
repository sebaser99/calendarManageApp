import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';

import configurStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [thunk];
const mockStore = configurStore(middlewares);

// store.dispatch = jest.fn()






describe('pruebas en AppRouter', ()=> {

    test('debe hacer match con el snapshot y mostar el espere...', ()=> {
        const initState = {
            auth: {
                checking: true
            }
        };
        let store = mockStore(initState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
        
            </Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h5').exists()).toBe(true)
    })

    test('debe mostrar la ruta pública', ()=> {
        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        let store = mockStore(initState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
        
            </Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.login-container').exists()).toBe(true)
    })

    test('debe mostrar la ruta privada', ()=> {
        const initState = {
            ui:{
                modalOpen: false
            },
            calendar: {
                events: [],
                slotDate: {
                    start: '',
                    end: '',
                    onSlot: false
                }
            },
            auth: {
                checking: false,
                uid: '12345',
                name: 'Juan Carlos'
            }
        };
        let store = mockStore(initState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
        
            </Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.calendar-screen').exists()).toBe(true)
    })
})