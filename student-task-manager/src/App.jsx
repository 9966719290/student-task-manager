
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("studentTasks")
      ) || [];
    } catch {
      return [];
    }
  });

  const [taskName, setTaskName] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      "studentTasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();

    if (taskName.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskName.trim(),
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="app">
      <header className="header">
        <div className="logo">StudyTrack</div>
        <span>Student Task Manager</span>
      </header>

      <main className="container">
        <section className="welcome">
          <p className="tag">YOUR STUDY PLANNER</p>
          <h1>Plan your day, {`achieve more!`}</h1>
          <p>Organize your assignments and stay productive.</p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <h2>{tasks.length}</h2>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <h2>{pendingCount}</h2>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <h2>{completedCount}</h2>
          </div>
        </section>

        <section className="task-panel">
          <h2>My Tasks</h2>

          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter a task..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <button type="submit">+ Add Task</button>
          </form>

          <div className="filters">
            {["All", "Pending", "Completed"].map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <p className="empty">
                No tasks here. Add a task to get started!
              </p>
            ) : (
              filteredTasks.map((task) => (
                <div className="task-item" key={task.id}>
                  <label className="task-label">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span
                      className={
                        task.completed ? "done" : ""
                      }
                    >
                      {task.title}
                    </span>
                  </label>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <footer>
          Student Task Manager | Built with React.js
        </footer>
      </main>
    </div>
  );
}

export default App;
