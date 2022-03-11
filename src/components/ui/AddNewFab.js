import React from 'react'
import { useDispatch } from 'react-redux'
import { clearActiveEvent } from '../../actions/events'
import { uiOpenModal } from '../../actions/ui'

export const AddNewFab = () => {
  const dispatch = useDispatch()

  const handleCreateNewEvent = () => {
    dispatch(clearActiveEvent())
    dispatch(uiOpenModal())
   
  }
  return (
    <button className='btn btn-primary fab'
        onClick={handleCreateNewEvent}
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}
