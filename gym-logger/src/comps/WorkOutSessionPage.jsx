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

    class WorkoutSet
    {
        constructor()
        {
            this.isCompleted="NotCompleted";
            this.setNumber=1;
            this.type="REPS";
            this.value=0;
        }
    }

    class ExecutedExersize
    {
        constructor(exercise)
        {
            this.exercise = exercise;
            this.sets=[new WorkoutSet()];
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
    function handleAddSet(indexToUpdate)
    {
        
       setExerciseList(prev=>
        prev.map((item,index)=>{
            if(index ===indexToUpdate)
            {
                const lastSetNumber =item.sets && item.sets.length > 0? item.sets[item.sets.length - 1].setNumber: 0;
                const newSet = new WorkoutSet();
                newSet.setNumber = lastSetNumber+1;


                const updatedSets = item.sets?[...item.sets, newSet]: [newSet];
                return {...item, sets: updatedSets};
            }
            return item;
            
           })
       );

    }

    function handleOnChangeCheckBox(isSetComplete,exerciseIndexToUpdate,setIndexToUpdate)
    {


        setExerciseList(currentExerciseList=>currentExerciseList.map((item,index)=>{

            
            if(index === exerciseIndexToUpdate)
            {
                const updatedSets=item.sets.map((set,setindex)=>
                {
                    if(setindex === setIndexToUpdate)
                    {
                        
                            if(isSetComplete === true)
                            {
                                return {...set,isCompleted:"Completed"}

                            }
                            else
                            {
                                return {...set,isCompleted:"NotCompleted"}

                            }
                    }
                    return set;
                })

                return{...item,sets:updatedSets}
            }
            return item;
        }));




        
    }



    return(
        <div>
            <header>
                <h1 className="title" id="workoutsession-page">WorkOutSession Page</h1>
                <h1>{timeFormated}</h1>
            </header>

            <div className="content">
                <div className="Temp-reorganize">
                    <input type="text" ref={inputeElement => inputExercise.current.exerciseName = inputeElement}/>
                    <input type="text" ref={inputeElement => inputExercise.current.exerciseType = inputeElement}/>
                    <input type="text" ref={inputeElement => inputExercise.current.exerciseFocus = inputeElement}/>
                    


                    <div className="exerciseList">
                        {exerciseList.map((item, index) => (
                            <div key={index} className="exerciseItem">
                            <h2>{item.exercise.exerciseName}</h2>
                            {item.sets.map((set,setIndex)=>(
                                <div className="exercise-set" key={`exercise-${index}-set-${setIndex}`}>

                                    <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', padding: 0, margin: 0, alignItems: 'center' }}>
                                        <li><input type="checkbox" onChange={(e)=>handleOnChangeCheckBox(e.target.checked,index,setIndex)}/></li>
                                        <li><h4>SET {set.setNumber}</h4></li>
                                        <li><h4>{set.type}</h4></li>
                                        <li><input type="number"/></li>
                                    </ul>
                                    
                                    
                                    
                                    
                                    
                                </div>
                                
                                
                                
                                
                                ))}
                            <button onClick={() => handleAddSet(index)}>Add Set</button>
                            </div>
                        ))}
                    </div>
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