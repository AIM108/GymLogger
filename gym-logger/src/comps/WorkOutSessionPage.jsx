import React,{ useState, useEffect, useRef} from "react";

function WorkOutSessionPage()
{
    const [isRunning, setIsRunning] =useState(false);
    const [time,setTime] = useState(0);
    const intervalRef = useRef(null);


    function handleStartTimer()
    {
        setIsRunning(true);
    }
    function handleStopTimer()
    {
        setIsRunning(false);
    }
    function handleEndWorkout()
    {
        setIsRunning(false);
        console.log(time);
        setTime(0);
       
    }






    useEffect(()=>{
        if(isRunning)
        {
            intervalRef.current = setInterval(()=>{setTime(prev=>prev+1)},1000);

        }
        else
        {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    



    },[isRunning]);


    const [min,setMin] =useState(0);
    const [hr,setHr] =useState(0);
    const[sec,setSec] =useState(0);
    const[timeFormated,setTimerFormated]=useState("");
    useEffect(()=>{
        let min =0;
        let hr =0;
        let sec =0;
        if(time<60)
        {
            sec=time%60;
        }
        if(time>60)
        {
            sec =time%60;
            min =Math.floor(time / 60);

            if(min>60)
            {
                hr=Math.floor(min / 60);
                min=min%60;
                
            }


        }
        setTimerFormated(`${hr}:${min}:${sec}`);
        
    },[time]);


    return(
        <div>
            <header>
                <h1 className="title" id="workoutsession-page">WorkOutSession Page</h1>
                <h1>{timeFormated}</h1>
            </header>

            <div className="content">
                <button onClick={handleStartTimer}> Start Timer</button>
                <button onClick={handleStopTimer}>Stop Timer</button>
                <button onClick={handleEndWorkout}>End Workout</button>
            </div>

            <footer>
            </footer>
        </div>

    );

}
export default WorkOutSessionPage;