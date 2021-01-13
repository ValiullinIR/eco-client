import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField, makeStyles } from "@material-ui/core"
import { useInput } from '../../hooks/useInput'
import { loginAction } from '../../store/actions'
import { useHistory } from 'react-router'

import './style.css'

const useStyles = makeStyles({
    input: {
        borderRadius: 32
    }
})


export const LoginPage = () => {
    const styles = useStyles()
    const history = useHistory()

    const login = useInput()
    const password = useInput()

    const dispath = useDispatch()
    const admin = useSelector(state => state.app.user)

    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        dispath(loginAction(login.value, password.value))
        setSubmit(true)
    }
    
    useEffect(() => {
        if (!!admin)
            history.push('/manage')
        else if (!!login.value && submit)
            setError(true)
    }, [admin, login.value, submit])

    return (
        <div className="login_container">
            <h1 className="login_container__header">Войти в админ панель</h1>
            <form
                onSubmit={handleSubmit}
            >
                <div className="login_form__input input_container">
                    <TextField
                        classes={{
                            root: styles.input,
                        }}
                        error={error}
                        size="small"
                        label="Логин"
                        variant="outlined"
                        {...login.bind}
                    />
                </div>
                <div className="login_form__input input_container">
                    <TextField
                        classes={{
                            root: styles.input
                        }}
                        error={error}
                        size="small"
                        label="Пароль"
                        variant="outlined"
                        type="password"
                        {...password.bind}
                    />
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                >Войти</Button>
            </form>
        </div>
    )
}
