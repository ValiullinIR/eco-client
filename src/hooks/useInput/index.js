import { useState } from 'react'

export const useInput = (initalvalue = "") => {
    const [value, setValue] = useState(initalvalue);

    const onChange = (event) => setValue(event.target.value)
    const cleanup = () => setValue("");

    return {
        bind: {
            value,
            onChange
        },
        value,
        setValue,
        cleanup
    }
}