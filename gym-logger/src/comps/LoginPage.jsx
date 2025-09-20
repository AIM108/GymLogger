import NavigationBar from "./NavigationBar";
import "./loginStyle.css"
import { useNavigate } from "react-router-dom";


function LoginPage()
{
    const navigate = useNavigate();

    function handleOnClick()
    {
        
        navigate('/home');
    }


    return(
        <div className="login-page-container">
           <button onClick={handleOnClick}>SignIn</button>
        </div>

    );
}
export default LoginPage;