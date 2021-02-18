import React from 'react'
import { Header } from "../../components/Header"
import { Main } from "../../components/Main"
import { PartnerForm } from '../../components/Partner/PartnerForm'
import { Partners } from '../../components/Partner/Partners'

export const PartnersPage = () => {
    return (
        <>
            <Header title="Партнеры" />
            <Main>
                <PartnerForm />
                <Partners />
            </Main>
        </>
    )
}
