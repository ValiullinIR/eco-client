import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Marker from './Marker'
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableHead, TableRow, TableBody, Typography } from '@material-ui/core'
import { StyledTableCell } from '../StyledComponents/StyledTableCell'
import { requestMarkers } from '../../store/actions'

export const Markers = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.markers.markers)

    useEffect(() => {
        // get all markers
        dispatch(requestMarkers())
    }, [])
    useEffect(() => {
        // get all markers
        console.log("DATA", data)
    }, [data])
    
    if (data.length === 0)
        return <Typography variant="h6">Нет данных</Typography>
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Фильтр</StyledTableCell>
                    <StyledTableCell align="center">Описание маркировки</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((el, i) => <Marker
                    key={i}
                    {...el}
                />)}
            </TableBody>
        </Table>
    )
}
