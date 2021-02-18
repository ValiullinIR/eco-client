import { Button, TextField } from '@material-ui/core'
import { Add, Clear, Delete, Edit } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/useInput'

import { deleteUser, postUser, setUser, updateUser } from "../../store/actions"

export const UserForm = () => {

    const dispatch = useDispatch()
    const current = useSelector(state => state.users.current)

    const name = useInput()
    const username = useInput()
    const surname = useInput()
    const password = useInput()

    const cleanup_fields = () => {
        name.cleanup()
        username.cleanup()
        surname.cleanup()
        password.cleanup()
    }

    const handleSubmit = () => {
        if (!current) {
            const data = new FormData()
            data.append("name", name.value)
            data.append("username", username.value)
            data.append("surname", surname.value)
            data.append("password", password.value)
            dispatch(postUser(data))
        } else {
            const data = {}
            if (current.name !== name.value)
                data.name = name.value
            if (current.username !== username.value)
                data.username = username.value
            if (current.surname !== surname.value)
                data.surname = surname.value
            dispatch(updateUser(current._id["$oid"], data))
        }
    }
    const handleClear = () => {
        dispatch(setUser())
    }
    const handleDelete = () => {
        dispatch(deleteUser(current._id['$oid']))
    }
    useEffect(() => {
        if (current) {
            name.setValue(current.name ? current.name : "")
            username.setValue(current.username ? current.username : "")
            surname.setValue(current.surname ? current.surname : "")
            password.setValue(current.password ? current.password : "")
        } else
            cleanup_fields()

        console.log("current", current)
    }, [current])

    return (
        <div>
            <div className="input_container">
                <TextField label="Логин" {...username.bind} />
            </div>
            <div className="input_container">
                <TextField label="Имя" {...name.bind} />
            </div>
            <div className="input_container">
                <TextField label="Фамилия" {...surname.bind} />
            </div>
            <div className="input_container">
                <TextField type="password" label="Пароль" {...password.bind} />
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
