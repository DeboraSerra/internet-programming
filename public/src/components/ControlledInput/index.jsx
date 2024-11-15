import s from "@/styles/home.module.css";
import TextArea from "./TextArea";

function Input({ id, type, label, value = "", onChange = null, ...props }) {
  if (type === "textarea") {
    return (
      <TextArea
        id={id}
        type={type}
        label={label}
        onChange={onChange}
        value={value}
        {...props}
      />
    );
  }
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
        {...props}
      />
      <span className={s.input__label}>{label}</span>
    </label>
  );
}

export default Input;
