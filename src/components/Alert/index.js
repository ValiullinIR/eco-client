import React from 'react';
import { IconButton, Collapse } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@material-ui/lab/Alert';
import { hideAlert } from '../../store/actions';




export default function TransitionAlerts() {
    const alert = useSelector(state => state.app.alert)
    const dispatch = useDispatch()

    const open = React.useState(alert.open);

    const handleClose = () => {
        dispatch(hideAlert())
    }

    return (
        <Collapse in={open}>
            <Alert
                severity={alert.type}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {alert.message}
            </Alert>
        </Collapse>
    );
}