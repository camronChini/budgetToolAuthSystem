import {useState} from "react"

export default function AuthBody(){
    
    const [state, setState] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    
    return(
        <>
            <div className = "loginStateSelect">
                <button
                    type = "button"
                    className={state === "login" ? "active" : "inactive"}
                    onClick={() => setState("login")}
                >Login</button>
                
                
                <button
                    type = "button"
                    className={state === "register" ? "active" : "inactive"}
                    onClick={() => setState("register")}
                >Register</button>
            </div>

            <form className="optionForm">
                {state === "login" ? (
                    <>
                        <h1 className="stateTitle">Welcome back!</h1>
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
        </>
    )
}