import React from 'react'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'
import { RecPointForm } from '../../components/RecPoint/RecPointForm'
import { RecPoints } from '../../components/RecPoint/RecPoints'

export const RecPointsPage = () => {
    return (
        <>
            <Header title="Пункты приема" />
            <Main>
                <RecPointForm/>
                <RecPoints/>
            </Main>
        </>
    )
}
