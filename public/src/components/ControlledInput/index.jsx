import s from "@/styles/home.module.css";

function Input({ id, type, label, value = "", onChange = null }) {
  return (
    <label htmlFor={id} className={`w-full ${s.input__container}`}>
      <input
        type={type}
        placeholder='&nbsp;'
        id={id}
        className={`w-full ${s.input}`}
        value={value}
        onChange={onChange}
        name={id}
      />
      <span className={s.input__label}>{label}</span>
    </label>
  );
}

export default Input;
