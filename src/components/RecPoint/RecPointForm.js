import { Button, TableHead, TableRow, TextField, Table, TableBody, TableCell, InputAdornment, Icon, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Delete, Clear, Edit, Add, Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/useInput'
import slug from "slugify"

import "./RecPointForm.css"
import DataUriToBlob from "../../services/DataUriToBlob"
import { requestFilters, postRecPoint, setRecPoint, deleteRecPoint, requestPartners } from '../../store/actions'
import { TextFieldPhone } from '../TextFieldPhone'
import TextFieldPlace from '../TextFieldPlace'
import Map from '../Map'


const WEEK_DAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]


export const RecPointForm = () => {
    const dispatch = useDispatch()
    const current = useSelector((state) => state.recpoints.current)
    const __filters = useSelector(state => state.filters.filters)
    const partners = useSelector(state => state.partners.partners)

    const name = useInput("")
    const description = useInput("")
    const partner = useInput()
    const address = useInput("")
    const coords = useInput()
    const contacts = [
        { phone: useInput("(9  )    -    "), name: useInput("") },
        { phone: useInput("(9  )    -    "), name: useInput("") }
    ]
    const work_time = {
        "ПН": useInput(["", "", "", ""]),
        "ВТ": useInput(["", "", "", ""]),
        "СР": useInput(["", "", "", ""]),
        "ЧТ": useInput(["", "", "", ""]),
        "ПТ": useInput(["", "", "", ""]),
        "СБ": useInput(["", "", "", ""]),
        "ВС": useInput(["", "", "", ""]),
    }
    const filters = useInput([])

    const images = useInput([])
    // const image_paths = useInput([])
    // const filename = useInput("")
    const reception_type = useInput()
    const payback_type = useInput()

    const rec_types = {
        recycle: "Переработка",
        utilisation: "Утилизация",
        charity: "Благотворительность",
    }
    const payback_types = {
        free: "Бесплатный прием",
        paid: "Платный прием",
        partner: "Пункты приема",
    }

    const editable = Boolean(current)

    const set_work_time = (day, index, value) => {
        work_time[day].setValue(p => {
            console.log(p)
            let h = { ...p }
            h[index] = value
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
            fd.append("partner", partner.value ? partner.value._id["$oid"] : null)
            fd.append("coords", JSON.stringify(coords.value))
            fd.append("contacts", JSON.stringify(contacts.map(c => ({ phone: c.phone.value, name: c.name.value }))))
            fd.append("work_time", JSON.stringify(WEEK_DAYS.reduce((r, i) => {
                r[i] = work_time[i].value
                return r
            },{})))
            fd.append("accept_types", JSON.stringify(filters.value.map((e) => e._id['$oid'])))
            fd.append("reception_type", reception_type.value)
            fd.append("payback_type", payback_type.value)
            // if (!!images.length > 0)
            //     fd.append("image", DataUriToBlob(images.value), filename.value)
            for (let file of images.value) {
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
    const cleanup_fields = () => {
        name.cleanup()
        description.cleanup()
        address.cleanup()
        coords.cleanup()
        contacts[0].name.cleanup()
        contacts[1].name.cleanup()
        contacts[0].phone.cleanup()
        contacts[1].phone.cleanup()
        WEEK_DAYS.forEach(w => work_time[w].setValue(['','','','']))
        filters.setValue([])
        reception_type.cleanup()
        payback_type.cleanup()
    }

    const handleClear = () => {
        dispatch(setRecPoint())
        cleanup_fields()
    }
    const deleteAction = () => {
        dispatch(deleteRecPoint(current._id))
    }

    useEffect(() => {
        if (__filters.length === 0)
            dispatch(requestFilters())
    }, [__filters.length])
    useEffect(() => {
        if (partners.length === 0)
            dispatch(requestPartners())
    }, [partners])

    useEffect(() => {
        if (current) {
            name.setValue(current.name ? current.name : "")
            description.setValue(current.description ? current.description : "")
            address.setValue(current.address ? current.address : "")
            coords.setValue(current.coords ? current.coords : "")
            contacts[0].name.setValue(current.contacts[0].name ? current.contacts[0].name : {})
            contacts[1].name.setValue(current.contacts[1].name ? current.contacts[1].name : {})
            contacts[0].phone.setValue(current.contacts[0].phone ? current.contacts[0].phone : {})
            contacts[1].phone.setValue(current.contacts[1].phone ? current.contacts[1].phone : {})
            WEEK_DAYS.forEach(w => {
                if (current.work_time[w])
                    work_time[w].setValue(current.work_time[w])
            })
            filters.setValue(current.filters ? current.filters : "")
            reception_type.setValue(current.reception_type ? current.reception_type : "")
            payback_type.setValue(current.payback_type ? current.payback_type : "")
        } else
            cleanup_fields()
    }, [current])

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
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        onChange={(event, newValue) => {
                            partner.setValue(newValue);
                        }}
                        getOptionLabel={(option) => option.name}
                        options={partners}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Партнер"
                                margin="normal"
                                fullWidth
                                InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                    />
                </div>
                <div className="input_container">
                    <FormControl
                        fullWidth
                    >
                        <InputLabel id="reception-select-label">Тип переработки</InputLabel>
                        <Select
                            labelId="reception-select-label"
                            {...reception_type.bind}
                        >
                            {Object.keys(rec_types).map(key =>
                                <MenuItem key={key} value={key}>{rec_types[key]}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div className="input_container">
                    <FormControl
                        fullWidth
                    >
                        <InputLabel id="payback-select-label">Тип вознаграждения</InputLabel>
                        <Select
                            labelId="payback-select-label"
                            {...payback_type.bind}
                        >
                            {Object.keys(payback_types).map(key =>
                                <MenuItem key={key} value={key}>{payback_types[key]}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
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
                    <Map
                        coords={coords.value}
                        setCoords={coords.setValue}
                        setAddr={address.setValue} />
                </div>
                <div className="input_container">
                    {contacts.map((c, i) => {
                        return <div key={i}>
                            <TextField
                                fullWidth
                                label="Контактное лицо"
                                {...c.name.bind}
                            />
                            <TextFieldPhone
                                fullWidth
                                label="Контактный телефон"
                                startAdornment={<InputAdornment>+7</InputAdornment>}
                                {...c.phone.bind}
                            />
                        </div>
                    })}
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
                                    <TextField onChange={(e) => set_work_time(day, 0, e.target.value)} type="time" min="00:00" max="23:59"/>
                                    <br></br>
                                    <TextField onChange={(e) => set_work_time(day, 1, e.target.value)} type="time" min="00:00" max="23:59"/>
                                </TableCell>)}
                            </TableRow>
                            <TableRow>
                                {WEEK_DAYS.map((day, i) => <TableCell key={i} align="center">
                                    <TextField onChange={(e) => set_work_time(day, 2, e.target.value)} type="time" min="00:00" max="23:59"/>
                                    <br></br>
                                    <TextField onChange={(e) => set_work_time(day, 3, e.target.value)} type="time" min="00:00" max="23:59"/>
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
