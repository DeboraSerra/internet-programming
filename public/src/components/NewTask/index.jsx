import service from "@/backend/services/tasks.mjs";
<link rel="stylesheet" href="style.css" />

function NewTask() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [repeat, setRepeat] = useState(false);
  return (
    <div>
      <h1>new task</h1>
      <form action="">
     
        <label id="date">Date</label>
        <input type="date" value={Date} id="date"/>

        <label id="time">Hour</label>
        <input type="time" value={time} id="time"/>
          
        <label id="name" >Name</label>
        <input type="text" value={name} id="name"/>

        <label id="description" >Description</label>
        <textarea value={description} id="Description" ></textarea>

        <label id="priority" >Priority</label>
        <input type="range" min="0" max="10" value={priority} id="priority" />

      <div>
          <input type="checkbox" />
          <label >Repeat event</label>
        </div>

        <button type="submit"> Submit </button>

    </form>
    </div>
   

  );
}

export default NewTask;
