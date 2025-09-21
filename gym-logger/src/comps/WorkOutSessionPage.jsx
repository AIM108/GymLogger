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




    class Exercise
    {
        constructor(exerciseName,exerciseType, exerciseFocus)
        {
            this.exerciseName =exerciseName;
            this.exerciseType =exerciseType;
            this.exerciseFocus =exerciseFocus;
        }
    }

    class Set
    {
        constructor()
        {
            this.isCompleted=false;
            this.setNumber=0;
            this.type=null;
            this.value=null;
        }
    }

    class ExecutedExersize
    {
        constructor(exercise)
        {
            this.exercise = exercise;
            this.sets=null;
        }
    }

    const [exerciseList,setExerciseList]=useState([]);
    const [exerciseData, setExerciseData]= useState({exerciseName:'None',exerciseType:'None',exerciseFocus:'None'})
    const inputExercise = useRef({
        exerciseName: null,
        exerciseType: null,
        exerciseFocus: null
    });

    function handleAddToExecutingExersizeList()
    {
        const name =inputExercise.current.exerciseName?.value;
        const type =inputExercise.current.exerciseType?.value;
        const focus =inputExercise.current.exerciseFocus?.value;
        if(name)
        {
        const ex = new ExecutedExersize(handleAddExersize(name,type,focus));
        setExerciseList(prev=>{
                    const updated = [...prev, ex];
                    console.log("Updated exercise list:", updated);
                    return updated;
                    });
        
        }
        else
        {
            console.log("Nothing was added to list array");
        }
    }
    function handleAddExersize(exerciseName,exerciseType,exerciseFocus)
    {
        return new Exercise(exerciseName,exerciseType,exerciseFocus);

    }
    function handleAddSet(executedExersize)
    {
        


    }



    return(
        <div>
            <header>
                <h1 className="title" id="workoutsession-page">WorkOutSession Page</h1>
                <h1>{timeFormated}</h1>
            </header>

            <div className="content">
                <div className="Temp-remove">
                    <input type="text" ref={inputeElement => inputExercise.current.exerciseName = inputeElement}/>
                    <input type="text" ref={inputeElement => inputExercise.current.exerciseType = inputeElement}/>
                    <input type="text" ref={inputeElement => inputExercise.current.exerciseFocus = inputeElement}/>



                    <button onClick={handleAddToExecutingExersizeList}>Add Exersice to List</button>
                </div>
                <div className="time-controls">
                <button onClick={handleStartTimer}> Start Timer</button>
                <button onClick={handleStopTimer}>Stop Timer</button>
                <button onClick={handleEndWorkout}>End Workout</button>
                </div>
            </div>

            <footer>
            </footer>
        </div>

    );

}
export default WorkOutSessionPage;