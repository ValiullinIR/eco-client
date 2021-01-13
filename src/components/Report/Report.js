import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography, Select, MenuItem, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { deleteReport, updateReport } from '../../store/actions'

import "./Report.css"


export const Report = ({ _id, user_id, message, created: _created, image, status: _status }) => {
    const date = new Date().getTime()
    const created = new Date(_created).getTime()

    const dispatch = useDispatch()

    const [status, setStatus] = useState(_status)

    const dayDiff = Math.round((date - created) / (1000 * 60 * 60 * 24))
    return (
        <Card
            style={{ backgroundColor: `hsla(${128 - 8 * (dayDiff > 16 ? 16 : dayDiff - 1)}, 100%, 85%, 0.3)` }}
        >
            <CardHeader
                title={user_id?.name}
                subheader={new Date(created).toLocaleDateString()}
            />
            <CardMedia
                style={{
                    height: 0,
                    paddingTop: '56.25%', // 16:9
                }}
                image={image}
            />
            <CardContent>
                <Typography>{message}</Typography>
            </CardContent>
            <CardActions
                className="CardActions"
            >
                <Select
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value)
                        dispatch(updateReport(_id, { status: e.target.value }))
                    }}
                >
                    <MenuItem value="created">Создан</MenuItem>
                    <MenuItem value="pending">Выполняется</MenuItem>
                    <MenuItem value="closed">Закрыт</MenuItem>
                </Select>
                <Button
                    style={{ marginLeft: "auto" }}
                    variant="text"
                    color="primary"
                    onClick={() => dispatch(deleteReport(_id))}
                >
                    Удалить
                </Button>
            </CardActions>
        </Card>
    )
}
