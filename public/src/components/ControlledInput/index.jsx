import s from "@/styles/home.module.css";
import PasswordInput from "./PasswordInput";
import TextArea from "./TextArea";

function Input(props) {
  const { id, type, label, value = "", onChange = null, ...rest } = props;
  if (type === "textarea") {
    return <TextArea {...props} />;
  }

  if (type === "password") {
    return <PasswordInput {...props} />;
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
        {...rest}
      />
      <span className={s.input__label}>{label}</span>
    </label>
  );
}

export default Input;
