import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Plot from "react-plotly.js"
import { requestStats } from '../../store/actions'

export const Stats = () => {
    const stats = useSelector(state => state.stats.stats)
    const models = useSelector(state => state.stats.models)

    const [current, setCurrent] = useState()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(requestStats())
    }, [])

    return (
        <div>
            <div>
                <Plot
                    onClick={(data) => {
                        console.log(data)
                    }}
                    data={[
                        {
                            x: stats.map(s => new Date(`${s._id.year} ${s._id.month} ${s._id.day}`).toLocaleDateString()),
                            y: stats.map(s => s.requests.length),
                            type: 'bar',
                            mode: 'stack',
                            marker: {color: 'red'},
                        },
                    ]}
                    layout={ {width: 800, height: 400, title: 'Количество запросов'} }
                />
            </div>
            <div>
            <Plot
                    onClick={(data) => {
                        console.log(data)
                    }}
                    data={[
                        {
                            x: Object.keys(models),
                            y: Object.keys(models).map(k => models[k]),
                            type: "bar",
                            mode: "lines+markers",
                            marker: { color: "lightblue" }
                        }
                    ]}
                    layout={ {width: 800, height: 400, title: 'Информация о моделях'} }
                />
            </div>
        </div>
    )
}
