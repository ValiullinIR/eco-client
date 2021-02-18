import React from 'react'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'
import { Stats } from '../../components/Stats/Stats'

export const IndexPage = () => {
    return (
        <>
            <Header title="Главная" />
            <Main>
                <Stats />
            </Main>
        </>
    )
}
