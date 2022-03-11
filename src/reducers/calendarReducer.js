import { types } from "../types/types";

// const initialState = {
//     events: [
//         {
//             id: new Date().getTime(),
//             title: 'Cita con el jefe',
//             start: moment().minutes(0).seconds(0).add(1, 'hours').toDate(),
//             end: moment().minutes(0).seconds(0).add(2, 'hours').toDate(),
//             notes: 'LLevar los documentos',
//             user: {
//                 id: '1234',
//                 name: 'Sebastian'
//             }
//         }
//     ],
//     activeEvent: null,
//     slotDate: {
//         start: '',
//         end: '',
//         onSlot: false
//     },

// }
const initialState = {
    events: [],
    activeEvent: null,
    slotDate: {
                start: '',
                end: '',
                onSlot: false
            }
}

export const calendarReducer = (state = initialState, action )=> {

    switch (action.type){

        case types.eventsSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventsAddNew:
            return {
                ...state,
                events:[
                    ...state.events,
                    action.payload

                ]
                
            }
        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null

            }
        
        case types.eventUpdated:
            return{
                ...state,
                events: state.events.map(
                    e => e.id === action.payload.id 
                    ? action.payload
                    : e
                )
            }

        case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(
                    e => e.id !== state.activeEvent.id
                ),
                activeEvent: null

            }
        
        case types.eventSlotNew :
            return {
                ...state,
                slotDate : {
                    start: action.payload.start,
                    end: action.payload.end,
                    onSlot: true

                }
            }  
            
        case types.eventSlotDelete :
            return {
                ...state,
                slotDate:{
                    start: '',
                    end: '',
                    onSlot: false

                }
            } 
            
        case types.eventLoaded :
            return {
                ...state,
                events: [ ...action.payload]
            }

        case types.eventLogout :
            return {
                ...initialState
            }

        default:
            return state;
    }

}