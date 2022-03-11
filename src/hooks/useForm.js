import { useState } from "react";

export const useForm = (initialValue={}) => {
  const [formValue, setFormValue] = useState(initialValue)
  const [submit, setSubmit] = useState(false)

  const handleChangeInput = ({target})=>{
    setFormValue({
        ...formValue,
        [target.name ] : target.value
        })
    }  
    const reset = ()=>{
        setFormValue(initialValue)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formValue)
        setSubmit(true)
        
    }

    return[ 
        formValue,
        handleChangeInput,
        reset,
        handleSubmit,
        submit
    ]
}