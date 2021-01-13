import { TableCell, TableRow} from "@material-ui/core"
import React from "react"

import "./FilterRow.css"


export const FilterRow = ({
    name,
    var_name,
    key_words,
    ...rest
}) => {
    return (
        <TableRow className="CustomTableRow" {...rest}>
            <TableCell className="CustomTableCell" align="center">{name}</TableCell>
            <TableCell className="CustomTableCell" align="center">{var_name}</TableCell>
            <TableCell className="CustomTableCell" align="center">{key_words?.join(" ")}</TableCell>
        </TableRow>
    )
}
