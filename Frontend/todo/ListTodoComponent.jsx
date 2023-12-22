import {  useEffect, useState } from "react";
import { deleteTodoApi, retriveTodoApi, retriveTodoList } from "./Api/TodoListApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function ListTodoComponent(){
   const {id}= useParams()
    const [todos,setTodos]=useState([]);
    const [message,setMessage]=useState(null);
    const authContext=useAuth();
    const username=authContext.username;
    const navigate=useNavigate();
    useEffect(() =>
        refreshTodos,[]);
        function refreshTodos(){
            retriveTodoList(username)
            .then(response=>
                setTodos(response.data)
                )
            .catch((error)=>console.log(error))
        }
        function deleteTodo(id){
            console.log("Clicked"+id);
                deleteTodoApi(username,id)
                .then(
                    ()=>{
                    setMessage(`Delete of Todo with id= ${id} successful`)
                    refreshTodos()
                        }
                    )
                .catch(error=>console.log(error))
        }
        function updateTodo(id){
            if(id!=-1){
            retriveTodoApi(username,id)
            .then(
                navigate(`/todos/${id}`)
            )
            .catch((error)=>console.log(error))
        }
    }
        function addNewTodo(){
            retriveTodoApi(username,id)
            .then(
                navigate(`/todos/-1`)
            )
            .catch((error)=>console.log(error))
        }
 

    return(
        <div className="container">
            {message && <div className="alert alert-warning">{message}</div>}
            <h1>Things you want to do</h1>
            <div >
                Todo Details
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>isDone</th>
                            <th>TargetDate</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        todos.map(
                            todo =>(
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button></td>
                        </tr>)
                        )
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}
export default ListTodoComponent