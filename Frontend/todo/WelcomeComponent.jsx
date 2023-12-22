import axios from "axios"
import {useState } from "react";
import { useNavigate } from "react-router-dom";
function WelcomeComponent(){
    const navigate=useNavigate()
    const [message,setMessage]=useState(null);
    // function  callHelloWorldRestApi(){
    //     axios.get('http://localhost:8080/hello-world')
    //     .then((response)=>successfulResponse(response))
    //     .catch((error)=>errorResponse(error))
    //     .finally(()=>console.log("cleaned"))
    // }
    function  callHelloWorldBean(){
        axios.get('http://localhost:8080/hello-world-bean')
        .then((response)=>successfulResponse(response))
        .catch((error)=>console.log(error))
        .finally(()=>console.log("cleaned"))
    }
    function successfulResponse(response){
        console.log(response);
        setMessage(response.data.message);
    }
    function todoList(){
        navigate('/todos-list');
    }
    return(
        <div className="Welcome">
            <h1>Want To Manage Your Tasks!</h1>
            <div className="container">
             -<div onClick={todoList} className="btn btn-success m-5">Go Here</div>
            {/* <button className="btn btn-success m-5" onClick={callHelloWorldBean}>Call Hello-World Bean</button> */}
            <div className="text-message">{message}</div>
            </div>
        </div>
    )  
}
export default WelcomeComponent