import React from 'react'
import PropTypes from "prop-types"
import Elements from './Elements'


const Component = ({ fields, actions, data, modf }) => {
    
    const sorter = (data) => {
        let sorted = data.sort((a, b) => a._id - b._id)

        if (modf)
            sorted = sorted.map(e => {
                modf.forEach(m => e[m.field] = e.op(e))
                return e
            })
        return sorted
    }


    return (
        <div>
            <Elements fields={fields} onRead={actions.onRead} data={sorter(data)} />
        </div>
    )
}

Component.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.array.isRequired,
    actions: PropTypes.exact({
        onCreate: PropTypes.func,
        onRead: PropTypes.func,
        onUpdate: PropTypes.func,
        onDelete: PropTypes.func,
    }),
    modf: PropTypes.arrayOf(PropTypes.object)
}

export default Component