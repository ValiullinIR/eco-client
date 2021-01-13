import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

const PermVal = (req_permissions, admin) => {
    req_permissions.forEach((e) => {
        console.log(e, admin.permissions[e])
    })
    if (!admin)
        return false
    return req_permissions.reduce((r, i) => admin.permissions[i] ? r && admin.permissions[i] : admin.permissions[i], true)
}

// permissions = ["admins","reports","activities","posts"]

export const ProtectedRoute = ({ path, component: Component, permission = [] }) => {
    const admin = useSelector(state => state.app.user)

    const validation = PermVal(permission, admin)

    useEffect(() => {
        console.log("validation", permission, validation)
    }, [])

    return (
        <Route
            path={path}
            render={(props) => {
                if (!admin)
                    return <Redirect to="/login" />
                else
                    if (validation)
                        return <Component {...props} />
                    else
                        return <Redirect to="/manage" />
            }}
        />
    )
}
