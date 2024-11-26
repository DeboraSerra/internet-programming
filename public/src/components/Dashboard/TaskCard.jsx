import constants from "@/script/constants";
import { useRouter } from "next/navigation";
import PropType from "prop-types";
import { useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import Loading from "../Loading";

const TaskCard = ({ task, setTasks, tasks }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getPriorityClass = (priority) => {
    if (priority === 1) return "circumstantial";
    if (priority === 5) return "urgent";
    return "important";
  };

  async function onDelete(taskId, userId) {
    setIsLoading(true);
    const url = constants.TASK_URL + `/${taskId}?userId=${userId}`;
    const result = await fetch(url, { method: "DELETE" });
    const data = await result.json();
    if (data.task) {
      const newList = [];
      for (const item of tasks) {
        if (item.id !== data.task.id) {
          newList.push(item);
        }
      }
      setTasks(newList);
    } else {
      toastEmitter(TOAST_EMITTER_KEY, "Task couldn't be deleted, try again");
    }
    setIsLoading(false);
  }

  async function onChecked(taskId, userId) {
    const url = constants.TASK_URL + `/${taskId}?userId=${userId}`;
    const result = await fetch(url, { method: "PATCH" });
    const data = await result.json();
    if (data.task) {
      const newList = [];
      for (const item of tasks) {
        if (item.id !== data.task.id) {
          newList.push(item);
        } else {
          newList.push({ ...item, completed: !item.completed });
        }
      }
      setTasks(newList);
    } else {
      toastEmitter(TOAST_EMITTER_KEY, "Task couldn't be updated, try again");
    }
    setIsLoading(false);
  }

  function handleEdit(e) {
    if (
      !e.target.closest(`#delete-${task.id}`) &&
      !e.target.closest(`#complete-${task.id}`)
    ) {
      localStorage.setItem("editTask", JSON.stringify(task));
      router.push(`/${task.userId}/new-task`);
    }
  }

  return isLoading ? (
    <div className='h-[41px] flex items-center gap-3 px-3 border-b border-slate-400'>
      <Loading size={26} />
    </div>
  ) : (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleEdit}
    >
      <div className='h-[41px] flex items-center gap-3 px-3 border-b border-slate-400'>
        <input
          type='checkbox'
          id={`complete-${task.id}`}
          checked={task.completed}
          className='task-checkbox'
          onChange={async () => {
            setIsLoading(true);
            await onChecked(task.id, task.userId);
            setIsLoading(false);
          }}
        />
        <span className='grow text-lg'>{task.name}</span>
        <span className='cursor-pointer w-[18px]' id={`delete-${task.id}`}>
          {isHovering && (
            <FaTrash
              onClick={async () => {
                setIsLoading(true);
                await onDelete(task.id, task.userId);
                setIsLoading(false);
              }}
            />
          )}
        </span>
        <span className={`${getPriorityClass(task.priority)}`}>
          <FaStar />
        </span>
      </div>
      <p className='flex items-center justify-start p-2 text-sm text-slate-700 h-[41px] border-b border-slate-400'>
        {task.description}
      </p>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropType.shape({
    id: PropType.number,
    name: PropType.string,
    description: PropType.string,
    priority: PropType.number,
    completed: PropType.bool,
    date: PropType.string,
    userId: PropType.number,
  }).isRequired,
  tasks: PropType.arrayOf(
    PropType.shape({
      id: PropType.number,
      name: PropType.string,
      description: PropType.string,
      priority: PropType.number,
      completed: PropType.bool,
      date: PropType.string,
      userId: PropType.number,
    })
  ).isRequired,
  setTasks: PropType.func.isRequired,
};

export default TaskCard;
