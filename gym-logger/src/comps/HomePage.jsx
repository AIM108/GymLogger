
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
                    localStorage.clear();
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

const homePageContainerStyle=
{
    position:"relative",
        height:"100vh",
        width:"100vw",
        backgroundColor:"#D6D6D6"
}
const homePageHeaderStyle=
{
        position:"absolute",
        top:"30%",
        left:"50%",
        transform:"translateX(-50%)"
}


const navigationButtonContainerStyle=
{
    position:"absolute",
    width:"100vw",
    bottom:"10%",
    display:"flex",
    
  
 
}


const navigationButtonStyle=
{
    position:"relative",
    left:"50%",
    transform:"translateX(-50%)"
    
}

const leftNavOptionButtonStyle=
{
    position:"absolute",
    left:"0px",
    marginLeft:"10vw",
    fontSize:"64px",
    backgroundColor:"#D6D6D6",
    border:"none"

    
}

const rightNavOptionButtonStyle=
{
    position:"absolute",
    right:"0px",
    marginRight:"10vw",
    fontSize:"64px",
    backgroundColor:"#D6D6D6",
    border:"none"


}





return(
    <div className="home-page-container" style={homePageContainerStyle}>

        
            <h1 className="page-header" style={homePageHeaderStyle}>{pageInView}</h1>
               
               
               
                <div className="navigation-button-container" style={navigationButtonContainerStyle}>
                <button style={leftNavOptionButtonStyle} onClick={showPrevButton }>←</button>
                
                <div className="navigation-button" style={navigationButtonStyle}>
                    {console.log('Current buttonIndex: ',buttonIndex)}
                    {buttonsList[buttonIndex]}
                </div>
                <button style={rightNavOptionButtonStyle} onClick={showNextButton}>→</button>
               
            </div>
        

    </div>
);









}


export default HomePage;