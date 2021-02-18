import React from 'react'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'
import { UserForm } from '../../components/User/UserForm'
import { Users } from '../../components/User/Users'

export const UserPage = () => {
    return (
        <>
            <Header title="Пользователи"/>
            <Main>
                <UserForm/>
                <Users/>  
            </Main>
        </>
    )
}
