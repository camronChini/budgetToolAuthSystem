import "./auth.css"
import AuthHeader from "./auth_components/auth_header"
import AuthBody from "./auth_components/auth_body"

type User = {
  id: number;
  username: string;
  email: string;
};


type AuthProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};


export default function Auth({user,setUser} : AuthProps){
    return(
        <>
            <AuthHeader/>
            <AuthBody setUser={setUser} />
        </>
    )
}