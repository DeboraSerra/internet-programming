"use client";

import constants from "@/script/constants";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
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
    console.error("Failed to fetch dashboard data:", error);
    return null;
  }
}

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  async function loadData() {
    const data = await fetchDashboardData(id);
    if (!data.tasks.length) {
      router.push(`/${id}/new-task`);
    } else if (data.tasks) {
      setTasks(parseTasks(data));
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  function parseTasks(data) {
    const filteredTasks = {};
    for (const currTask of data.tasks) {
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
    setIsLoading(false);
    return parsedTasks.filter((it) => {
      const taskDate = new Date(it.date).toDateString();
      const today = new Date().toDateString();
      return new Date(taskDate) >= new Date(today);
    });
  }

  console.log({ tasks });

  if (!isLoading && !tasks.length) {
    return (
      <div className='min-h-96 flex flex-col items-center justify-center gap-5'>
        <p className='max-w-[500px] text-center flex items-center text-slate-800 text-2xl'>
          You don&apos;t have any task yet or all your tasks were due before{" "}
          {new Date().toDateString()}
        </p>
        <Link
          className='flex items-center text-blue-500 text-xl underline hover:text-blue-600'
          href={`/${id}/new-task`}
        >
          Add a new task
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='min-h-96 flex items-center justify-center'>
        <FaSpinner className='animate-spin' />
      </div>
    );
  }

  return (
    <div className='dashboard py-3 px-8'>
      <div className='dashboard-header'></div>
      <div>
        {tasks
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((it, index) => (
            <div key={index}>
              <h2 className='date-header font-bold text-lg py-3 border-b border-slate-400'>
                {new Date(it.date).toLocaleDateString()}
              </h2>
              {it.tasks.map((task) => (
                <TaskCard
                  task={task}
                  key={task.id}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
