
import { useNavigate } from "react-router-dom";


function LoginPage()
{
    const navigate = useNavigate();

    function handleOnClick()
    {
        
        navigate('/home');
    }

    const loginPageContainer=
    {
        position:"relative",
        height:"100vh",
        width:"100vw",
        backgroundColor:"#D6D6D6"
        

    }

    const pageTitleStyle=
    {
        position:"absolute",
        top:"5%",
        left:"50%",
        transform:"translateX(-50%)"
        
    }

    const loginSectionStyle=
    {
        position:"absolute",
        top:"30%",
        left:"50%",
        transform:"translateX(-50%)",
        alignSelf:"center",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        padding:"15px",
       

    
    }

    const loginInputStyle=
    {
        padding: "2px",
        margin:"1px",
        border:"2px solid #ccc"
        
    }



    return(
        <div className="login-page-container" style={loginPageContainer}>
            <h1 id="page-title" style={pageTitleStyle}>Gym Logger</h1>
            <div className="login-section" style={loginSectionStyle}>
                <h2 id="login-tile-title">Login</h2>
                <input className="loginInput" style={loginInputStyle} type="text"/>
                <input className="loginInput" style={loginInputStyle} type="text"/>
                <button onClick={handleOnClick}>SignIn</button>
            </div>
           
        </div>

    );
}
export default LoginPage;