import {useState} from "react"
import {BrowserRouter as Router, Routes,Route, Navigate} from "react-router-dom" 
import Auth from "./pages/auth/auth.tsx"
import Temp from "./pages/dashboard/temp.tsx"

export default function App(){
    return(
       <Router>
            <Routes>
                <Route path = "/" element={<Auth/>}></Route>
                <Route path = "/login" element={<Auth/>}></Route>
                <Route path = "/register" element={<Auth/>}></Route>
            </Routes>
       </Router>
    )
}