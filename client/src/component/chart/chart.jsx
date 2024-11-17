import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AccessLog } from '../accesslog/AccessLogForm';
import { FilterChart } from './fileterChart';
import { useDispatch, useSelector } from 'react-redux';
import { chartSelector, getEnergyData } from '../../redux/reducer/chartReducer';
import { useEffect, useState } from 'react';

export const ShowChart = () => {
    const dispatch = useDispatch();
    const {getData,filterData,energyData} = useSelector(chartSelector)
    const [dateRange, setDateRange] = useState({startDate: "", endDate:""});



    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            dispatch(getEnergyData({startDate: dateRange.startDate, endDate: dateRange.endDate}))

        }
    },[dispatch, dateRange.startDate, dateRange.endDate])
    const formatXAxis = (tickItem) => {
        if (!tickItem) return '';
        return new Date(tickItem).toLocaleDateString();
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ 
                    backgroundColor: 'white', 
                    padding: '10px',
                    border: '1px solid #ccc' 
                }}>
                    <p>{`Date: ${new Date(label).toLocaleDateString()}`}</p>
                    <p>{`Total KWH: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    const handleDateChange = (newDateRange) => {
        setDateRange(newDateRange);
        if (newDateRange.startDate && newDateRange.endDate) {
            dispatch(getEnergyData(newDateRange));
        }
    };

    return (
        <>
            <AccessLog />
            <FilterChart dateRange={dateRange} onDateChange={handleDateChange}/>
            <LineChart width={800} height={400} data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt"
                tickFormatter={formatXAxis} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="total_kwh" stroke="#8884d8"
                activeDot={{ r: 8 }} />
            </LineChart>
        </>
    )
}