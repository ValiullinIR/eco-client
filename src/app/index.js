import React from 'react'
import { Switch, Route } from "react-router"
import { FilterPage } from '../pages/FiltersPage'
import { IndexPage } from '../pages/IndexPage'
import { MapPage } from '../pages/MapPage'
import { RecPointsPage } from '../pages/RecPointsPage'

export const App = () => {
    
    return (
        <Switch>

            <Route exact path="/" component={() => <IndexPage />} />
            <Route path="/test_map" component={() => <MapPage />} />
            <Route path="/filters" component={() => <FilterPage />} />
            <Route path="/rec_points" component={() => <RecPointsPage />} />
            
        </Switch>
    )
}
