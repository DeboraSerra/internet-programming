"use client";
import { useState } from "react";
import "./style.css";

function NewTask() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [repeat, setRepeat] = useState(false);

  return (
    <div>
      <form action=''>
      <h1>New task</h1>
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          value={date}
          id='date'
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />

        <label htmlFor='time'>Hour</label>
        <input
          type='time'
          value={time}
          id='time'
          onChange={(e) => setTime(e.target.value)}
        />

        <label htmlFor='name'>Name</label>
        <input
          type='text'
          value={name}
          id='name'
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor='description'>Description</label>
        <textarea
          value={description}
          id='Description'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor='priority'>Priority {priority}</label>
        <input
          type='range'
          min='1'
          max='5'
          value={priority}
          id='priority'
          onChange={(e) => setPriority(e.target.value)}
        />

        <div>
          <label htmlFor='repeat'>
            <input
              type='checkbox'
              id='repeat'
              value={repeat}
              onChange={(e) => setRepeat(e.target.checked)}
            />{' '}
            Repeat event
          </label><br/>
          <label htmlFor="times" id="times-label">Number of times<input type="number" name="times" id="times" disabled={!repeat} /></label>
        </div>

        <button type='submit' className="submit"> Submit </button>
      </form>
    </div>
  );
}

export default NewTask;
