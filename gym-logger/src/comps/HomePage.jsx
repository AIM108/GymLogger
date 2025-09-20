import "./homeStyle.css"
import NavigationButton from "./buttons/NavigationButton";
import React,{ useState, useEffect} from "react";


function HomePage()
{


const navigationButtons =
[
        { id:'QuickStart', name: 'Start', navigationRout: '/workoutsession' },
        { id:'RoutineWorkout', name: 'Start', navigationRout: '/workoutsession' },
        { id:'CreateRoutine', name: 'Create', navigationRout: '/workoutsession' },
        { id:'History', name: 'View', navigationRout: '/workoutsession' },
        { id:'SignOut',name: 'Sign Out', navigationRout: '/workoutsession' }


]

const [pageInView, setPageInView] = useState('QuickStart');
const [buttonIndex, setButtonIndex] = useState(0);

    function showNextButton()
    {
        
    
      setButtonIndex(buttonIndex => {
        if(buttonIndex === navigationButtons.length -1) return 0
        return buttonIndex+1;
      })
      
      

    }

    function showPrevButton()
    {
        
      setButtonIndex(buttonIndex => {
        if(buttonIndex ===0) return navigationButtons.length -1
        return buttonIndex -1
      })
      
      
    }

    useEffect(()=>
    {
        switch(buttonIndex)
            {
                case 0:
                    setPageInView(navigationButtons[buttonIndex].id);
                    console.log('Current Title: ', navigationButtons[buttonIndex].id,' Current index:',buttonIndex);
                    break;
                case 1:
                    setPageInView(navigationButtons[buttonIndex].id)
                    console.log('Current Title: ', navigationButtons[buttonIndex].id,' Current index:',buttonIndex);
                    break;
                case 2:
                    setPageInView(navigationButtons[buttonIndex].id)
                    console.log('Current Title: ', navigationButtons[buttonIndex].id,' Current index:',buttonIndex);
                    break;
                case 3:
                    setPageInView(navigationButtons[buttonIndex].id)
                    console.log('Current Title: ', navigationButtons[buttonIndex].id,' Current index:',buttonIndex);
                    break;
                case 4:
                    setPageInView(navigationButtons[buttonIndex].id)
                    console.log('Current Title: ', navigationButtons[buttonIndex].id,' Current index:',buttonIndex);
                    break;
                default:
                    setPageInView(navigationButtons[buttonIndex].id)
                    console.log('Current Title: ', navigationButtons[buttonIndex].id,' Current index:',buttonIndex);
            }
    } ,[buttonIndex]);

const buttonsList = navigationButtons.map(
    (buttonElement, index) => (<NavigationButton key={index} name={buttonElement.name} navigationRout={buttonElement.navigationRout}/>)
);





return(
    <div className="home-page-container">
        <header>
            
        </header>
        <div className="content">
            <h1 className="page-header">{pageInView}</h1>
            <div className="navigation-button-container">
                <button onClick={showPrevButton }>Left</button>
                <button onClick={showNextButton}>Right</button>
                <div className="navigation-button">
                    {console.log('Current buttonIndex: ',buttonIndex)}
                    {buttonsList[buttonIndex]}
                </div>
                
               
            </div>
        </div>

    </div>
);









}


export default HomePage;