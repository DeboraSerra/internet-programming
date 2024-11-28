"use client";

import { validateEmail, validatePassword } from "@/script/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import * as auth from "../../../assets/script/auth";
import toastEmitter, { TOAST_EMITTER_KEY } from "../Toast/toastEmitter";

function Button({
  className = "flex items-center justify-center shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none",
  action,
  type = "button",
  text = "Log in",
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const redirect = (url) => {
    if (url) {
      router.push(url);
    } else {
      setIsLoading(false);
    }
  };

  async function passwordLogin() {
    const form = document.querySelector("form");
    const email = form.querySelector("input#email").value;
    const password = form.querySelector("input#password").value;
    if (!validateEmail(email)) {
      toastEmitter.emit(TOAST_EMITTER_KEY, "Email format is invalid");
      setIsLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      toastEmitter.emit(
        TOAST_EMITTER_KEY,
        "Password should contain at least 8 characters, with at least 1 special character, 1 upper case letter, 1 lower case letter and one number"
      );
      setIsLoading(false);
      return;
    }
    const url = await auth.passwordLogin({ email, password });
    redirect(url);
  }

  async function googleLogin() {
    const url = await auth.googleLogin();
    redirect(url);
  }

  async function createAccount() {
    const form = document.querySelector("form");
    const email = form.querySelector("input#email").value;
    const password = form.querySelector("input#password").value;
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;
    const url = await auth.createAccount({ email, password });
    redirect(url);
  }

  const actions = {
    passwordLogin,
    googleLogin,
    createAccount,
  };

  return (
    <button
      className={className}
      type={type}
      onClick={(e) => {
        setIsLoading(true);
        type === "submit" && e.preventDefault();
        actions[action]();
      }}
    >
      {isLoading ? <FaSpinner className='animate-spin' /> : text}
    </button>
  );
}

export default Button;
