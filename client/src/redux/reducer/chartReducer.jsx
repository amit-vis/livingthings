import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const postAccessLogData = createAsyncThunk("accesslog/post", async (logData, {rejectWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const {accessTime, accessDate, employeeName, algo_status} = logData;
        const response = await axios.post("http://localhost:8000/accessLog/create-log",
            {accessTime, accessDate, employeeName, algo_status},{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectWithValue(errorData)
        }
    } catch (error) {
        console.log(error)
        if(error.response && error.response.data){
            return rejectWithValue(error.response.data)
        }else{
            return rejectWithValue(error.message)
        }
    }
})

export const getAccessLogData = createAsyncThunk("get/accesslog", async (_, {rejectWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/accessLog/get-log",{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return errorData
        }
    } catch (error) {
        console.log(error)
        if(error.response && error.response.data){
            return rejectWithValue(error.response.data)
        }else{
            return rejectWithValue(error.message)
        }
    }
})

export const getEnergyData = createAsyncThunk("get/energy", async ({ startDate, endDate } = {}, {rejectWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        let url = "http://localhost:8000/energy/chart-data";
        if (startDate && endDate) {
            url += `?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
        }
        const response = await axios.get(url,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return errorData
        }
    } catch (error) {
        console.log(error)
        if(error.response && error.response.data){
            return rejectWithValue(error.response.data)
        }else{
            return rejectWithValue(error.message)
        }
    }
})

const initialState = {
    status: "idle",
    error: null,
    setData: [],
    getData: [],
    filterData: [],
    energyData: []
}

const ChartSlice = createSlice({
    name: "chartreducer",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(postAccessLogData.pending, (state)=>{
            state.status = "pending"
        })
        .addCase(postAccessLogData.fulfilled, (state, action)=>{
            state.status = "succeeded";
            state.setData = [...state.setData, action.payload.logDate]
           state.filterData = action.payload.data
            state.error = null
        })
        .addCase(postAccessLogData.rejected, (state, action)=>{
            state.status = "Failed";
            state.error = action.payload
        })
        .addCase(getAccessLogData.pending, (state)=>{
            state.status = "pending"
        })
        .addCase(getAccessLogData.fulfilled, (state, action)=>{
            state.status = "succeeded";
            state.getData = action.payload.data;
            state.error= null
        })
        .addCase(getAccessLogData.rejected, (state, action)=>{
            state.status= "failed";
            state.error = action.payload.message
        })
        .addCase(getEnergyData.pending, (state)=>{
            state.status = "pending"
        })
        .addCase(getEnergyData.fulfilled, (state, action)=>{
            state.status = "succeeded";
            state.energyData = action.payload.data;
            state.error = null
        })
        .addCase(getEnergyData.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.payload.message
        })
    }
})

export const chartReducer = ChartSlice.reducer;
export const chartSelector = (state)=> state.chart;