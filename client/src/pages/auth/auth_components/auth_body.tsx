import {useState} from "react"

export default function AuthBody(){
    
    const [state, setState] = useState<"login" | "register">("login");
    
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
                                required
                            ></input>

                            <input
                                type="password"
                                placeholder="Password"
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
                                type="username"
                                placeholder="Username"
                                required
                            ></input>
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                            ></input>

                            <input
                                type="password"
                                placeholder="Password"
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