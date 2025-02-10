import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const addTask = () => {
    console.log(newTask);
    // setTasks([
    //   ...tasks,
    //   { id: tasks.length + 1, name: newTask.trim() },
    // ]);
    // setNewTask(""); // Clear input
    if (newTask.trim()) { // Ensure the task is not empty
      setTasks([...tasks, newTask]); // Add the new task to the array
      setNewTask(""); // Clear the input
    }
  };

  const deleteTask = (index) => {
    const newTasklist = (tasks.filter((_, i) => i !== index));
    setTasks(newTasklist);
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-[10%] pb-10% bg-[#d47a7a]">
        <div className="w-[50%] rounded-lg flex flex-col items-center min-h-[500px] bg-[#ffffff] relative">
          {/* Title */}
          <p className="text-red-500 font-medium my-4 text-lg">TODO APP</p>

          {/* Input and Add Task Button */}
          <div className="flex flex-col items-center w-full max-w-md space-y-4">
            <input
              className="border-2 w-full rounded-lg p-2 text-gray-700"
              placeholder="Task name"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="border-2 w-full rounded-lg p-2 font-semibold text-white bg-red-500 hover:bg-red-600" onClick={addTask}>
              Add Task
            </button>
          </div>

          {/* Task List */}
          <div className="w-full max-w-md mt-8">
            {tasks.map((tasks, index) => (
              <div key={index} className="flex flex-row justify-between items-center py-2">
                <p className="bg-red-500 text-white px-3 py-2 mr-4 rounded-lg">{index + 1}</p>
                <p className="flex-1 text-gray-800">{tasks}</p>
                <button className="text-red-500 font-medium hover:text-red-700" onClick={() => deleteTask(index)}>
                  DELETE
                </button>
              </div>
            ))}

          </div>
          <h1 className="font-medium absolute bottom-4 right-4">You have {tasks.length} {tasks.length >1 ? "tasks" : "task"}</h1>
        </div>

      </div>
    </div>
  );
}



