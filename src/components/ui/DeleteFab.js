import { useDispatch} from "react-redux"
import { startEventDelete } from "../../actions/events"

export const DeleteFab = () => {
    const dispatch = useDispatch()
    const handleDeleteEvent = () =>{
        dispatch(startEventDelete())
    }

  return (
    <button className='btn btn-danger fab-danger'
        onClick={handleDeleteEvent}
    >
        <i className='fas fa-trash'></i>
        <span>Borrar Evento</span>
    </button>
  )
}
