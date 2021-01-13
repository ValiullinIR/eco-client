import { Button, TextField, Table, TableBody, TableHead, TableRow, TableCell, IconButton } from '@material-ui/core'
import { Delete, Clear, Edit, Add } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/useInput'
import slug from "slugify"

import "./ActivityForm.css"



export const FilterForm = () => {
    const dispatch = useDispatch()
    // const filter = useSelector((state) => state.filters.current)

    const name = useInput("")
    const var_name = useInput("")
    const key_word = useInput("")
    const key_words = useInput([])

    const editable = false

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO edit like PostForm
        if (editable) {
            // dispatch(updateActivity(_activity._id, new_activity))
        } else {
            // var fd = new FormData()
            // fd.append("activity", JSON.stringify(new_activity))
            // if (!!image.value)
            //     fd.append("image", DataUriToBlob(image.value), filename)
            // dispatch(createActivity(fd))
        }
    }



    const removeFromKeyWords = (index) => () => {
        let h = [...key_words.value]
        h.splice(index, 1)
        key_words.setValue(h)
    }
    const appendToKeyWords = () => {
        key_words.setValue(p => p.concat(key_word.value))
    }
    const handleClear = () => {
        // dispatch(clearCurrentActivity())
    }
    const deleteAction = () => {
        // dispatch(deleteActivity(_activity._id))
    }

    useEffect(() => {
        if (!editable)
            var_name.setValue(slug(name.value, { lower: true }))
    }, [name.value, editable])

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
                    >{editable ? "Изменить" : "Создать"}</Button>
                </div>
            </div>
        </>
    )
}
