import { Table, TableHead, Typography, TableBody, TableRow } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestRecPoints } from '../../store/actions'
// import { requestActivities, setCurrentActivity } from '../../store/actions'
import { StyledTableCell } from '../StyledComponents/StyledTableCell'
import { RecPointRow } from './RecPointRow'


export const RecPoints = ({ view = "grid" }) => {

    const dispatch = useDispatch()
    const recpoints = useSelector(state => state.recpoints.recpoints)

    useEffect(() => {
        dispatch(requestRecPoints())
    }, [])

    useEffect(() => {
        console.log(recpoints)
    }, [recpoints])

    if (!recpoints || recpoints.length === 0)
        return <Typography variant="h6">Пока нет пунктов приема</Typography>
    return <Table>
        <TableHead>
            <TableRow>
                <StyledTableCell align="center">Название</StyledTableCell>
                <StyledTableCell align="center">Адрес</StyledTableCell>
                <StyledTableCell align="center">Описание</StyledTableCell>
                <StyledTableCell align="center">Фильтры</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {recpoints.map((recpoint, i) => <RecPointRow
                key={i}
                {...recpoint}
                // onClick={() => dispatch(setCurrentActivity(filter))}
            />)}
        </TableBody>
    </Table>
}