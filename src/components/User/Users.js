import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyledTableCell } from "../StyledComponents/StyledTableCell"
import { User } from "./User"
import { requestUsers, setUser } from "../../store/actions"

export const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)

    useEffect(()=>{
        dispatch(requestUsers())
    },[])
    // if (users.length === 0)
    //     return <Typography variant="h5">Пока нет пользователей</Typography>
    return <Table>
        <TableHead>
            <TableRow>
                <StyledTableCell align="center">Имя</StyledTableCell>
                <StyledTableCell align="center">Логин</StyledTableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2} align="left">
                    <Typography variant="body2">{users.length} - кол-во пользователей</Typography>
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {users.map((user, i) => <User key={i} {...user} onClick={()=>dispatch(setUser(user))}/>)}
        </TableBody>
    </Table>
}