"use client";
import s from "@/styles/home.module.css";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function PasswordInput({
  id,
  type,
  label,
  value = "",
  onChange = null,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <label htmlFor={id} className={`w-full ${s.input__container}`}>
      <input
        type={isVisible ? "text" : "password"}
        placeholder='&nbsp;'
        id={id}
        className={`w-full ${s.input}`}
        value={value}
        onChange={onChange}
        name={id}
        {...props}
      />
      <span className={s.input__label}>{label}</span>
      <span className={s.input__icon} onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <MdVisibilityOff /> : <MdVisibility />}
      </span>
    </label>
  );
}

export default PasswordInput;