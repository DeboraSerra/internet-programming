"use client";
import constants from "@/script/constants";
import { useState } from "react";
import "./style.css";

const newTaskUrl = constants.TASK_URL + "?userId=67311a177bb55a6ce6df4947";

function NewTask() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [times, setTimes] = useState(1);

  async function submitForm(e) {
    // validate fields
    // check if repeat is true
    // run the the fetch method "POST" the selected amount of times of repeat
    // if repeat is true: increment date by one for each task `times` amount
    // const taskDate = new Date(date);
    // taskDate.setDate(taskDate.getDate() + 1)
    // else: transform date and make the fetch one time
    // after the end of the last fetch, redirect page to dashboard
    e.preventDefault();
    console.log("prevent");
  }

  return (
    <div>
      <form action='' onSubmit={submitForm}>
        <h1>New task</h1>
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          value={date}
          id='date'
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
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
            />{" "}
            Repeat event
          </label>
          <br />
          <label htmlFor='times' id='times-label'>
            Number of times
            <input
              type='number'
              name='times'
              id='times'
              disabled={!repeat}
              value={times}
              onChange={(e) => setTimes(e.target.value)}
            />
          </label>
        </div>

        <button type='submit' className='submit'>
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
}

export default NewTask;
