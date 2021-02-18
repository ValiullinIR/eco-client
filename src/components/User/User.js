import { TableCell, TableRow } from "@material-ui/core"

export const User = ({
    name,
    username,
    confirmed,
    ...rest
}) => {
    return (
        <TableRow className="CustomTableRow" {...rest}>
            <TableCell className="CustomTableCell" align="center">
                {name}
            </TableCell>
            <TableCell className="CustomTableCell" align="center">
                {username}
            </TableCell>
        </TableRow>
    )
}