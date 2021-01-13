import React, { useRef, useEffect, useState } from 'react'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, IconButton, TextField, Typography, Tooltip, Badge } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/useInput'
import { clearCurrentPost, createPost, deletePost, editPost } from '../../store/actions'
import { ImageEditor } from '../ImageEditor'
import DataUriToBlob from '../../services/DataUriToBlob'
import { Favorite, Visibility, Delete, Clear, Edit, Add } from '@material-ui/icons'

import "./PostForm.css"



export const PostForm = () => {
    const current = useSelector(state => state.posts.current)
    const dispatch = useDispatch()


    const title = useInput(current ? current.title : "")
    const desc = useInput(current ? current.desc : "")
    const image = useInput(current ? current.image : "")
    const isActive = useInput(current ? current.isActive : false)
    const [filename, setFilename] = useState("")
    const fileRef = useRef()

    const [imgEdit, setImgEdit] = useState(false)


    useEffect(() => {
        if (current) {
            title.setValue(current.title ?? "")
            desc.setValue(current.desc ?? "")
            image.setValue(current.image ?? "")
            isActive.setValue(current.isActive)
        } else
            cleanup()
    }, [current])

    const openImgEdit = () => setImgEdit(true)
    const closeImgEdit = () => setImgEdit(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        var fd = new FormData()
        fd.append("title", title.value)
        fd.append("desc", desc.value)
        fd.append("isActive", isActive.value)
        if (!!image.value && !!filename)
            fd.append("image", DataUriToBlob(image.value), filename)
        if (!current)
            dispatch(createPost(fd))
        else
            dispatch(editPost(current._id, fd))
    }
    const handleDelete = () => {
        dispatch(deletePost(current._id))
    }
    const handleClear = () => {
        dispatch(clearCurrentPost())
    }
    const cleanup = () => {
        console.log("Cleanup")
        title.setValue("")
        desc.setValue("")
        image.setValue("")
        isActive.setValue(false)
        setFilename("")
    }
    const readFile = e => {
        const file = e.target.files[0];
        const fr = new FileReader();
        setFilename(file.name)
        fr.onload = () => {
            image.setValue(fr.result);
            console.log(fr.result)
            openImgEdit();
        }
        fr.onabort = () => { }

        fr.onerror = () => {
            console.log("error")
        }
        fr.readAsDataURL(file)
    }
    return (
        <form className="post_form form" onSubmit={handleSubmit}>
            <div className="post_likes-views">
                <Tooltip title={"Просмотры"}>
                    <IconButton>
                        {!!current ?
                            <Badge badgeContent={current.views ? current.views : 0} color="primary">
                                <Visibility />
                            </Badge>
                            :
                            <Visibility />
                        }
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Лайки"}>
                    <IconButton>
                        {!!current ?
                            <Badge badgeContent={current.likes ? current.likes : 0} color="primary">
                                <Favorite />
                            </Badge>
                            :
                            <Favorite />
                        }
                    </IconButton>
                </Tooltip>
            </div>
            <h2 className="post_form__header">Создание поста</h2>
            <div className="input_container">
                <TextField
                    fullWidth
                    label="Заголовок"
                    {...title.bind}
                />
            </div>
            <div className="input_container">
                <div className="post_form__image_label" >Картинка</div>
                {image.value && <img className="post_form__image_img" src={image.value} />}
                {image.value && <div><u>{filename}</u></div>}
                <Button variant="outlined" onClick={() => fileRef.current.click()}>Загрузить</Button>
                <input hidden type="file" ref={fileRef} onChange={readFile} />
            </div>
            <div className="input_container">
                <Typography>
                    Видимоть
                    <Checkbox
                        value={isActive.value}
                        onChange={(e => isActive.setValue(e.target.checked))}
                    />
                </Typography>
            </div>
            <div className="input_container">
                <TextField
                    fullWidth
                    multiline
                    label="Описание"
                    {...desc.bind}
                />
            </div>
            <div className="form_action__group">
                {current && <div>
                    <Button
                        style={{ marginRight: '16px' }}
                        variant="contained"
                        color="primary"
                        onClick={handleDelete}
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
                    color="primary"
                    variant="contained"
                    type="submit"
                    startIcon={current ? <Edit /> : <Add />}
                >{current ? "Изменить" : "Создать"}</Button>
            </div>
            <Dialog
                open={imgEdit}
                onClose={closeImgEdit}
                fullWidth={true}
                maxWidth="md"
            >
                <DialogContent>
                    <ImageEditor file={image.value} setResult={image.setValue} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={closeImgEdit}
                    >Сохранить</Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}
