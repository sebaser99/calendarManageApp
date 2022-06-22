import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import {messages} from  '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import {uiOpenModal } from '../../actions/ui';
import { clearActiveEvent, eventSetActive, eventsStartLoaded, slotNewEvent } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteFab } from '../ui/DeleteFab';

moment.locale('es');

const localizer = momentLocalizer(moment)


export const CalendarScreen = () => {  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(eventsStartLoaded())
  }, [dispatch])
  
  
  const {events, activeEvent} = useSelector(state => state.calendar)
  const {uid} = useSelector(state => state.auth)
   
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  

  const onDoubleClick = (e)=> {
    dispatch(uiOpenModal())

  }
  const onSelectEvent = (e)=> {
    dispatch(eventSetActive(e))
  }
  const onViewChange = (e)=> {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (e)=> {
    
      let sebas = {
        end: moment(e.end).minutes(0).seconds(0).toDate(),
        start: moment(e.start).minutes(0).seconds(0).toDate()
      }
    if(activeEvent){
      dispatch(clearActiveEvent())
    } else {
      dispatch(slotNewEvent(sebas))
      dispatch(uiOpenModal())
    }
    
  }
 

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: (uid === event.user._id) ? '#367cf7' : '#465660',
      borderRadius : '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {style}
  }
  return (
      <div className='calendar-screen'>
        <Navbar />
        <div className='container'>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages={messages}
          eventPropGetter = {eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          view={lastView}
          onSelectSlot={onSelectSlot}
          selectable={true}
          components={{
            event: CalendarEvent
          }}
        />
        <AddNewFab />
        {
          activeEvent && <DeleteFab />
        }
        <CalendarModal />
        </div>
      </div>
    );
};
