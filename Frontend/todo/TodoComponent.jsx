import { useEffect, useState } from "react"
import {useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { createTodoApi, retriveTodoApi, updateTodoApi } from "./Api/TodoListApiService";
import { Field, Formik ,Form, ErrorMessage} from "formik";
import moment from "moment";


export default function TodoComponent(){
    const{id}=useParams();
    const navigate=useNavigate()
    
    const [description,setDescription]=useState('');
    const [targetDate,setTargetDate]=useState(Date.now);
    const authContext=useAuth();
    const username=authContext.username;
    useEffect(
        ()=>retriveTodos(id),[id]
)
    function retriveTodos(id){
        retriveTodoApi(username,id)
        .then((response)=>{
            setTargetDate(response.data.targetdate)
            setDescription(response.data.description)
            
        }
     )
        .catch(error=>console.log(error));
    }
    function onSubmit(values){
        const todo={
            id:id,
            username:username,
            description:values.description,
            targetDate:values.targetDate,
            done:false
        }
        if(id==-1){
            createTodoApi
            .then(
            updateTodoApi(username,id,todo)
        .then((response)=>{
            navigate('/todos-list')
           // navigate('/todos-list')  
        }
     )
        .catch(error=>console.log(error))
        )
        }
        else{
        updateTodoApi(username,id,todo)
        .then((response)=>{
            navigate('/todos-list')
           // navigate('/todos-list')  
        }
     )
        .catch(error=>console.log(error));
    }
    }
    function validate(values){
        let errors={
            //rutcn 
            }
        if(values.description.length<5){
        errors.description='Enter Atleast 5 Character'
        }
        if(values.targetDate==null || values.targetDate==''){
            errors.targetDate='Enter Valid Date'
            }
        console.log(values);
        return errors;
    }
    return(
    <div className="container">
              <h1>Here You Can Update Todo</h1> 
              { <div>
                <Formik initialValues={{targetDate,description}}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning" />
                                <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date"  className="form-control" name="targetDate"></Field>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }

                </Formik>
              </div> }
    </div>
    )
}