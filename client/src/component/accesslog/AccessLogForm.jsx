import { useState } from "react"
import "./AccessLogForm.css"
import { useDispatch } from "react-redux"
import { postAccessLogData } from "../../redux/reducer/chartReducer";

export const AccessLog = ()=>{
    const dispatch = useDispatch();
    const [logs, setLogs] = useState({accessTime:"", accessDate:"", employeeName:"", algo_status: null})

    const handleSubmit = async ()=>{
        const logData = {...logs, algo_status: logs.algo_status === ""?"":Number(logs.algo_status)}
        const result = await dispatch(postAccessLogData(logData));
        if(postAccessLogData.fulfilled.match(result)){
            setLogs({accessDate:"", accessTime:"", employeeName:"", algo_status:null})
        }else{
            console.log(result.payload)
        }
    }
    return(
        <>
        <div className="accesslog-container">
            <div>
            <label>Time:- </label>
            <input type="time"
            value={logs.accessTime}
            onChange={(e)=>setLogs({...logs, accessTime: e.target.value})}
             />
            </div>
            <div>
            <label>Date:- </label>
            <input type="date"
            value={logs.accessDate}
            onChange={(e)=>setLogs({...logs, accessDate: e.target.value})}
            />
            </div>
            <div>
            <label>Name:- </label>
            <input type="text" placeholder="Enter Name..."
            value={logs.employeeName}
            onChange={(e)=>setLogs({...logs, employeeName: e.target.value})}
            />
            </div>
            <div>
            <label>logStatus:-</label>
            <select value={logs.algo_status} onChange={(e)=>setLogs({...logs, algo_status: e.target.value})}>
                <option value="">Select Status</option>
                <option value="0">OFF</option>
                <option value="1">ON</option>
            </select>
            </div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        </>
    )
}