import { types } from "../../types/types"

describe('Vamos a realizar pruebas en los types', ()=> {
    test('debe ser igual los types con el archivo', ()=> {
        expect(types).toEqual({
            uiOpenModal : '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',
        
            eventStartAddNew : '[events] Start Add New',
            eventsAddNew : '[events] Add New',
            eventsSetActive: '[events] Set Active',
            eventLogout: '[events] Logout',
            eventClearActive: '[events] Clear Active Event',
            eventUpdated: '[events] Updated Event',
            eventDeleted: '[events] Deleted Event',
            eventSlotNew : '[events] Slot New Event',
            eventSlotDelete: '[events] Slot Delete',
            eventLoaded : '[events] Event Loaded',
        
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start Login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout'
        })
    })
})