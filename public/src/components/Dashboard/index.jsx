import constants from "@/script/constants";
import "./style.css";
import { FaStar } from "react-icons/fa";

const dashboardUrl = constants.TASK_URL + "?userId=67311a177bb55a6ce6df4947"

const tasks = {
  "tasks": [
    {
      "id": "6733dd6eb73a1e228a5859b0",
      "name": "Task 4",
      "date": "2024-11-12T22:29:52.052Z",
      "description": "This is a description for task 4",
      "completed": true,
      "priority": 2,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859af",
      "name": "Task 3",
      "date": "2024-11-12T22:29:52.052Z",
      "description": "This is a description for task 3",
      "completed": true,
      "priority": 5,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859b3",
      "name": "Task 7",
      "date": "2024-11-12T22:29:52.052Z",
      "description": "This is a description for task 7",
      "completed": true,
      "priority": 4,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859b4",
      "name": "Task 8",
      "date": "2024-11-12T22:29:52.052Z",
      "description": "This is a description for task 8",
      "completed": false,
      "priority": 3,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859ae",
      "name": "Task 2",
      "date": "2024-11-12T22:29:52.052Z",
      "description": "This is a description for task 2",
      "completed": true,
      "priority": 4,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859b1",
      "name": "Task 5",
      "date": "2024-11-13T22:29:52.052Z",
      "description": "This is a description for task 5",
      "completed": false,
      "priority": 4,
      "createdAt": "2024-11-13T22:29:52.052Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859ad",
      "name": "Task 1",
      "date": "2024-11-13T22:29:52.052Z",
      "description": "This is a description for task 1",
      "completed": false,
      "priority": 3,
      "createdAt": "2024-11-13T22:29:52.052Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859b5",
      "name": "Task 9",
      "date": "2024-11-13T22:29:52.052Z",
      "description": "This is a description for task 9",
      "completed": false,
      "priority": 2,
      "createdAt": "2024-11-13T22:29:52.052Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859b2",
      "name": "Task 6",
      "date": "2024-11-13T22:29:52.052Z",
      "description": "This is a description for task 6",
      "completed": false,
      "priority": 3,
      "createdAt": "2024-11-13T22:29:52.052Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859b6",
      "name": "Task 10",
      "date": "2024-11-13T22:29:52.052Z",
      "description": "This is a description for task 10",
      "completed": false,
      "priority": 3,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    }
  ]
};

function Dashboard() {
  const filteredTasks = {}
  for (let i = 0; i < tasks.tasks.length; i += 1) {
    const currTask = tasks.tasks[i]
    const currDate = currTask.date
    if (filteredTasks[currDate]) {
      filteredTasks[currDate].push(currTask)
    } else {
      filteredTasks[currDate] = [currTask]
    }
  }
  const arrayOfTasks = Object.entries(filteredTasks) 
  const parsedTasks = []
  for (let i = 0; i < arrayOfTasks.length; i += 1) {
    const date = arrayOfTasks[i][0]
    const currTasks = arrayOfTasks[i][1]
    parsedTasks.push({date, tasks: currTasks})
  }
  console.log(parsedTasks)
  return (
    <div className="dashboard py-3 px-8">
      <div className="dashboard-header">
      </div>
      <div>
        {parsedTasks.map((it) => (
          <>
          <h2 className="date-header font-bold text-lg py-3 border-b border-slate-400">{new Date(it.date).toLocaleDateString()}</h2>
          {it.tasks.map(task => (<div key={task.id} className="task">
            <div className="task-header flex items-center gap-3 py-2 px-3 border-b border-slate-400">
              <input type="checkbox" checked={task.completed} readOnly className="task-checkbox" />
              <span className="task-name">{task.name}</span>
              <span className={`task-priority priority-${task.priority}`}>
                <FaStar />
              </span>
            </div>
            <div className="task-details border-b border-slate-400">
              <span className="task-desc">{task.description}</span>
            </div>
          </div>))}
          </>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
