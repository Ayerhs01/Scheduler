import './App.css'
import {useEffect, useState} from "react";
import ScheduleCell from "./components/ScheduleCell";
import {days, times} from "./components/scheduleConstants"

import {
  addSubcategory as addCategory,
  deleteCategory as delCategory,
  addItemToSubategory as addItem,
  deleteItem as delItem,
} from "./utils/Helpers";



function App() {
  const [openCategory, setOpenCategory] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("scheduleTasks");
    return savedTasks ? JSON.parse(savedTasks) : {};
  });



  {/**------------------------------------------------------------ */}
  {/** function that handles each cells*/}
  function handleCells(day, time, value) {
    const cellId = `${day}-${time}`;

    setTasks({
      ...tasks,
      [cellId]: {
        ...(tasks[cellId] || {subcategories: []}),
        text: value,
      },
    });
  }

  
  {/**------------------------------------------------------------ */}
  useEffect(() => {
      localStorage.setItem("scheduleTasks", JSON.stringify(tasks));
    }, [tasks]);


  return (
    <main className="app">
      <h1>Weekly Schedule</h1>

      <div className="grid-wrapper">

        <div className="schedule-grid">
          
          {/** Empty top-left corner*/}
          <div className="header-cell"></div>

          {/** ----------------------------------------------------*/}
          {/** Day headers */}
          {days.map((day) => (
            <div className="header-cell" key={day}>
              {day}
            </div>
          ))}


          {/** ----------------------------------------------------*/}   
          {/** time rows */}
          {times.map((time) => (
            <>
            
            {/** --------------------------------------------------*/}
            {/** time labels */}
            <div className="time-cell" key={time}>
              {time}
            </div>

            {/** --------------------------------------------------*/}
            {/** schedule cells */}
            {days.map((day) => {
              const cellId = `${day}-${time}`;
              
              return (

                <ScheduleCell
                  key={cellId}
                  day={day}
                  time={time}
                  tasks={tasks}
                  openCategory={openCategory}
                  setOpenCategory={setOpenCategory}
                  addSubcategory={(day, time) =>
                  addCategory(tasks, setTasks, day, time)}
                  addItemToSubcategory={(day, time, categoryName) =>
                    addItem(tasks, setTasks, day, time, categoryName)}
                  deleteCategory={(day, time, categoryName) =>
                    delCategory(tasks, setTasks, day, time, categoryName)}
                  deleteItem={(day, time, categoryName, index) => 
                  delItem(tasks, setTasks, day, time, categoryName, index)}
                />
              );
              })}
            </>
          ))}
        </div>
      </div>
    </main>
  );
}


function Day(day) {
  return (
  <div className="days">
    {day.name}
  </div>
  );
}

export default App;
