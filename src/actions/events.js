import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvent } from "../helpers/prepareEvent";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const {name, uid} = getState().auth
        
        try{

            const res = await fetchConToken('events/new', event, 'POST')
            const body = await res.json();

            if(body.ok){
                event.id = body.event.id
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch(eventAddNew(event))
            }    

        } catch(error){
            console.log(error)
        }

    }
}

const eventAddNew = (event)=> ({
    type: types.eventsAddNew,
    payload: event
})

export const eventSetActive = (event)=> ({
    type: types.eventsSetActive,
    payload: event
})

export const clearActiveEvent = ()=> ({type: types.eventClearActive})

export const startUpdateEvent = (event) => {
    return async (dispatch) => {
        try {
            const res = await fetchConToken(`events/${event.id}`, event, 'PUT')
            const body = await res.json()

            if(body.ok){
                dispatch(updateEvent(event))
            } else {
                 Swal.fire('Error', body.msg, 'error')
            }  
        } catch(error){
         console.log(error)    
        }
    }
}

const updateEvent = (event) => ({
    type: types.eventUpdated,
    payload: event
})

export const startEventDelete = () => {
    
    return async (dispatch, getState) => {
        const {id} = getState().calendar.activeEvent
        try{
            const res = await fetchConToken(`events/${id}`, {}, 'DELETE')
            const body = await res.json();
            if(body.ok){
                dispatch(deletedEvent())
                
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
            Swal.fire('Borrado ', 'Borrado Exitosamente', 'success')

        } catch(error){
            console.log(error)
            
        }
    }
          
}


const deletedEvent = () =>({type: types.eventDeleted})

export const slotNewEvent = (slotEvent) => ({
    type: types.eventSlotNew,
    payload: slotEvent
})

export const slotEventDelete = () => ({
    type: types.eventSlotDelete
})

export const eventsStartLoaded = () => {
    return async (dispatch) => {
        try{
            const res = await fetchConToken('events/')
            const body = await res.json()
            const eventos = prepareEvent(body.eventos) 
            dispatch(eventsLoaded(eventos))
         
        } catch(error) {
            console.log(error)
        }
    }
}

const eventsLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events

})

export const eventsLogout = () =>(
        {
            type: types.eventLogout
            }
    )
        

