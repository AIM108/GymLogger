import { useNavigate } from "react-router-dom";
import react, { useState, useEffect, useRef, use } from "react";


function NavigationButton({name, navigationRout,id, style})
{
    
    const navigate = useNavigate();
    const handleClick = () =>{
        if(id === 'SignOut')
        {
            localStorage.removeItem('token');
        }
    
        navigate(navigationRout);
    }



    return(

     
        <button className="navigation-button" onClick={handleClick}>{name} </button>
    );




}
export default NavigationButton;