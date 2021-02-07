import React, { useEffect } from 'react'
import PropTypes from "prop-types"
import Element from './Element'
import { Table, TableBody } from '@material-ui/core'


const Elements = ({ onRead, data, fields }) => {
    useEffect(() => {
        onRead()
    }, [])

    if (data.length === 0)
        return <h6>Not data</h6>
    return <Table>
        <TableBody>
            {data.map((e, i) => (
                <Element key={i} data={e} fields={fields} />
            ))}
        </TableBody>
    </Table>
}

Elements.propTypes = {
    onRead: PropTypes.func,
    data: PropTypes.arrayOf(
        PropTypes.object
    ),
    fields: PropTypes.array,
}

export default Elements