import React from 'react'
import { Card, CardContent, CardHeader, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core"
import "./Admin.css"

const PERMISSIONS = {
    "activities": "Активности",
    "posts": "Посты",
    "admins": "Админы",
    "reports": "Отчеты",
}

export const Admin = ({ name, login, permissions, ...rest }) => {
    return (
        <Card className="Card" {...rest}>
            <CardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography>{`Логин: ${login}`}</Typography>
                <Divider />
                <Typography>Уровни доступа</Typography>
                <List>
                    {Object.keys(permissions).map(key => (
                        <ListItem key={key}>
                            <ListItemText primary={PERMISSIONS[key]} />
                            <ListItemIcon>
                                <Checkbox checked={permissions[key]} />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
}
