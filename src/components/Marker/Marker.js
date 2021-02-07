import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableRow } from '@material-ui/core'


const Marker = ({ filter_vname, description}) => {
    return (
        <TableRow className="CustomTableRow">
            <TableCell className="CustomTableCell" align="center">
                {filter_vname}
            </TableCell>
            <TableCell className="CustomTableCell" align="center">
                {description}
            </TableCell>
        </TableRow>
    )
}

Marker.propTypes = {
    filter_vname: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default Marker