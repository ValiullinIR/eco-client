import React from 'react'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'
import { MarkerForm } from '../../components/Marker/MarkerForm'
import { Markers } from '../../components/Marker/Markers'

export const MarkersPage = () => {
    return (
        <>
            <Header title="Маркеры" />
            <Main>
                <MarkerForm
                    fields={{
                        "filter_vname": "Фильтр", 
                        "description": "Описание"
                    }}
                />
                <Markers />
            </Main>
        </>
    )
}
