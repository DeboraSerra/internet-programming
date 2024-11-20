"use client";

import constants from "@/script/constants";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import toastEmitter, { TOAST_EMITTER_KEY } from "../Toast/toastEmitter";
import "./style.css";
import TaskCard from "./TaskCard";

const dashboardUrl = constants.TASK_URL;

async function fetchDashboardData(id) {
  try {
    const url = dashboardUrl + "?userId=" + id;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error.message);
    toastEmitter.emit(
      TOAST_EMITTER_KEY,
      "Failed to fetch dashboard data: " + error.message
    );
    return null;
  }
}

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    fetchDashboardData(id).then((data) => {
      if (!data.tasks.length) {
        router.push(`/${id}/new-task`);
      } else if (data.tasks) {
        setTasks(parseTasks(data));
      }
      setIsLoading(false);
    });
  }, []);

  function parseTasks(data) {
    const filteredTasks = {};
    for (const task of data.tasks) {
      const currTask = task;
      const currDate = currTask.date;
      if (filteredTasks[currDate]) {
        filteredTasks[currDate].push(currTask);
      } else {
        filteredTasks[currDate] = [currTask];
      }
    }

    const arrayOfTasks = Object.entries(filteredTasks);
    const parsedTasks = arrayOfTasks.map(([date, taskList]) => ({
      date,
      tasks: taskList,
    }));
    return parsedTasks.filter((it) => {
      const taskDate = new Date(it.date).toDateString();
      const today = new Date().toDateString();
      return new Date(taskDate) >= new Date(today);
    });
  }

  if (!isLoading && !tasks.length) {
    router.push(`/${id}/new-task`);
  }

  if (isLoading) {
    return (
      <div className='min-h-96 flex items-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='py-3 px-8 max-w-[500px] mx-auto'>
      <div>
        {tasks
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((it) => (
            <div key={it.date}>
              <h2 className='flex items-center font-bold text-lg h-[41px] border-b border-slate-400 border-t'>
                {new Date(it.date).toLocaleDateString()}
              </h2>
              {it.tasks.map((task) => (
                <TaskCard task={task} setTasks={setTasks} key={task.id} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
