"use client";
import constants from "@/script/constants";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Input from "../ControlledInput";
import toastEmitter, { TOAST_EMITTER_KEY } from "../Toast/toastEmitter";
import "./style.css";

const newTaskUrl = constants.TASK_URL + "?userId=";

const defaultState = {
  date: "",
  name: "",
  description: "",
  priority: 1,
  repeat: false,
  times: 1,
};

function NewTask() {
  const [state, setState] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { date, description, name, times, priority, repeat } = state;
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const editTask = localStorage.getItem("editTask");
    if (editTask) {
      setState((prev) => ({ ...prev, ...JSON.parse(editTask) }));
      setIsEdit(true);
    } else {
      setState(defaultState);
      setIsEdit(false);
    }
  }, []);

  const handleChange = ({ target }) => {
    const { name, checked } = target;
    let { value } = target;
    if (name === "repeat") value = checked;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  async function submitForm(e) {
    setIsLoading(true);
    e.preventDefault();
    const numOfTimes = parseInt(times);
    let taskDate = new Date(date);
    for (let i = 1; i <= numOfTimes; i += 1) {
      try {
        const url = isEdit
          ? `${constants.TASK_URL}/${state.id}?userId=${id}`
          : newTaskUrl + id;
        const result = await fetch(url, {
          method: isEdit ? "PUT" : "POST",
          body: JSON.stringify({
            name,
            description,
            date: taskDate,
            priority,
            userId: id,
          }),
        });
        await result.json();
        toastEmitter.emit(
          TOAST_EMITTER_KEY,
          `Task to day ${taskDate.toLocaleDateString()} ${
            isEdit ? "updated" : "created"
          }`
        );
      } catch (err) {
        console.log(err);
        toastEmitter.emit(
          TOAST_EMITTER_KEY,
          `Task to day ${taskDate.toLocaleDateString()} could not be ${
            isEdit ? "updated" : "created"
          }`
        );
      }
      taskDate.setDate(taskDate.getDate() + 1);
    }
    setIsLoading(false);
    router.push(`/${id}/dashboard`);
  }

  return (
    <div>
      <form action='' onSubmit={submitForm}>
        <h1>New task</h1>
        <Input
          type='date'
          value={date.split("T")[0]}
          id='date'
          label='Date'
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
          label='Description'
          value={description}
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
            value={repeat}
            name='repeat'
            onChange={handleChange}
            disabled={isEdit}
          />{" "}
          Repeat event
        </label>

        <Input
          type='number'
          name='times'
          label='Number of times'
          id='times'
          disabled={!repeat}
          value={times}
          onChange={handleChange}
          min={1}
        />

        <button
          type='submit'
          className='flex items-center justify-center shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
        >
          {isLoading ? <FaSpinner className='animate-spin' /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default NewTask;
