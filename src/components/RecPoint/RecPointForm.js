import { Button, TableHead, TableRow, TextField, Table, TableBody, TableCell, InputAdornment } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Delete, Clear, Edit, Add } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/useInput'
import slug from "slugify"

import "./RecPointForm.css"
import DataUriToBlob from "../../services/DataUriToBlob"
import { requestFilters, postRecPoint } from '../../store/actions'
import { TextFieldPhone } from '../TextFieldPhone'


const WEEK_DAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]


export const RecPointForm = () => {
    const dispatch = useDispatch()
    // const filter = useSelector((state) => state.filters.current)
    const __filters = useSelector(state => state.filters.filters)

    const name = useInput("")
    const description = useInput("")
    const address = useInput("")
    const contacts = useInput("(9  )    -    ")
    const work_time = useInput({
        "ПН": ["", "", "", ""],
        "ВТ": ["", "", "", ""],
        "СР": ["", "", "", ""],
        "ЧТ": ["", "", "", ""],
        "ПТ": ["", "", "", ""],
        "СБ": ["", "", "", ""],
        "ВС": ["", "", "", ""],
    })
    const filters = useInput([])
    
    const image = useInput()
    const filename = useInput("")

    const editable = false

    const set_work_time = (day, index, value) => {
        work_time.setValue(p => {
            let h = {...p}
            h[day][index] = value
            return h
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO edit like PostForm
        if (editable) {
            // dispatch(updateActivity(_activity._id, new_activity))
        } else {
            var fd = new FormData()
            fd.append("name", name.value)
            fd.append("description", description.value)
            fd.append("address", address.value)
            fd.append("contacts", '+7'+contacts.value)
            fd.append("work_time", JSON.stringify(work_time.value))
            fd.append("accept_types", JSON.stringify(filters.value.map((e)=> e._id['$oid'])))
            if (!!image.value)
                fd.append("image", DataUriToBlob(image.value), filename.value)
            dispatch(postRecPoint(fd))
        }
    }



    const handleClear = () => {
        // dispatch(clearCurrentActivity())
    }
    const deleteAction = () => {
        // dispatch(deleteActivity(_activity._id))
    }

    useEffect(() => {
        dispatch(requestFilters())
    }, [])

    return (
        <>
            <div
                className="form"
                onSubmit={handleSubmit}
            >
                <h2>Создание пункта приема</h2>
                <div className="input_container">
                    <TextField
                        fullWidth
                        label="Название"
                        {...name.bind}
                    />
                </div>
                <div className="input_container">
                    <TextField
                        fullWidth
                        label="Описание"
                        {...description.bind}
                    />
                </div>
                <div className="input_container">
                    <TextField
                        fullWidth
                        label="Адрес"
                        {...address.bind}
                    />
                </div>
                <div className="input_container">
                    <TextFieldPhone
                        fullWidth
                        label="Контактный телефон"
                        startAdornment={<InputAdornment>+7</InputAdornment>}
                        {...contacts.bind}
                    />
                </div>
                <div className="input_container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ПН</TableCell>
                                <TableCell align="center">ВТ</TableCell>
                                <TableCell align="center">СР</TableCell>
                                <TableCell align="center">ЧТ</TableCell>
                                <TableCell align="center">ПТ</TableCell>
                                <TableCell align="center">СБ</TableCell>
                                <TableCell align="center">ВС</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {WEEK_DAYS.map((day, i) =><TableCell key={i} align="center">
                                    <TextField onChange={(e) => set_work_time(day, 0, e.target.value)} type="time"/>
                                    <TextField onChange={(e) => set_work_time(day, 1, e.target.value)} type="time"/>
                                </TableCell>)}
                            </TableRow>
                            <TableRow>
                                {WEEK_DAYS.map((day, i) =><TableCell key={i} align="center">
                                    <TextField onChange={(e) => set_work_time(day, 2, e.target.value)} type="time"/>
                                    <TextField onChange={(e) => set_work_time(day, 3, e.target.value)} type="time"/>
                                </TableCell>)}
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="input_container">
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={__filters}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        onChange={(e, value) => {
                            console.log(value)
                            filters.setValue(value)
                        }}
                        renderInput={(params) => {
                            return(
                            <TextField
                                {...params}
                                label="Принимаемые типы"
                            />
                        )}}
                    />
                </div>
                <div className="form_action__group">
                    {
                        editable && <div>
                            <Button
                                style={{ marginRight: '16px' }}
                                variant="contained"
                                color="primary"
                                onClick={deleteAction}
                                startIcon={<Delete />}
                            >Удалить</Button>
                            <Button
                                style={{ marginRight: '16px' }}
                                variant="contained"
                                color="primary"
                                onClick={handleClear}
                                startIcon={<Clear />}
                            >Очистить</Button>
                        </div>
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                        startIcon={editable ? <Edit /> : <Add />}
                    >{editable ? "Изменить" : "Создать"}</Button>
                </div>
            </div>
        </>
    )
}
