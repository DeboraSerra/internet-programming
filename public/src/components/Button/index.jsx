"use client";
import Loading from "../Loading";

function Button({
  className = "flex items-center justify-center shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none",
  type = "button",
  text = "Log in",
  onClick,
  isLoading = false,
}) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {isLoading ? <Loading /> : text}
    </button>
  );
}

export default Button;