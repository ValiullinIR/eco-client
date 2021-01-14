import React, { useState } from 'react'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'
import Map from "../../components/Map"

export const MapPage = () => {
    const [latLng, setLatLng] = useState() 
    return (
        <>
            <Header title="Map" />
            <Main>
                <h2>{`lat: ${latLng?.lat}, lng: ${latLng?.lng}`}</h2>
                <Map coords={latLng} setCoords={setLatLng}/>
            </Main>
        </>
    )
}
