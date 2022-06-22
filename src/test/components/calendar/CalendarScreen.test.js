import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';

import configurStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import {messages} from '../../../helpers/calendar-messages-es'
import { eventSetActive } from '../../../actions/events';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configurStore(middlewares);
const initState = {
    calendar: {
        events: [],
        slotDate: {
            start: '',
            end: '',
            onSlot: false
        }
    },
    auth: {
        uid: 1234,
        name: 'Sebastian'
    },
    ui: {
        openModal: false
    }

};
let store = mockStore(initState);
store.dispatch = jest.fn()



jest.mock('../../../actions/events', ()=>({
    eventSetActive : jest.fn(),
    eventsStartLoaded: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen/>
    </Provider>
)


describe('vamos a evaluar el <CalendarScreen/>', ()=> {
    test('debe hacer match con el snapshot', ()=> {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe mostar los eventos del CalendarScreen', ()=> {
        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages')
        expect(calendarMessages).toEqual(messages)
       

       calendar.prop('onDoubleClickEvent')();
        // expect( store.dispatch).toHaveBeenCalledWith()
        expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal})


        calendar.prop('onSelectEvent')({start: 'Hola'});
        expect(eventSetActive).toHaveBeenCalledWith({start: 'Hola'})

        calendar.prop('onView')('week')
        expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week')

    })
})