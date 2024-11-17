import { useState } from "react";
import "./form_design.css"
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/reducer/user_reducer";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({name: "", email: "", password:""});
    const [error, setError] = useState('')

    const handleSubmit = async ()=>{
        try {
            const user = {...userData};
            const result = await dispatch(signupUser(user));
            if(signupUser.fulfilled.match(result)){
                setUserData({name: "", email:"", password:""})
                navigate("/")
            }else{
                setError(result.payload.message)
                setTimeout(()=>{
                    setError("")
                },3000)
            }
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }
    
    return (
        <>
            <div className="form-container">
                
            <div className="sub-form-container">
                <h1>SignUp</h1>
                {error && <div className="error-msg">{error}</div>}
                <label>Name:</label>
                <input type="text" 
                placeholder="enter name..."
                value={userData.name}
                onChange={(e)=>setUserData({...userData, name: e.target.value})} 
                />
                <br />
                <label>Email:</label>
                <input type="email" 
                placeholder="enter email..."
                value={userData.email}
                onChange={(e)=>setUserData({...userData, email: e.target.value})} 
                />
                <br />
                <label>Password:</label>
                <input type="password" 
                placeholder="enter password..."
                value={userData.password}
                onChange={(e)=>setUserData({...userData, password: e.target.value})}
                 />
                <br />
                <button type="button" onClick={handleSubmit}>submit</button>
                <br/>
                <a href="/">You have already account</a>
            </div>
            </div>
        </>
    )
}