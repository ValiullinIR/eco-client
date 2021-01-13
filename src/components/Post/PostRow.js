import { Icon, TableCell, TableRow } from '@material-ui/core'
import { Close, Done } from '@material-ui/icons'
import React from 'react'

export const PostRow = ({ title, desc, date, isActive, ...rest }) => {
    return (
        <TableRow className="CustomTableRow" {...rest}>
            <TableCell className="CustomTableCell" align="center">{title}</TableCell>
            <TableCell className="CustomTableCell" align="center">
                <Icon>{isActive ? <Done/> : <Close/>}</Icon>
            </TableCell>
            <TableCell className="CustomTableCell" align="center">{desc}</TableCell>
            <TableCell className="CustomTableCell" align="center">{`${new Date(date).toLocaleTimeString()} ${new Date(date).toLocaleDateString()}`}</TableCell>
        </TableRow>
    )
}