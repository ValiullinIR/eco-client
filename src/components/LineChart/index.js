import React from 'react'
import { Area, AreaChart, Brush, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"


export const LineChartReport = ({ data }) => {
    return (
        <div>
            <LineChart
                width={600} height={400} data={data}
                margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="value" label="Date" />
                <YAxis domain={['auto', 'auto']} label="Stock Price" />
                <Tooltip
                    wrapperStyle={{
                        borderColor: 'white',
                        boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
                    }}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#666666' }}
                />
                <Line dataKey="value" stroke="#ff7300" dot={false} />
                <Brush dataKey="date" startIndex={data.length - 10}>
                    <AreaChart>
                        <CartesianGrid />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Area dataKey="price" stroke="#ff7300" fill="#ff7300" dot={false} />
                    </AreaChart>
                </Brush>
            </LineChart>
        </div>
    )
}
