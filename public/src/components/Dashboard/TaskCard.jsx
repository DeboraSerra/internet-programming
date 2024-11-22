import { useState } from "react";
import { FaSpinner, FaStar, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, onDelete, onChecked }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const getPriorityClass = (priority) => {
        if (priority === 1) return 'circumstantial'
        if (priority === 5) return 'urgent'
        return 'important'
    }
    return isLoading ? <div className="w-full h-[85px] flex items-center justify-center"><FaSpinner className="animate-spin" /></div> : <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="task">
        <div className="task-header flex items-center gap-3 py-2 px-3 border-b border-slate-400">
            <input
                type="checkbox"
                checked={task.completed}
                readOnly
                className="task-checkbox" onChange={async () => {
                    setIsLoading(true)
                    await onChecked(task.id, task.userId)
                    setIsLoading(false)
                }}
            />
            <span className="task-name grow">{task.name}</span>
            <span className="cursor-pointer w-[18px]">{isHovering && <FaTrash onClick={async () => {
                setIsLoading(true)
                await onDelete(task.id, task.userId)
                setIsLoading(false)
            }

            } />}</span>
            <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                <FaStar />
            </span>
        </div>
        <div className="task-details border-b border-slate-400">
            <span className="task-desc">{task.description}</span>
        </div>
    </div>
}

export default TaskCard;