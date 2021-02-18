import { Button, TextField, Table, TableBody, TableHead, TableRow, TableCell, IconButton, FormControl, InputLabel, Input } from '@material-ui/core'
import { Delete, Clear, Edit, Add } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/useInput'
import slug from "slugify"

import "./ActivityForm.css"
import { deleteFilter, postFilter, setFilter, updateFilter } from '../../store/actions'



export const FilterForm = () => {
    const dispatch = useDispatch()
    const current = useSelector((state) => state.filters.current)

    const name = useInput("")
    const var_name = useInput("")
    const key_word = useInput("")
    const bad_word = useInput("")
    const key_words = useInput([])
    const bad_words = useInput([])
    const image = useInput(null)

    const editable = Boolean(current)

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO edit like PostForm
        if (editable) {
            const data = {}
            if(current.name)
                data['name'] = name.value
            if(current.var_name)
                data['var_name'] = name.var_name
            if(current.key_words)
                data['key_words'] = name.key_words
            if(current.bad_words)
                data['bad_words'] = name.bad_words
            dispatch(updateFilter(current._id["$oid"], data))
        } else {
            var fd = new FormData()
            fd.append("name", name.value)
            fd.append("var_name", var_name.value)
            fd.append("key_words", JSON.stringify(key_words.value))
            fd.append("bad_words", JSON.stringify(bad_words.value))
            dispatch(postFilter(fd))
        }
    }



    const removeFromKeyWords = (index) => () => {
        let h = [...key_words.value]
        h.splice(index, 1)
        key_words.setValue(h)
    }
    const appendToKeyWords = () => {
        key_words.setValue(p => p.concat(key_word.value))
        key_word.cleanup()
    }
    const removeFromBadWords = (index) => () => {
        let h = [...bad_words.value]
        h.splice(index, 1)
        bad_words.setValue(h)
    }
    const appendToBadWords = () => {
        bad_words.setValue(p => p.concat(bad_word.value))
        bad_word.cleanup()
    }
    const handleClear = () => {
        dispatch(setFilter())
    }
    const deleteAction = () => {
        dispatch(deleteFilter(current._id["$oid"]))
    }

    useEffect(() => {
        if (!editable)
            var_name.setValue(slug(name.value, { lower: true }))
    }, [name.value, editable])

    useEffect(() => {
        if(current) {
            name.setValue(current.name)
            var_name.setValue(current.var_name)
            key_words.setValue(current.key_words)
            bad_words.setValue(current.key_words)
        }else{
            name.setValue("")
            var_name.setValue("")
            key_words.setValue([])
            bad_words.setValue([])
        }
    }, [current])

    return (
        <>
            <div
                className="activities_form form"
                onSubmit={handleSubmit}
            >
                <h2>Создание фильтра</h2>
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
                        label="Название переменной"
                        {...var_name.bind}
                    />
                </div>
                <div className="input_container">
                    <FormControl
                        fullWidth
                    >
                        <InputLabel htmlFor="filter-image-input">Картинка</InputLabel>
                        <Input
                            id="filter-image-input"
                            type="file"
                            {...image.bind}
                        />
                    </FormControl>
                </div>
                <div className="input_container">
                    {key_words.value.length > 0 && <Table>
                        <TableHead>
                            <TableCell>Ключевое слово</TableCell>
                            <TableCell>Удалить</TableCell>
                        </TableHead>
                        <TableBody>
                            {key_words.value.map((word, i) => {
                                return <TableRow key={i}>
                                    <TableCell>{word}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={removeFromKeyWords(i)}
                                        >
                                            <Clear/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            })}        
                        </TableBody>
                    </Table>}
                </div>
                <div className="input_container">
                    <TextField
                        fullWidth
                        label="Ключевое слово"
                        {...key_word.bind}
                        onKeyDown={e => e.key === "Enter" && appendToKeyWords()}
                    />
                </div>
                <div className="input_container">
                    {bad_words.value.length > 0 && <Table>
                        <TableHead>
                            <TableCell>Исключенное слово</TableCell>
                            <TableCell>Удалить</TableCell>
                        </TableHead>
                        <TableBody>
                            {bad_words.value.map((word, i) => {
                                return <TableRow key={i}>
                                    <TableCell>{word}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={removeFromBadWords(i)}
                                        >
                                            <Clear/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            })}        
                        </TableBody>
                    </Table>}
                </div>
                <div className="input_container">
                    <TextField
                        fullWidth
                        label="Исключенное слово"
                        {...bad_word.bind}
                        onKeyDown={e => e.key === "Enter" && appendToBadWords()}
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
                        startIcon={editable ? <Edit /> : <Add />}
                        onClick={handleSubmit}
                    >{editable ? "Изменить" : "Создать"}</Button>
                </div>
            </div>
        </>
    )
}
