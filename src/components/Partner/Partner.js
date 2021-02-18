import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { RecPointRow } from '../RecPoint/RecPointRow'
import { StyledTableCell } from '../StyledComponents/StyledTableCell'

export const Partner = ({
    name,
    points,
    onDelete,
    onClick
}) => {
    const [open, setOpen] = useState(false)
    useEffect(()=>{
        console.log(name, points)
    },[])
    return (
        <>
            <TableRow className="CustomTableRow" onDoubleClick={onClick}>
                <TableCell 
                    className="CustomTableCell" 
                    align="center"
                    onClick={()=>setOpen(p=>!p)}
                >
                    {name}
                </TableCell>
                <TableCell 
                    className="CustomTableCell" 
                    align="center"
                >
                    {points.length}
                </TableCell>
                <TableCell 
                    className="CustomTableCell" 
                    align="center"
                >
                    <IconButton onClick={onDelete}>
                        <Delete />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow className="CustomTableRow">
                <Collapse
                    in={open}
                >
                    <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                            Пункты приемов
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Название</StyledTableCell>
                                    <StyledTableCell align="center">Адрес</StyledTableCell>
                                    <StyledTableCell align="center">Описание</StyledTableCell>
                                    <StyledTableCell align="center">Фильтры</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {points.map((point, i) => <RecPointRow key={i} {...point} />)}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableRow>
        </>
    )
}
