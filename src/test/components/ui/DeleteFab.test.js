import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';

import configurStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { DeleteFab } from '../../../components/ui/DeleteFab';
import { startEventDelete } from '../../../actions/events';

const middlewares = [thunk];
const mockStore = configurStore(middlewares);
const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn()

jest.mock('../../../actions/events', ()=>({
    startEventDelete : jest.fn()
}))  

const wrapper = mount(
    <Provider store={store}>
        <DeleteFab />

    </Provider>
)


describe('pruebas en <DeleteFab />', ()=> {
    test('debe mostrarse de forma correcta', ()=> {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe hacer el llamado a la función startEventDelete', ()=> {
        wrapper.find('.btn').simulate('click')
        expect(startEventDelete).toHaveBeenCalled()
    })
})