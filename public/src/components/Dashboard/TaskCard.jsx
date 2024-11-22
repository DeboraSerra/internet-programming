import PropType from "prop-types";
import { useState } from "react";
import { FaSpinner, FaStar, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, tasks, setTasks }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  return isLoading ? (
    <div className='w-full h-[85px] flex items-center justify-center'>
      <FaSpinner className='animate-spin' />
    </div>
  ) : (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className='task'
    >
      <div className='task-header flex items-center gap-3 py-2 px-3 border-b border-slate-400'>
        <input
          type='checkbox'
          checked={task.completed}
          readOnly
          className='task-checkbox'
          onChange={async () => {
            setIsLoading(true);
            await onChecked(task.id, task.userId);
            setIsLoading(false);
          }}
        />
        <span className='task-name grow'>{task.name}</span>
        <span className='cursor-pointer w-[18px]'>
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
        <span className={`task-priority ${getPriorityClass(task.priority)}`}>
          <FaStar />
        </span>
      </div>
      <div className='task-details border-b border-slate-400'>
        <span className='task-desc'>{task.description}</span>
      </div>
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
