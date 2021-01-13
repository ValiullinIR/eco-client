import React from 'react'
import { FilterForm } from '../../components/Filter/FilterForm'
import { Filters } from '../../components/Filter/Filters'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'

export const FilterPage = () => {
    return (
        <>
            <Header title="Фильтры" />
            <Main>
                <FilterForm/>
                <Filters />
            </Main>
        </>
    )
}
