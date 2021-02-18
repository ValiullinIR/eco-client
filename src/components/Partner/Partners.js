import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Partner } from "./Partner"
import { deletePartner, requestPartners, setPartner } from '../../store/actions'
import { StyledTableCell } from '../StyledComponents/StyledTableCell'

export const Partners = () => {

    const dispatch = useDispatch()
    const partners = useSelector(state => state.partners.partners)

    useEffect(()=>{
        dispatch(requestPartners())
    },[])

    useEffect(() => {
        console.log("partners", partners)
    }, [partners])

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Название</StyledTableCell>
                    <StyledTableCell align="center">Количество пунктов</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {partners.map((partner, i) => <Partner key={i} {...partner} onClick={()=>dispatch(setPartner(partner))} onDelete={()=>dispatch(deletePartner(partner._id))} />)}
            </TableBody>
        </Table>
    )
}
