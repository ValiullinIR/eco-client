import { Typography } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { requestAdmins, setCurrentAdmin } from '../../store/actions'
import { Admin } from './Admin'

import "./Admins.css"

export const Admins = () => {
    const admins = useSelector(state => state.admins.admins)
    const dispatch = useDispatch()

    const update = useCallback(()=>{
        dispatch(requestAdmins())
    }, [])
    useEffect(() => {
        update()
    }, [])

    if (admins.length === 0)
        return <Typography variant="h6">Пока нет админов</Typography>
    return <div className="grid Cards">
        {admins.map((admin, i) => (<Admin key={i} {...admin} onClick={() => dispatch(setCurrentAdmin(admin))} />))}
    </div>
}
