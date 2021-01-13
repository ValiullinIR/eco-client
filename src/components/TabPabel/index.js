import React from 'react'

export const TabPanel = ({ index, page, children = null }) => {
    if(index !== page)
        return null
    return {children}
}
