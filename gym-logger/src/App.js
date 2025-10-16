
import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import MaintenancePage from './comps/MaintenancePage';
import LoginPage from './comps/LoginPage';
import MenuePage from './comps/MenuePage';
import WorkOutCompletePage from './comps/WorkOutCompletePage';
import WorkOutSessionPage from './comps/WorkOutSessionPage';
import HomePage from './comps/HomePage';

function App() {


  const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/workoutsession',
    element: <WorkOutSessionPage />,
  },
  {
    path: '/workoutcomplete',
    element: <WorkOutCompletePage />,
  },
]);

 



  return (
    <>
    
    <div className="mobile-web-App">
      {
        <RouterProvider router={router}/>
      
      }
      
    </div>

    <div className="desktop-web-App">
      <p id="desktop-message">This application does not work on desktop</p>

    </div>



    </>
  );
}

export default App;
