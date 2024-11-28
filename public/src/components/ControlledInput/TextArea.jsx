import s from "@/styles/home.module.css";

function TextArea({ id, type, label, value = "", onChange = null, ...props }) {
  return (
    <label htmlFor={id} className={`w-full ${s.input__container}`}>
      <textarea
        type={type}
        placeholder='&nbsp;'
        id={id}
        className={`w-full ${s.input} ${s.textarea}`}
        value={value}
        onChange={onChange}
        name={id}
        {...props}
      />
      <span className={s.input__label}>{label}</span>
      <span className={s.bg}></span>
    </label>
  );
}

export default TextArea;
