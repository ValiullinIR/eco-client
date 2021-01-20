import { Table, TableHead, Typography, TableBody, TableRow, TableCell, withStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterRow } from './FilterRow'
import { requestFilters } from '../../store/actions'
import { StyledTableCell } from '../StyledComponents/StyledTableCell'


export const Filters = () => {

    const dispatch = useDispatch()
    const filters = useSelector(state => state.filters.filters)

    useEffect(() => {
        dispatch(requestFilters())
    }, [])

    useEffect(() => {
        console.log(filters)
    }, [filters])

    if (!filters || filters.length === 0)
        return <Typography variant="h6">Пока нет фильтров</Typography>
    return <Table>
        <TableHead>
            <TableRow>
                <StyledTableCell align="center" >Название</StyledTableCell>
                <StyledTableCell align="center" >Название переменной</StyledTableCell>
                <StyledTableCell align="center" >Ключевые слова</StyledTableCell>
                <StyledTableCell align="center" >Исключенные слова</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {filters.map((filter, i) => <FilterRow
                key={i}
                {...filter}
                // onClick={() => dispatch(setCurrentActivity(filter))}
            />)}
        </TableBody>
    </Table>
}