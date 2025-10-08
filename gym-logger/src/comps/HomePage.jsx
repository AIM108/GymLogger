
import NavigationButton from "./buttons/NavigationButton";
import React,{ useState, useEffect} from "react";


function HomePage()
{


const navigationButtons =
[
        { id:'QuickStart', name: 'Start', navigationRout: '/workoutsession'},
        { id:'SignOut',name: 'Sign Out', navigationRout: '/',action: handleSignOut }


]


/*
Button that will be implemented in the future
{ id:'History', name: 'View', navigationRout: '/workoutsession' },
{ id:'RoutineWorkout', name: 'Start', navigationRout: '/workoutsession' },
{ id:'CreateRoutine', name: 'Create', navigationRout: '/workoutsession' },

*/

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

        useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
        }, []);
    

    useEffect(()=>
    {
        switch(buttonIndex)
            {
                case 0:
                    setPageInView(navigationButtons[buttonIndex].id);
                    console.log('Current Title: ', navigationButtons[buttonIndex].id,' Current index:',buttonIndex);
                    localStorage.removeItem('RawTime');
                    localStorage.removeItem('ExerciseList');
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
    (buttonElement, index) => (<NavigationButton key={index} name={buttonElement.name} navigationRout={buttonElement.navigationRout} id={buttonElement.id}/>)
);

const homePageContainerStyle=
{
        display:"flex",
        flexDirection:"column",
        height:"100vh",
        width:"100vw",
        margin:"0",
        overflow:"hidden",
        backgroundColor:"#D6D6D6",
        overflowY:"auto"
}
const homePageHeaderStyle=
{
        
        width:"100%",
        height:"8vh",
        margin:"0",
        border:"1px outset black",
        backgroundColor:"#2208F7",
        boxSizing:"border-box",
        color:"white",
        fontFamily:"Andale Mono, monospace"
}


const navigationButtonContainerStyle=
{
    display:"flex",
    width:"100vw",
    margin:"auto"
    
    
    
  
 
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
    border:"none",
    color:"black"

    
}

const rightNavOptionButtonStyle=
{
    position:"absolute",
    right:"0px",
    marginRight:"10vw",
    fontSize:"64px",
    backgroundColor:"#D6D6D6",
    border:"none",
    color:"black"


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