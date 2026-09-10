import budgieLogo from "../../../assets/budgieLogo.png"


export default function AuthHeader(){
    return(
        <header>
            <img className = "headerLogo" src = {budgieLogo} alt = "logoImage"></img>
        </header>
    )
}