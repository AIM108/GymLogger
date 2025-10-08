
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MaintenancePage from './comps/MaintenancePage';
import LoginPage from './comps/LoginPage';
import MenuePage from './comps/MenuePage';
import WorkOutCompletePage from './comps/WorkOutCompletePage';
import WorkOutSessionPage from './comps/WorkOutSessionPage';
import HomePage from './comps/HomePage';

function App() {


 



  return (
    <>
    
    <div className="mobile-web-App">
      {
     
      <BrowserRouter>
        <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/workoutsession" element={<WorkOutSessionPage/>} />
                <Route path="/workoutcomplete" element={<WorkOutCompletePage/>} />
        </Routes>
      </BrowserRouter>
      }
      
    </div>

    <div className="desktop-web-App">
      <p id="desktop-message">This application does not work on desktop</p>

    </div>



    </>
  );
}

export default App;
