import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';

import configurStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import moment from 'moment';

 


const middlewares = [thunk];
const mockStore = configurStore(middlewares);
const now =  moment().minutes(0).seconds(0).add(1, 'hours')
const nowPlus1 = now.clone().add(1, 'hours')
const initState = {
    calendar: {
        events: [],
        slotDate: {
            start: '',
            end: '',
            onSlot: false
        },
        activeEvent: {
            title: 'Hola',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: 1234,
        name: 'Sebastian'
    },
    ui: {
        modalOpen: true
    }

};
let store = mockStore(initState);
store.dispatch = jest.fn()



const wrapper = mount(
    <Provider store={store}>
        <CalendarModal/>
    </Provider>
)

describe('vamos a hacer pruebas en el <CalendarModal />', ()=> {
    test('debe existir el modal', ()=> {
        // expect(wrapper.find('.modal').exists()).toBe(true)
        // expect(wrapper.find('Modal').prop('isOpen')).toBe(true)
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true)
    })
})