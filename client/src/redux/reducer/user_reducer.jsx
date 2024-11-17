import {createAsyncThunk, createSlice, } from "@reduxjs/toolkit"
import axios from "axios";

export const signupUser = createAsyncThunk('user/signup', async (user, {rejectWithValue})=>{
    try {
        const {name, email, password} = user;
        const response = await axios.post("http://localhost:8000/user/create", 
            {name, email, password});
            if(response.status === 200){
                const data = response.data;
                return data
            }else{
                const errorData = response.data;
                return rejectWithValue(errorData)
            }
    } catch (error) {
        if(error.response && error.response.data){
            return rejectWithValue(error.response.data)
        }else{
            return rejectWithValue(error.message)
        }
    }
})

export const signinUser = createAsyncThunk("signin/user", async (user, {rejectWithValue})=>{
    try {
        const {email, password} = user;
        const response = await axios.post("http://localhost:8000/user/signin",
            {email, password}
        );
        if(response.status === 200){
            const data = response.data;
            return data;
        }else{
            const errorData = response.data;
            return rejectWithValue(errorData)
        }
    } catch (error) {
        if(error.response && error.response.data){
            return rejectWithValue(error.response.data)
        }else{
            return rejectWithValue(error.message)
        }
    }
})

const initialState = {
    status: "idle",
    userData: [],
    error: null
}

const userSlice = createSlice({
    name: "usersection",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(signupUser.pending, (state)=>{
            state.status = "pending";
        })
        .addCase(signupUser.fulfilled, (state, action)=>{
            state.status = "success";
            state.userData.push(action.payload);
            state.error = null
        })
        .addCase(signupUser.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.payload
        })
        .addCase(signinUser.pending, (state)=>{
            state.status = "pending"
        })
        .addCase(signinUser.fulfilled, (state, action)=>{
            state.status = "fullfilled";
            localStorage.setItem("token",action.payload.token);
            state.error = null
        })
        .addCase(signinUser.rejected, (state, action)=>{
            state.status="failed";
            state.error = action.payload
        })
    }
})

export const userReducer = userSlice.reducer;
export const userSelector = (state)=>state.user;