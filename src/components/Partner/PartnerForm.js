import { Button, TextField } from '@material-ui/core'
import { Add, Clear, Delete, Edit } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useInput } from '../../hooks/useInput'
import { deletePartner, postPartner, setPartner, updatePartner } from '../../store/actions'


export const PartnerForm = () => {
    
    const dispatch = useDispatch()
    const current = useSelector(state => state.partners.current)

    const name = useInput()
    const points = useInput([])

    const handleSubmit = () => {
        if (!current) {
            const data = new FormData()
            data.append("name", name.value)
            dispatch(postPartner(data))
        } else {
            const data = {}
            if(current.name !== name.value)
                data['name'] = name.value
            dispatch(updatePartner(current._id, data))
        }
    }
    const handleClear = () => {
        dispatch(setPartner())
    }

    const handleDelete = () => {
        dispatch(deletePartner(current._id))
    }

    useEffect(()=>{
        if (current) {
            name.setValue(current.name)
            points.setValue(current.points)
        } else {
            name.cleanup()
            points.cleanup()
        }
    },[current])

    return (
        <div>
            <div className="input_container">
                <TextField label="Название" {...name.bind} />
            </div>
            <div className="input_container">
                {current && <>
                    <Button
                        style={{ marginRight: '16px' }}
                        variant="contained"
                        color="primary"
                        onClick={handleDelete}
                        startIcon={<Delete />}
                    >Удалить</Button>
                    <Button
                        style={{ marginRight: '16px' }}
                        variant="contained"
                        color="primary"
                        onClick={handleClear}
                        startIcon={<Clear />}
                    >Очистить</Button>
                </>}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={!current ? <Add /> : <Edit />}
                >{!current ? "Создать" : "Изменить"}</Button>
            </div>
        </div>
    )
}
