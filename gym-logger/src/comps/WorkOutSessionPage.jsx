import React,{ useState, useEffect, useRef} from "react";

function WorkOutSessionPage()
{
    const [startTime,setStartTime] = useState(0);
    const [isRunning, setIsRunning] =useState(false);
    const [time,setTime] = useState(()=>{
        const savedTime = localStorage.getItem("RawTime");
        return savedTime? parseInt(savedTime):0;
    });
    const intervalRef = useRef(null);


    function handleStartTimer()
    {
        setIsRunning(true);
        const currentRawTime = localStorage.getItem("RawTime");
        if(currentRawTime === '0' || !currentRawTime)
        {
           setStartTime(Math.floor(Date.now()/1000)); 
        }

        
    }
    function handleStopTimer()
    {
        setIsRunning(false);
    }
    function handleClearTimer()
    {
        setIsRunning(false);
        console.log(time);
        setTime(0);
        setStartTime(0);
        localStorage.removeItem("RawTime");

    }
    function handleEndWorkout()
    {
        localStorage.removeItem("RawTime");
        localStorage.removeItem("ExerciseList");
        setIsRunning(false);
        console.log(time);
        setTime(0);
        setStartTime(0);
        setExerciseList([]);
       
    }

    useEffect(()=>{
        const savedTime = localStorage.getItem("RawTime");
        if(savedTime)
        {
            const now = Math.floor(Date.now()/1000);
            setStartTime(now - parseInt(savedTime));
            setTime(parseInt(savedTime));
            setIsRunning(true);
        }
    },[]);




    useEffect(()=>{
        if(isRunning)
        {
            clearInterval(intervalRef.current);
            intervalRef.current =setInterval(()=>{setTime((Math.floor(Date.now()/1000))-startTime);},1000);

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
        localStorage.setItem("RawTime",time);
        setTimerFormated(`${hr}:${min}:${sec}`);

        
       /*localStorage.setItem("RawTime",time);
       setTimerFormated(time);
       */
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
        constructor(type)
        {
            this.isCompleted="NotCompleted";
            this.setNumber=1;
            this.type=type;
            this.value=0;
        }
    }

    class ExecutedExersize
    {
        constructor(exercise)
        {
            this.exercise = exercise;
            this.sets=[new WorkoutSet(exercise.exerciseType)];
        }
    }
    
    const [exerciseList,setExerciseList]=useState( ()=>{
        const currentState = localStorage.getItem("ExerciseList");
        const loadExList = JSON.parse(currentState);
        return loadExList?loadExList:[];

    });

    const inputExercise = useRef({
            exerciseName: null,
            exerciseType: null,
            exerciseFocus: null
        });
   

    function captureCurrentState(currentList)
    {
        const currentState = currentList;
        const itemToCapture = JSON.stringify(currentState);
        localStorage.setItem("ExerciseList",itemToCapture);
    }





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
                    captureCurrentState(updated);
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
        
       setExerciseList(prev=>{
        const updated =prev.map((item,index)=>{
            if(index ===indexToUpdate)
            {
                const lastSetNumber =item.sets && item.sets.length > 0? item.sets[item.sets.length - 1].setNumber: 0;
                const newSet = new WorkoutSet(item.exercise.exerciseType);
                newSet.setNumber = lastSetNumber+1;


                const updatedSets = item.sets?[...item.sets, newSet]: [newSet];
                return {...item, sets: updatedSets};
            }
            return item;
            
           })
           captureCurrentState(updated);
           return updated;}
       );


     

    }

    function handleOnChangeCheckBox(isSetComplete,exerciseIndexToUpdate,setIndexToUpdate)
    {


        setExerciseList(currentExerciseList=>{
            
            
            const updated =currentExerciseList.map((item,index)=>{

            
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
        })
        captureCurrentState(updated);
        return updated;
    });




        
    }

    function handleOnChangeValueBox(updatedValue,exerciseIndexToUpdate,setIndexToUpdate)
    {

        setExerciseList(currentExerciseList=>
        {
            const updatedExerciseList = currentExerciseList.map((item,index)=>
            {

                if(index === exerciseIndexToUpdate)
                {
                    const updateExerciseSetList = item.sets.map((set,setIndex)=>
                    {
                        if(setIndex === setIndexToUpdate)
                        {
                            return {...set,value:updatedValue}

                        }
                        
                        return set;
                    })
                    return{...item,sets:updateExerciseSetList}

                }
                return item;

                
            })

            captureCurrentState(updatedExerciseList);
            return updatedExerciseList;
        });
        
    }

    const workoutSessionPageContentStyle =
    {
        position:"relative",
        display:"flex",
        flexDirection:"column",
        backgroundColor:"#D6D6D6",
        width:"100vw",
        height:"100vh",
        margin:"0",

    }
    const workoutSessionTitleStyle =
    {
        
        display:"flex",
        flexDirection:"column",
        top:"0",
        left:"0",
        margin:"0",
        border:"1px outset black",
        width:"100%",
        height:"8vh",
        backgroundColor:"#2208F7",
        boxSizing:"border-box",
        color:"white",
        fontFamily:"Andale Mono, monospace"
    
   
    }
    const timerContainerStyle=
    {
        
        fontFamily:"Andale Mono, monospace",

    }

    const mainContainerStyle=
    {
        display:"flex",
        flexDirection:"column",
        flex:"1",
        backgroundColor:"#D6D6D6",
       
    }

    const inputWorkoutContainerStyle=
    {
        
        display:"flex",
        width:"100vw",
        boxSizing:"border-box",
        top:"0",
        left:"0",
        padding:"2px",
        
        

    }

    const inputWorkoutStyle=
    {
        flex:"1",
        minWidth:"0",
        fontSize:"16px",
        border:"1px outset black",
        fontFamily:"Andale Mono, monospace",
        color:"black"
    }

    const addExersiceStyle=
    {
        position:"relative",
        border:"1px outset black",
        fontFamily:"Andale Mono, monospace",
        color:"black"
    }

    const exerciseListContainerStyle=
    {
        marginBottom:"80px"
    }

    const setListStyle=
    { listStyle: 'none', 
        display: 'flex', 
        gap: '1rem', 
        padding: 0, 
        margin: 0, 
        alignItems: 'center',
        justifyContent:"center"
        
    }

    const setValueInputStyle=
    {
        width:"30px",
        border:"1px outset black",
        fontFamily:"Andale Mono, monospace",
        color:"black",
        fontSize:"16px"
    }

    const AddSetButtonStyle=
    {
        border:"1px outset black",
        fontFamily:"Andale Mono, monospace",
        color:"black"
    }

    const timeControlsStyle=
    {
       
        marginBottom:"20px"

    }
    const timeButtonStyle=
    {
        border:"1px outset black",
        fontFamily:"Andale Mono, monospace",
        color:"black"
    }


  



    return(
        <div className="workoutsession-container" style={workoutSessionPageContentStyle}>
            <header className="workoutsession-header"id="workoutsession-page-content"  >
                <h1 className="title" id="workoutsession-page-content" style={workoutSessionTitleStyle}>WorkOutSession Page</h1>
                <h1 className="timer" id="workout-timer" style={timerContainerStyle}>{timeFormated}</h1>
                <div className="time-controls" style={timeControlsStyle}>
                <button style={timeButtonStyle} onClick={handleStartTimer}> Start Timer</button>
                <button style={timeButtonStyle} onClick={handleClearTimer}>Clear Timer</button>
                <button style={timeButtonStyle} onClick={handleEndWorkout}>End Workout</button>
                </div>
            </header>

            <div className="main-content" style={mainContainerStyle}>
                <div className="exercise-content">
                    <div className="inputWorkoutContainer" id="inputWorkout-active-workoutsession" style={inputWorkoutContainerStyle}>
                        <input className="inputWorkout" id="workout-name"style={inputWorkoutStyle} type="text" ref={inputeElement => inputExercise.current.exerciseName = inputeElement}/>
                        
                        
                        <select style={inputWorkoutStyle} ref={inputeElement => inputExercise.current.exerciseType = inputeElement}>
                            <option value="">Type</option>
                            <option value="REPS">REPS</option>
                            <option value="TIME">TIME</option>
                        </select>
                        
                        <select style={inputWorkoutStyle} ref={inputeElement => inputExercise.current.exerciseFocus = inputeElement}>
                            <option value="">Focus</option>
                            <option value="Weight">Weight</option>
                            <option value="Cardio">Cardio</option>
                        </select>
                        
                        
                        
                        
                        
                       
                    
                    </div>
                    <button className="add-exersice-button" style={addExersiceStyle} onClick={handleAddToExecutingExersizeList}>Add Exersice to List</button>


                    <div className="exerciseList" style={exerciseListContainerStyle}>
                        {exerciseList.map((item, index) => (
                            <div key={index} className="exerciseItem">
                            <h2>{item.exercise.exerciseName}</h2>
                            {item.sets.map((set,setIndex)=>(
                                <div className="exercise-set" key={`exercise-${index}-set-${setIndex}`}>

                                    <ul style={setListStyle}>
                                        <li><input type="checkbox" checked={set.isCompleted === "Completed"}onChange={(e)=>handleOnChangeCheckBox(e.target.checked,index,setIndex)}/></li>
                                        <li><h4>SET {set.setNumber}</h4></li>
                                        <li><h4>{set.type}</h4></li>
                                        <li><input type="number" style={setValueInputStyle} onChange={(e)=>handleOnChangeValueBox(e.target.value,index,setIndex)}/></li>
                                    </ul>
                                    
                                    
                                    
                                    
                                    
                                </div>
                                
                                
                                
                                
                                ))}
                            <button style={AddSetButtonStyle}onClick={() => handleAddSet(index)}>Add Set</button>
                            </div>
                        ))}
                    </div>
                    
                    
                </div>
                
            </div>

        </div>

    );

}
export default WorkOutSessionPage;