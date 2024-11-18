"use client";


import React, { useEffect, useState } from "react";
import constants from "@/script/constants";
import "./style.css";
import { FaSpinner, FaStar, FaTrash } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import toastEmitter, { TOAST_EMITTER_KEY } from "../Toast/toastEmitter";
import TaskCard from "./TaskCard";

const dashboardUrl = constants.TASK_URL

async function fetchDashboardData(id) {
  try {
    const url = dashboardUrl + "?userId=" + id
    const response = await fetch(url);

    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Dashboard data fetched successfully:", data);
    console.log({data})
    return data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return null;
  }
}

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  const { id } = useParams();

  async function loadData() {
    const data = await fetchDashboardData(id);
    if (!data.tasks.length) {
      router.push(`/${id}/new-task`)
    } else if (data.tasks) {
      setTasks(parseTasks(data));
    }
    setIsLoading(false)
  }
  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(taskId, userId){
    setIsLoading(true)
    const url = constants.TASK_URL + `/${taskId}?userId=${userId}`
    const result = await fetch(url, {method:'DELETE'})
    const data = await result.json()
    if(data.task){
      const newList = []
      for (const item of tasks) {
        if (item.id !== data.task.id) {
          newList.push(item)
        }
      }
      setTasks(newList)
    }else{
      toastEmitter(
        TOAST_EMITTER_KEY, "Task couldn't be deleted, try again"
      )
    }
    setIsLoading(false)
  }
async function handlePatch(taskId, userId){
  const url = constants.TASK_URL + `/${taskId}?userId=${userId}`
  const result = await fetch(url, {method:'PATCH'})
  const data = await result.json()
    if(data.task){
      const newList = []
      for (const item of tasks) {
        if (item.id !== data.task.id) {
          newList.push(item)
        } else {
          newList.push({...item, completed: !item.completed})
        }
      }
      setTasks(newList)
    }else{
      toastEmitter(
        TOAST_EMITTER_KEY, "Task couldn't be updated, try again"
      )
    }
    setIsLoading(false)
  
}


  function parseTasks(data) {
    const filteredTasks = {};
  for (let i = 0; i < data.tasks.length; i += 1) {
    const currTask = data.tasks[i];
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
  return parsedTasks.filter((it) =>{ 
  const taskDate = new Date(it.date).toDateString()
  const today = new Date().toDateString()
  console.log({task: new Date(taskDate), today: new Date(today)})
  return new Date(taskDate) >= new Date(today)})
  }

  if (!isLoading && !tasks.length) {
    router.push(`/${id}/new-task`)
  }

  if (isLoading) {
    return <div><FaSpinner className="animate-spin" /></div>
  }

  return (
    <div className="dashboard py-3 px-8">
      <div className="dashboard-header"></div>
      <div>
        {tasks.sort((a,b) => new Date(a.date) - new Date(b.date)).map((it, index) => (
          <div key={index}>
            <h2 className="date-header font-bold text-lg py-3 border-b border-slate-400">
              {new Date(it.date).toLocaleDateString()}
            </h2>
            {it.tasks.map((task) => (
              <TaskCard task={task} onDelete={handleDelete} onChecked={handlePatch} key={task.id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
