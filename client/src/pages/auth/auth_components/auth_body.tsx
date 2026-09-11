import {useState} from "react"
import axios from "axios"
import { useNavigate , useLocation} from "react-router-dom";


axios.defaults.withCredentials = true;

type User = {
  id: number;
  username: string;
  email: string;
};

type AuthBodyProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function AuthBody({setUser} : AuthBodyProps){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [error,setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    //if /register state = register. else state = login
    const state = location.pathname === "/register"
        ? "register"
        : "login";

    const handleSubmit = async (event : React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(state === "login"){
            try{   
                const res = await axios.post("http://localhost:5000/api/auth/login",{email,password});
                setUser(res.data.user);
                navigate("/");
            }
            catch(err){
                setError("Login failed");
            }
        }


        else if(state === "register"){
            try{
                const res = await axios.post("http://localhost:5000/api/auth/register",{email,password,username});
                setUser(res.data.user);
                navigate("/");
            }
            catch(err){
                setError("Registration failed");
            }
        }

    }
    
    return(
        <div>
            <div className = "loginStateSelect">
                <button
                    type = "button"
                    className={state === "login" ? "active" : "inactive"}
                    onClick={() => navigate("/login")}
                >Login</button>
                
                
                <button
                    type = "button"
                    className={state === "register" ? "active" : "inactive"}
                    onClick={() => navigate("/register")}
                >Register</button>
            </div>

            <form className="optionForm"
            onSubmit={handleSubmit}>
                {state === "login" ? (
                    <>
                        <h1 className="stateTitle">Welcome back!</h1>
                        {error && <p className="error">{error}</p>}
                        <div className="inputDiv">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            ></input>

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            ></input>
                            <button
                                type="submit"
                                className="inputSubmitButton"
                            >LOGIN</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="stateTitle">Create your account!</h1>
                        {error && <p className="error">{error}</p>}
                            <div className="inputDiv">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            ></input>

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            ></input>

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            ></input>

                             <button
                                type="submit"
                                className="inputSubmitButton"
                            >REGISTER</button>
                        </div>
                    </>
                )
               
                }
            </form>
        </div>
    )
}