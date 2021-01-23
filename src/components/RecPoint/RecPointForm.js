import { Button, TableHead, TableRow, TextField, Table, TableBody, TableCell, InputAdornment, Icon } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Delete, Clear, Edit, Add, Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/useInput'
import slug from "slugify"

import "./RecPointForm.css"
import DataUriToBlob from "../../services/DataUriToBlob"
import { requestFilters, postRecPoint } from '../../store/actions'
import { TextFieldPhone } from '../TextFieldPhone'
import TextFieldPlace from '../TextFieldPlace'


const WEEK_DAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]


export const RecPointForm = () => {
    const dispatch = useDispatch()
    // const filter = useSelector((state) => state.filters.current)
    const __filters = useSelector(state => state.filters.filters)

    const name = useInput("")
    const description = useInput("")
    const address = useInput("")
    const coords = useInput()
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

    const images = useInput([])
    const image_paths = useInput([])
    const filename = useInput("")

    const editable = false

    const set_work_time = (day, index, value) => {
        work_time.setValue(p => {
            let h = { ...p }
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
            fd.append("coords", JSON.stringify(coords.value))
            fd.append("contacts", '+7' + contacts.value)
            fd.append("work_time", JSON.stringify(work_time.value))
            fd.append("accept_types", JSON.stringify(filters.value.map((e) => e._id['$oid'])))
            // if (!!images.length > 0)
            //     fd.append("image", DataUriToBlob(images.value), filename.value)
            for(let file of images.value){
                fd.append("images", file)
            }
            dispatch(postRecPoint(fd))
        }
    }

    const appendToImages = (image) => {
        images.setValue(p => p.concat(image))
    }
    const appendToImagePaths = (image) => {
        images.setValue(p => p.concat(image))
    }
    const removeFromImages = (index) => {
        images.setValue(p => {
            var h = [...p]
            h.splice(index, 1)
            return (h);
        })
    }
    const removeFromImagePaths = (index) => {
        images.setValue(p => {
            var h = [...p]
            h.splice(index, 1)
            return (h);
        })
    }


    const readfile = (file) => {
        if (file.type === "application/pdf" || file.type === "image/jpeg" || file.type === "image/png") {
            var fr = new FileReader();

            fr.onload = () => {
                appendToImagePaths(file);
            }
            fr.onabort = () => console.log('aborted')
            fr.onerror = () => console.log("error")
            fr.readAsDataURL(file)
        }
    }

    const handleClear = () => {
        // dispatch(clearCurrentActivity())
    }
    const deleteAction = () => {
        // dispatch(deleteActivity(_activity._id))
    }

    useEffect(() => {
        if (__filters.length === 0)
            dispatch(requestFilters())
    }, [__filters.length])

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
                        label="Партнер"
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
                    <input
                        type="file"
                        multiple={true}
                        onChange={e => {
                            let files = e.target.files
                            console.log(files)
                            for (let file of files) {
                                console.log(file)
                                appendToImages(file);
                            }
                        }}
                    />
                    {images.value.length}
                    <div className="confirm_company_filenames">
                        {images.value.map((f, index) => {   
                            return <span
                                key={index}
                                id="confirm_company_filename"
                                onClick={() => removeFromImages(index)}
                            >{f.name}<Icon><Close /></Icon></span>
                        })}
                    </div>
                </div>
                <div className="input_container">
                    <TextFieldPlace
                        fullWidth
                        setAddr={address.setValue}
                        setCoords={coords.setValue}
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
                                {WEEK_DAYS.map((day, i) => <TableCell key={i} align="center">
                                    <TextField onChange={(e) => set_work_time(day, 0, e.target.value)} type="time" />
                                    <TextField onChange={(e) => set_work_time(day, 1, e.target.value)} type="time" />
                                </TableCell>)}
                            </TableRow>
                            <TableRow>
                                {WEEK_DAYS.map((day, i) => <TableCell key={i} align="center">
                                    <TextField onChange={(e) => set_work_time(day, 2, e.target.value)} type="time" />
                                    <TextField onChange={(e) => set_work_time(day, 3, e.target.value)} type="time" />
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
                            return (
                                <TextField
                                    {...params}
                                    label="Принимаемые типы"
                                />
                            )
                        }}
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
