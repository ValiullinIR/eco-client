import React, { useEffect } from 'react'
import { Delete, Clear, Edit, Add } from '@material-ui/icons'

import { useInput } from '../../hooks/useInput'
import { Button, Select, TextField, MenuItem, FormControl, InputLabel, ListSubheader } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { postMarker, requestFilters } from '../../store/actions'



export const MarkerForm = ({ fields }) => {


    const dispatch = useDispatch()
    const editable = false
    const __filters = useSelector(state => state.filters.list)

    const data = {
        filter_vname: useInput(),
        description: useInput()
    }

    const handleSubmit = () => {
        let fd = new FormData()
        fd.append("filter_vname", data.filter_vname.value)
        fd.append("description", data.description.value)
        dispatch(postMarker(fd))
    }


    useEffect(() => {
        if (__filters.length === 0)
            dispatch(requestFilters(true))
        console.log(__filters)
    }, [__filters.length])

    return (
        <div>
            <div className="input_container">
                <FormControl
                    fullWidth
                >
                    <InputLabel id="filter_vname-select-label">Название фильтра</InputLabel>
                    <Select
                        labelId="filter_vname-select-label"
                        {...data.filter_vname.bind}
                    >
                        {__filters.map(f => {
                            return [
                                <ListSubheader>{f._id}</ListSubheader>,
                                f.name.map(n => 
                                    <MenuItem key={f._id} value={f._id}>{n}</MenuItem>
                                )
                            ]
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className="input_container">
                <TextField
                    fullWidth
                    label="Описание"
                    {...data.description.bind}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={editable ? <Edit /> : <Add />}
                onClick={handleSubmit}
            >{editable ? "Изменить" : "Создать"}</Button>
        </div>
    )
}
