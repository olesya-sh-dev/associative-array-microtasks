import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type todolistsType = {
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
    let filteredTasks = tasks[todolistID].filter((t) => t.id != id);
    setTasks({ ...tasks, [todolistID]: filteredTasks });
  }

  function addTask(todolistID: string, title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let newTasks = [task, ...tasks[todolistID]];
    setTasks({ ...tasks, [todolistID]: newTasks });
  }

  function changeFilter(todolistID: string, newValue: FilterValuesType) {
    setTodolists(
      todolists.map((tl) =>
        tl.id === todolistID ? { ...tl, filter: newValue } : tl
      )
    );
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
  }

  function removeTodolist(todolistID: string) {
    setTodolists(todolists.filter((tl) => tl.id !== todolistID));
    delete tasks[todolistID];
  }

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "active") {
          tasksForTodolist = tasks[tl.id].filter((t) => t.isDone === false);
        }
        if (tl.filter === "completed") {
          tasksForTodolist = tasks[tl.id].filter((t) => t.isDone === true);
        }
        return (
          <Todolist
            todolistID={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
