import  {useEffect, useState} from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { clearActiveEvent, eventStartAddNew, slotEventDelete, startUpdateEvent } from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');
const now =  moment().minutes(0).seconds(0).add(1, 'hours')
const nowPlus1 = now.clone().add(1, 'hours')

const initState = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {
    const {modalOpen} =  useSelector(state => state.ui)
    const {activeEvent} =  useSelector(state => state.calendar)
    const {slotDate} =  useSelector(state => state.calendar)
    const dispatch = useDispatch()

    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())
    const [validTitle, setValidTitle] = useState(true)
    const [formValues, setFormValues] = useState(initState)
    const {title, notes, start, end} = formValues;

    useEffect(() => {
      if(activeEvent && !slotDate.onSlot){
        setDateStart(activeEvent.start)
        setDateEnd(activeEvent.end)
          setFormValues(activeEvent)
          console.log('con evento activo')
      } else if(!activeEvent && modalOpen && !slotDate.onSlot){
            setDateStart(now.toDate())
            setDateEnd(nowPlus1.toDate())
          setFormValues(initState)
          console.log('sin evento activo')
      } else if(!activeEvent && slotDate.onSlot){
            setDateStart(slotDate.start)
            setDateEnd(slotDate.end)
            setFormValues(initState)
      }
    }, [activeEvent, setFormValues, modalOpen])
    

    const handleInputChange = ({target})=> {
        setFormValues({
            ...formValues,
            [target.name] : target.value
        })
    }
    
    const handleSubmitForm = (e)=> {
        e.preventDefault()
        const startMoment = moment(start)
        const endMoment = moment(end)

        if(startMoment.isSameOrAfter(endMoment)){
            return Swal.fire('Error', 'La fecha final debe ser mayor  a la fecha inicial')
        }
        if(title.trim().length < 2) {
            return setValidTitle(false)
        }
        setValidTitle(true)

        if(activeEvent){
            dispatch(startUpdateEvent(formValues))
        }else {
            dispatch(eventStartAddNew( formValues))
        }
        dispatch(uiCloseModal())
        
    }

    const closeModal = () => {
       dispatch(uiCloseModal())
       dispatch(clearActiveEvent())
       setFormValues(initState)
      dispatch(slotEventDelete())
    }

    const handleStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start:e
        })
    }
    const handleEndDateChange = (e) => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

  return (
        <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className='modal'
        overlayClassName='modal-fondo'
        >
            <h1>{activeEvent ? 'Editar Evento' :' Nuevo evento'} </h1>
            <hr />
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker onChange={handleStartDateChange} value={dateStart} />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker onChange={handleEndDateChange} value={dateEnd} minDate={dateStart} />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!validTitle && 'is-invalid'}`} 
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
    </Modal>
  )
}
