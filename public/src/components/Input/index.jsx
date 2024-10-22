import s from "@/styles/home.module.css";

function Input({ id, type, label }) {
  return (
    <label htmlFor={id} className={`w-full ${s.input__container}`}>
      <input
        type={type}
        placeholder='&nbsp;'
        id={id}
        className={`w-full ${s.input}`}
      />
      <span className={s.input__label}>{label}</span>
    </label>
  );
}

export default Input;
