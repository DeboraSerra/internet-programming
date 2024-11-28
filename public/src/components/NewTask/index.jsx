"use client";
import constants from "@/script/constants";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../ControlledInput";
import toastEmitter, { TOAST_EMITTER_KEY } from "../Toast/toastEmitter";
import "./style.css";

const newTaskUrl = constants.TASK_URL + "?userId=";

function NewTask() {
  const [state, setState] = useState({
    date: "",
    name: "",
    description: "",
    priority: 1,
    repeat: false,
    times: 1,
  });
  const { date, description, name, times, priority, repeat } = state;
  const { id } = useParams();
  const router = useRouter();

  const handleChange = ({ target }) => {
    const { name, checked } = target;
    let { value } = target;
    if (name === "repeat") value = checked;
    if (name === "priority") value = parseInt(value, 10);
    if (name === "times") value = parseInt(value, 10);
    setState((prev) => ({ ...prev, [name]: value }));
  };

  async function submitForm(e) {
    e.preventDefault();

    if (!date || isNaN(new Date(date).getTime())) {
      toastEmitter.emit(TOAST_EMITTER_KEY, "Select a valid date.");
      return;
    }

    if (!name.trim()) {
      toastEmitter.emit(TOAST_EMITTER_KEY, "Name is required.");
      return;
    }

    if (repeat) {
      if (isNaN(times) || times < 1) {
        toastEmitter.emit(
          TOAST_EMITTER_KEY,
          "Times must be a valid number greater than or equal to 1."
        );
        return;
      }
    }

    const requests = [];
    let taskDate = new Date(date);

    try {
      for (let i = 0; i < (repeat ? times : 1); i++) {
        const body = { ...state, date: taskDate.toISOString() };

        const fetchPromise = fetch(newTaskUrl + id, {
          method: "POST",
          accept: "application/json",
          body: JSON.stringify(body),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Failed to submit task");
            return response.json();
          })
          .then(() => {
            toastEmitter.emit(
              TOAST_EMITTER_KEY,
              "Task submitted successfully!"
            );
          })
          .catch((e) => {
            toastEmitter.emit(
              TOAST_EMITTER_KEY,
              `Failed to submit task. Try again later.`
            );
          });

        requests.push(fetchPromise);

        if (repeat) {
          taskDate.setDate(taskDate.getDate() + 1);
        }
      }

      await Promise.all(requests);
      router.push("/dashboard");
    } catch (error) {
      toastEmitter.emit(
        TOAST_EMITTER_KEY,
        `Error during submission: ${error.message}`
      );
    }
  }

  return (
    <div>
      <form action='' onSubmit={submitForm}>
        <h1>New task</h1>
        <Input
          type='date'
          label='Date'
          value={date.split("T")[0]}
          id='date'
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
        />

        <Input
          type='text'
          label='Name'
          value={name}
          id='name'
          onChange={handleChange}
        />

        <Input
          type='textarea'
          value={description}
          label='Description'
          id='description'
          onChange={handleChange}
        />

        <label htmlFor='priority'>Priority {priority}</label>
        <input
          type='range'
          min='1'
          max='5'
          value={priority}
          id='priority'
          name='priority'
          onChange={handleChange}
        />

        <label htmlFor='repeat'>
          <input
            type='checkbox'
            id='repeat'
            name='repeat'
            value={repeat}
            onChange={handleChange}
          />{" "}
          Repeat event
        </label>
        <Input
          type='number'
          label='Number of times'
          name='times'
          id='times'
          disabled={!repeat}
          min={0}
          onChange={handleChange}
          value={times}
        />

        <button
          type='submit'
          className='mt-6 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
        >
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
}

export default NewTask;
