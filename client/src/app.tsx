import {useEffect, useState} from "react"
import {BrowserRouter as Router, Routes,Route, Navigate} from "react-router-dom"
import axios from "axios"
import Auth from "./pages/auth/auth.tsx"
import Temp from "./pages/dashboard/temp.tsx"

//tellss browser to include cookies/credentials so that requests may be verified
axios.defaults.withCredentials = true;

export default function App(){

    type User = {
        id: number;
        username: string;
        email: string;
    };

    const [user, setUser] = useState<User | null>(null);

    const [loading,setLoading] = useState(true);

    //useEffect runs once after component mounts
    //this checks to see if a user is already logged in
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const res = await axios.get("http://localhost:5000/api/auth/me")
                setUser(res.data);
            }
            catch(error){
                setUser(null);
            }
            finally{
                setLoading(false);
            }
        };
        fetchUser();
    },[])

    if(loading){
        return <div>Loading...</div>
    }

    return(
       <Router>
            <Routes>
                <Route
                path="/"
                element={<Temp />}
                />
                  <Route
                path="/login"
                element={<Auth user={user} setUser={setUser} />}
                />
                  <Route
                path="/register"
                element={<Auth user={user} setUser={setUser} />}
                />
            </Routes>
       </Router>
    )
}