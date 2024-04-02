import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  // let [tasks, setTasks] = useState([
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  // ]);
  // let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  function removeTask(todolistID: string, id: string) {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].filter((t) => t.id != id),
    });
    // let filteredTasks = tasks.filter(t => t.id != id);
    // setTasks(filteredTasks);
  }

  function addTask(todolistID: string, title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = { ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] };
    setTasks(newTasks);

    // let task = {id: v1(), title: title, isDone: false};
    // let newTasks = [task, ...tasks];
    // setTasks(newTasks);
  }

  function changeStatus(
    todolistID: string,
    taskId: string,
    newIsDone: boolean
  ) {
    let task = tasks[todolistID].find((t) => t.id === taskId);
    if (task) {
      task.isDone = newIsDone;
    }
    setTasks({ ...tasks, [todolistID]: tasks[todolistID] });

    // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone:newIsDone} : t)})
    // let task = tasks.find(t => t.id === taskId);
    // if (task) {
    //     task.isDone = isDone;
    // }
    // setTasks([...tasks]);
  }

  //let tasksForTodolist = tasks;
  function changeFilter(todolistID: string, value: FilterValuesType) {
    setTodolists(
      todolists.map((tl) =>
        tl.id === todolistID ? { ...tl, filter: value } : tl
      )
    );
  }
  // function changeFilter(todolistID: string, value: FilterValuesType) {
  //   let todolistWithNewFilter = todolists.find((tl) => tl.id === todolistID);
  //   let index = todolists.indexOf(todolistWithNewFilter!);
  //   let todolistWithNewFilterForArray = {
  //     ...todolistWithNewFilter,
  //     filter: value,
  //   };

  //   setTodolists([
  //     ...todolists,
  //     (todolists[index] = { todolistWithNewFilterForArray }),
  //   ]);
  // }

  return (
    <div className="App">
      {todolists.map((mapTodolists) => {
        let tasksForTodolist = tasks[mapTodolists.id];
        if (mapTodolists.filter === "active") {
          tasksForTodolist = tasks[mapTodolists.id].filter(
            (task) => task.isDone === false
          );
        }
        if (mapTodolists.filter === "completed") {
          tasksForTodolist = tasks[mapTodolists.id].filter(
            (task) => task.isDone === true
          );
        }
        return (
          <Todolist
            key={mapTodolists.id}
            todolistID={mapTodolists.id}
            title={mapTodolists.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={mapTodolists.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
