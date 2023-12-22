
import "./TodoApp.css"
import {BrowserRouter,Routes,Route } from "react-router-dom"
import LoginComponent from "./LoginComponent"
import LogoutComponent from "./LogoutComponent"
import HeaderComponent from "./HeaderComponent"
import ErrorComponent from "./ErrorComponent"
import ListTodoComponent from "./ListTodoComponent"
import WelcomeComponent from "./WelcomeComponent" 
import TodoComponent from "./TodoComponent"
import AuthProvider from "./security/AuthContext"
// import AuthProvider, { useAuth } from "./security/AuthContext"
// function AuthenticatedRoute({children}){
//     const authContext=useAuth();
//     if(authContext.isAuthencated)
//         return children
//     return <Navigate to="/"/>
// }
export default function TodoApp(){
    return(
        <div className="TodoApp">
                <AuthProvider>
                    <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                            <Route path="/" element={ <LoginComponent />}/>
                            <Route path="/login" element={ <LoginComponent />}/>
                            <Route path="/welcome" element={<WelcomeComponent /> }/>
                            <Route path="*" element={ <ErrorComponent />}></Route>
                            <Route path="/todos-list" element={ <ListTodoComponent /> }/>
                            <Route path="/logout" element={ <LogoutComponent />}/>
                            <Route path="/todos/:id" element={  <TodoComponent /> } />
                            
                    </Routes>
                    </BrowserRouter>
                    </AuthProvider>
            
        </div>
    )
}

