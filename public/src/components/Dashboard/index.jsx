import constants from "@/script/constants";
import { FaStar } from "react-icons/fa";
import "./style.css";

const dashboardUrl = constants.TASK_URL + "?userId=67311a177bb55a6ce6df4947";

const tasks = {
  tasks: [
    {
      id: "6733dd6eb73a1e228a5859b0",
      name: "Task 4",
      date: "2024-11-12T22:29:52.052Z",
      description: "This is a description for task 4",
      completed: true,
      priority: 2,
      createdAt: "2024-11-12T00:00:00.000Z",
      userId: "67311a177bb55a6ce6df4947",
    },
    {
      id: "6733dd6eb73a1e228a5859af",
      name: "Task 3",
      date: "2024-11-12T22:29:52.052Z",
      description: "This is a description for task 3",
      completed: true,
      priority: 5,
      createdAt: "2024-11-12T00:00:00.000Z",
      userId: "67311a177bb55a6ce6df4947",
    },
    {
      id: "6733dd6eb73a1e228a5859b3",
      name: "Task 7",
      date: "2024-11-12T22:29:52.052Z",
      description: "This is a description for task 7",
      completed: true,
      priority: 4,
      createdAt: "2024-11-12T00:00:00.000Z",
      userId: "67311a177bb55a6ce6df4947",
    },
    {
      id: "6733dd6eb73a1e228a5859b4",
      name: "Task 8",
      date: "2024-11-12T22:29:52.052Z",
      description: "This is a description for task 8",
      completed: false,
      priority: 3,
      createdAt: "2024-11-12T00:00:00.000Z",
      userId: "67311a177bb55a6ce6df4947",
    },
    {
      id: "6733dd6eb73a1e228a5859ae",
      name: "Task 2",
      date: "2024-11-12T22:29:52.052Z",
      description: "This is a description for task 2",
      completed: true,
      priority: 4,
      createdAt: "2024-11-12T00:00:00.000Z",
      userId: "67311a177bb55a6ce6df4947",
    },
    {
      id: "6733dd6eb73a1e228a5859b1",
      name: "Task 5",
      date: "2024-11-13T22:29:52.052Z",
      description: "This is a description for task 5",
      completed: false,
      priority: 4,
      createdAt: "2024-11-13T22:29:52.052Z",
      userId: "67311a177bb55a6ce6df4947",
    },
    {
      id: "6733dd6eb73a1e228a5859ad",
      name: "Task 1",
      date: "2024-11-13T22:29:52.052Z",
      description: "This is a description for task 1",
      completed: false,
      priority: 3,
      createdAt: "2024-11-13T22:29:52.052Z",
      userId: "67311a177bb55a6ce6df4947",
    },
    {
      id: "6733dd6eb73a1e228a5859b5",
      name: "Task 9",
      date: "2024-11-13T22:29:52.052Z",
      description: "This is a description for task 9",
      completed: false,
      priority: 2,
      createdAt: "2024-11-13T22:29:52.052Z",
      userId: "67311a177bb55a6ce6df4947",
    },
    {
      id: "6733dd6eb73a1e228a5859b2",
      name: "Task 6",
      date: "2024-11-13T22:29:52.052Z",
      description: "This is a description for task 6",
      completed: false,
      priority: 3,
      createdAt: "2024-11-13T22:29:52.052Z",
      userId: "67311a177bb55a6ce6df4947",
    },
    {
      id: "6733dd6eb73a1e228a5859b6",
      name: "Task 10",
      date: "2024-11-13T22:29:52.052Z",
      description: "This is a description for task 10",
      completed: false,
      priority: 3,
      createdAt: "2024-11-12T00:00:00.000Z",
      userId: "67311a177bb55a6ce6df4947",
    },
  ],
};

function Dashboard() {
  const filteredTasks = {};
  for (const task of tasks.tasks) {
    const currDate = task.date;
    if (filteredTasks[currDate]) {
      filteredTasks[currDate].push(task);
    } else {
      filteredTasks[currDate] = [task];
    }
  }
  const arrayOfTasks = Object.entries(filteredTasks);
  const parsedTasks = [];
  for (const [date, tasks] of arrayOfTasks) {
    parsedTasks.push({ date, tasks });
  }
  return (
    <div className='dashboard py-3 px-8'>
      <div className='dashboard-header'></div>
      <div>
        {parsedTasks.map((it) => (
          <>
<<<<<<< HEAD
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
=======
            <h2 className='task-header border-b border-slate-400'>
              {new Date(it.date).toLocaleDateString()}
            </h2>
            {it.tasks.map((task) => (
              <div key={task.id} className='task'>
                <div className='task-header border-b border-slate-400'>
                  <input
                    type='checkbox'
                    checked={task.completed}
                    readOnly
                    className='task-checkbox'
                  />
                  <span className='task-name'>{task.name}</span>
                  <span className={`task-priority priority-${task.priority}`}>
                    <FaStar />
                  </span>
                </div>
                <div className='task-details border-b border-slate-400'>
                  <span className='task-desc'>{task.description}</span>
                </div>
              </div>
            ))}
>>>>>>> 3920bedbc0476d8debb2853c6ad96e22b1f7ff2a
          </>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
