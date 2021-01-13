import { AppBar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { AllInbox, ContactMail, Dashboard, Group, ListAlt } from "@material-ui/icons"
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const PATHS = [
    {
        permission: "all", 
        path: "/",
        icon: <Dashboard />,
        title: "Главная"
    },
    {
        permission: "activities",
        path: "/activities",
        icon: <AllInbox />,
        title: "Активности"
    },
    {
        permission: "admins",
        path: "/admins",
        icon: <Group />,
        title: "Администраторы"
        
    },
    {
        permission: "posts",
        path: "/posts",
        icon: <ListAlt /> ,
        title: "Новости"
    },
    {
        permission: "reports",
        path: "/reports",
        icon: <ContactMail />,
        title: "Заяки \"народного контроля\""
    }
]

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export const Header = ({ title }) => {
    const classes = useStyles()
    // const user = useSelector(state => state.app.user);

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>{title}</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {PATHS.map(({ icon, path, title }, i) => (
                        <Link to={`/manage${path}`}>
                            <ListItem key={i} button>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </>
    )
}
// <Button {..props}>Hello</Button>
