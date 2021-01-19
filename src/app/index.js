import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect, useHistory } from "react-router"
import { FilterPage } from '../pages/FiltersPage'
import { IndexPage } from '../pages/IndexPage'
import { MapPage } from '../pages/MapPage'
import { RecPointsPage } from '../pages/RecPointsPage'

export const App = () => {
    // const history = useHistory()
    // const dispatch = useDispatch()
    // const login_state = useSelector(state => state.app.login_state)
    // // const alert_state = useSelector(state => state.app.alert)

    // useEffect(() => {
    //     dispatch(authmeAction())
    // }, [])
    // // const handleCloseAlert = () => {
    // //     dispatch(hideAlert())
    // // }
    // useEffect(() => {
    //     if (login_state === "not authed")
    //         history.push('/login')
    // }, [login_state])

    return (
        <Switch>

            <Route exact path="/" component={() => <IndexPage />} />
            <Route path="/test_map" component={() => <MapPage />} />
            <Route path="/filters" component={() => <FilterPage />} />
            <Route path="/rec_points" component={() => <RecPointsPage />} />
            
        </Switch>
    )
    {/* <Switch>
        {login_state !== "init" &&
            <>
                <Route exact path="/" component={() => <Redirect to="/login" />} />
                <Route path="/login" component={() => <LoginPage />} />
                <ProtectedRoute path="/manage" component={() => <AdminPage />} />
            </>
        }
    </Switch>
    <Snackbar
        open={alert_state.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
    >
        <Alert onClose={handleCloseAlert} severity={alert_state.type}>{alert_state.message}</Alert>
    </Snackbar> */}
}
