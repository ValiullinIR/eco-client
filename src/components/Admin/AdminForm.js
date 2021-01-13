import React, { useEffect, useState } from 'react'
import { useInput } from '../../hooks/useInput'
import slugify from "slugify"
import { Button, List, ListItem, ListItemIcon, ListItemText, TextField, Checkbox, Typography } from '@material-ui/core'
import { Delete, Clear, Edit, Add } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentAdmin, deleteAdmin, editAdmin, postAdmin } from '../../store/actions'


const PERMISSIONS = {
    "activities": "Активности",
    "posts": "Посты",
    "admins": "Админы",
    "reports": "Отчеты",
}

export const AdminForm = () => {

    const dispatch = useDispatch()
    const current = useSelector(state => state.admins.current)

    const name = useInput()
    const login = useInput()
    const password = useInput()
    const [permissions, setPermissions] = useState({
        activities: false,
        posts: false,
        admins: false,
        reports: false,
    })

    useEffect(() => {
        if (current) {
            name.setValue(current.name ? current.name : "")
            login.setValue(current.login ? current.login : "")
            password.setValue(current.password ? current.password.split("").reduce((r, i) => r += "*", "") : null)
            setPermissions(current.permissions)
        } else {
            cleanup()
        }
    }, [current])
    useEffect(() => {
        if (!current)
            login.setValue(slugify(name.value, { lower: true }).toLowerCase())
    }, [name.value, current])


    const createAdminPayload = () => {
        if (current)
            return {
                name: name.value,
                login: login.value,
                permissions
            }
        return {
            name: name.value,
            login: login.value,
            password: password.value,
            permissions
        }
    }
    const cleanup = () => {
        name.setValue("")
        login.setValue("")
        password.setValue("")
        setPermissions({
            activities: false,
            posts: false,
            admins: false,
            reports: false,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!current) {
            dispatch(postAdmin(createAdminPayload()))
        } else {
            dispatch(editAdmin(current._id, createAdminPayload()))
        }
    }
    const handleClear = (e) => {
        e.preventDefault()
        dispatch(clearCurrentAdmin())
    }
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteAdmin(current._id))
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Создание админа</h2>
            <div className="input_container">
                <TextField
                    fullWidth
                    label="Имя"
                    {...name.bind}
                />
            </div>
            <div className="input_container">
                <TextField
                    fullWidth
                    label="Логин"
                    {...login.bind}
                />
            </div>
            <div className="input_container">
                <TextField
                    fullWidth
                    label="Пароль"
                    {...password.bind}
                />
            </div>
            <div className="input_container">
                <Typography>Уровни доступа</Typography>
                <List>
                    {Object.keys(permissions).map(key => (
                        <ListItem key={key}>
                            <ListItemText primary={PERMISSIONS[key]} />
                            <ListItemIcon>
                                <Checkbox checked={permissions[key]} onClick={() => setPermissions(p => ({ ...p, [key]: !permissions[key] }))} />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
            </div>
            <div className="form_action__group">
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
                    type="submit"
                    startIcon={!current ? <Add /> : <Edit />}
                >{!current ? "Создать" : "Изменить"}</Button>
            </div>
        </form>
    )
}
