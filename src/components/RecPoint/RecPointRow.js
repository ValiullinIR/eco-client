import { TableCell, TableRow} from "@material-ui/core"
import React from "react"

import "./RecPointRow.css"


export const RecPointRow = ({
    name,
    address,
    description,
    filters,
    ...rest
}) => {
    return (
        <TableRow className="CustomTableRow" {...rest}>
            <TableCell className="CustomTableCell" align="center">{name}</TableCell>
            <TableCell className="CustomTableCell" align="center">{address}</TableCell>
            <TableCell className="CustomTableCell" align="center">{description}</TableCell>
            <TableCell className="CustomTableCell" align="center">{filters?.map(filter => filter.name).join(" ")}</TableCell>
        </TableRow>
    )
}
