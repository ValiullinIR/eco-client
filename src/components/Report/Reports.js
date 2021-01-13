import { MenuItem, Select, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { requestReports } from '../../store/actions'

import { Report } from './Report'


export const Reports = () => {

    const dispatch = useDispatch()
    const reports = useSelector(state => state.reports.reports)

    const [sortType, setSortType] = useState("default")

    const filterFunction = (id) => {
        switch (id) {
            case "old":
                return (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
            case "new":
                return (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
            default:
                return (_a, _b) => 0
        }
    }
    const update = useCallback(()=>{
        dispatch(requestReports())
    },[])
    useEffect(() => {
        update()
    }, [])

    if (reports.length === 0)
        return <Typography>Еще нет заявок</Typography>
    return (
        <>
            <div>
                <Typography variant="body2">Фильтер</Typography>
                <Select
                    variant="outlined"
                    onChange={e => setSortType(e.target.value)}
                    value={sortType}
                >
                    <MenuItem value="default">Дефолт</MenuItem>
                    <MenuItem value="new">Сначала новые</MenuItem>
                    <MenuItem value="old">Сначала старые</MenuItem>
                </Select>
            </div>
            <div className="grid Cards">
                {reports.sort(filterFunction(sortType)).map(report => (<Report key={report._id} {...report} />))}
            </div>
        </>
    )
}
