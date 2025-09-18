import NavigationBar from "./NavigationBar";
import "./loginStyle.css"


function LoginPage()
{

    const buttons = [
        { name: 'Start', navigationRout: '/workoutsession' },
        { name: 'Start', navigationRout: '/workoutsession' },
        { name: 'Create', navigationRout: '/workoutsession' },
        { name: 'View', navigationRout: '/workoutsession' },
        { name: 'Sign Out', navigationRout: '/workoutsession' }
    ];

    return(
        <div className="login-page-container">
            <header>
                <h1 className="title" id="login-page">Login Page</h1>
            </header>

            <div className="content">
                <NavigationBar id="navagation-bar-login-page" navigationButtonsData={buttons}/>
            </div>

            <footer>
            </footer>
        </div>

    );
}
export default LoginPage;