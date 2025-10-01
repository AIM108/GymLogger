
import { useNavigate } from "react-router-dom";
import React, {useState} from "react";


function LoginPage()
{   const [userName,setUserName] = useState("");
    const [userPassword,setPassword] = useState("");

    const navigate = useNavigate();

    async function handleOnClick()
    {
        try{
            const response = await fetch("https://us6apt7pwh.execute-api.us-east-2.amazonaws.com/GymLogger/",{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({username:userName, userpassword:userPassword})
            });
            const data = await response.json();
            const body =JSON.parse(data.body);

            const accessToken = body.token;
            const message = body.message;
            localStorage.setItem("token",accessToken);
            console.log("Message: ",message);
            navigate("/home");




        }
        catch(error)
        {
            console.log(error);
        }
       
        
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
                <input className="loginInput" style={loginInputStyle} type="text" value={userName} onChange={e =>setUserName(e.target.value)}/>
                <input className="loginInput" style={loginInputStyle} type="text" value={userPassword} onChange={e=>setPassword(e.target.value)}/>
                <button onClick={handleOnClick}>SignIn</button>
            </div>
           
        </div>

    );
}
export default LoginPage;