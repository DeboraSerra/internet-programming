import constants from "@/script/constants";
import "./style.css";

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
      "date": "2024-11-12T22:29:52.052Z",
      "description": "This is a description for task 5",
      "completed": false,
      "priority": 4,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859ad",
      "name": "Task 1",
      "date": "2024-11-12T22:29:52.052Z",
      "description": "This is a description for task 1",
      "completed": false,
      "priority": 3,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859b5",
      "name": "Task 9",
      "date": "2024-11-12T22:29:52.052Z",
      "description": "This is a description for task 9",
      "completed": false,
      "priority": 2,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859b2",
      "name": "Task 6",
      "date": "2024-11-12T22:29:52.052Z",
      "description": "This is a description for task 6",
      "completed": false,
      "priority": 3,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    },
    {
      "id": "6733dd6eb73a1e228a5859b6",
      "name": "Task 10",
      "date": "2024-11-12T22:29:52.052Z",
      "description": "This is a description for task 10",
      "completed": false,
      "priority": 3,
      "createdAt": "2024-11-12T00:00:00.000Z",
      "userId": "67311a177bb55a6ce6df4947"
    }
  ]
};

function Dashboard() {

  return (
    <div>
      <div>
        <button>+</button>
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <div>{task.date}</div>
            {task.items.map((item, idx) => (
              <div key={item.id}>
                <input type='checkbox' />
                <div>{item.name}</div>
                <div>{item.priority}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
