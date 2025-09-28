import NavigationButton from "./buttons/NavigationButton";
import React, { useState, useRef} from "react";




function NavigationBar({navigationButtonsData, id, ...rest})
{
    //navigationButtonsData with be a collection of data objects that each have two parameters, name,route
    console.log('navigationButtonsData:', navigationButtonsData);

    const [buttonIndex, setButtonIndex] =useState(0);

    function showNextButton()
    {
      setButtonIndex(index => {
        if(index === navigationButtonsData.length -1) return 0
        return index+1;
      })

    }

    function showPrevButton()
    {
      setButtonIndex(index => {
        if(index ===0) return navigationButtonsData.length -1
        return index -1
      })
    }
  

    


    const navigationButtons =navigationButtonsData.map(
                (buttonElement, index )=> (<NavigationButton 
                    key = {index} 
                    name={buttonElement.name} 
                    navigationRout={buttonElement.navigationRout}
                    
                      />

               ));








    return(
            <div className="navigation-bar">
            <div id={id} className="navigation-bar-buttons" {...rest}>
              {navigationButtons[buttonIndex]}
            </div>
              <button onClick={showPrevButton}>Left</button>
              <button onClick={showNextButton}>Right</button>
            </div>



    );


}

export default NavigationBar;