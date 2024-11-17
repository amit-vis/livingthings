import { useState } from "react"
import "./form_design.css"
import { useDispatch } from "react-redux";
import { signinUser } from "../../redux/reducer/user_reducer";
import {useNavigate} from "react-router-dom"

export const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [userData, setUserData] = useState({email:"", password: ""});
    const [error, setError] = useState("")
    const handleSignin = async ()=>{
        try {
            const user = {...userData};
            const result = await dispatch(signinUser(user));
            if(signinUser.fulfilled.match(result)){
                setUserData({email:"", password:""})
                navigate("/log")
            }else{
                setError(result.payload.message)
                setTimeout(()=>{
                    setError('')
                },5000)
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <>
            <div className="form-container">
                <div className="sub-form-container">
                    <h1>SignIn</h1>
                    {error && <div className="error-msg">{error}</div>}
                    <label>Email:</label>
                    <input type="email" 
                    placeholder="enter email..."
                    value={userData.email}
                    onChange={(e)=>setUserData({...userData, email: e.target.value})} 
                    />
                    <br />
                    <label>Password:</label>
                    <input type="password" placeholder="enter password..."
                    value={userData.password}
                    onChange={(e)=>setUserData({...userData, password: e.target.value})} 
                    />
                    <br />
                    <button type="button" onClick={handleSignin}>submit</button>
                    <br />
                    <a href="/signup">You don't have account</a>
                </div>
            </div>
        </>
    )
}