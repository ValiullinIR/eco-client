import React from 'react'
import PropTypes from "prop-types"
import { TableCell, TableRow } from '@material-ui/core'

const Element = ({ data, fields }) => {
    return (
        <TableRow className="CustomTableRow">
            {fields.map(field => {    
                return <TableCell
                    key={field}
                    className="CustomTableCell"
                >
                    {data[field]}
                </TableCell>
            })}
        </TableRow>
    )
}

Element.propTypes = {
    data: PropTypes.object,
    fields: PropTypes.arrayOf(PropTypes.string),
}

export default Element;
