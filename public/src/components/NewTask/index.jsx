"use client";
import constants from "@/script/constants";
import { useState } from "react";
import "./style.css";
import Input from "../ControlledInput";

const newTaskUrl = constants.TASK_URL + "?userId=67311a177bb55a6ce6df4947";

function NewTask() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [times, setTimes] = useState(1);

  async function submitForm(e) {
    e.preventDefault();
    console.log("prevent");
  }

  return (
    <div>
      <form action='' onSubmit={submitForm}>
        <h1>New task</h1>
        <Input
          type='date'
          label="Date"
          value={date}
          id='date'
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />

        <Input
          type='text'
          label="Name"
          value={name}
          id='name'
          onChange={(e) => setName(e.target.value)}
        />

        <Input type="textarea"
          value={description}
          label="Description"
          id='Description'
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor='priority'>Priority {priority}</label>
        <input
          type='range'
          label="Priority"
          min='1'
          max='5'
          value={priority}
          id='priority'
          onChange={(e) => setPriority(e.target.value)}
        />

          <label htmlFor='repeat'>
            <input
              type='checkbox'
              id='repeat'
              value={repeat}
              onChange={(e) => setRepeat(e.target.checked)}
            />{" "}
            Repeat event
          </label>
            <Input type='number' label= "Number of times" name='times' id='times' disabled={!repeat} min={0} pattern="\d*" />

        <button type='submit' className='mt-6 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'>
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
}

export default NewTask;
