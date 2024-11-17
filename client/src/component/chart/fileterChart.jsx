
export const FilterChart = ({ dateRange, onDateChange })=>{
    
    return(
        <>
        <div>
            <label>Start Date:-</label>
            <input type="date" value={dateRange.startDate} onChange={(e)=>onDateChange({...dateRange, startDate: e.target.value})}></input>
            <label>End Date:-</label>
            <input type="date" value={dateRange.endDate} onChange={(e)=>onDateChange({...dateRange, endDate: e.target.value})}></input>
        </div>
        </>
    )
}