import {useNavigate} from "react-router-dom"
import { useState } from "react"
import { useAuth } from "./security/AuthContext";

function LoginComponent(){
    const authContext=useAuth();
    const[username,setUsername]=useState('rishabh')
    const[password,setPassword]=useState('')
    const navigate=useNavigate(0);
    const[showErrorMessage,setShowErrorMessage]=useState(false)
    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    function handleSubmit(){
       if(authContext.login(username,password)){
        navigate("/welcome");
       }
       else{
        setShowErrorMessage(true);
       }
    }
  
return(
    <div className="Login">
            <h1 >Time To Login!</h1>
        <div>
            {showErrorMessage && <div className="alert alert-warning">Authentication Failed.Please enter valid details.</div>}
            <div className="LoginForm">
                <div>
                    <label className="text-primary">UserName</label>
                    <input className="input m-1" type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label className="text-primary">PassWord</label>
                    <input className="input m-1" type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit} className="btn btn-success m-5">Login</button>
                </div>
            </div>
         </div>
    </div>
    )
}
export default LoginComponent