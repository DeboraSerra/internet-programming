"use client";

import { useRouter } from "next/navigation";
import * as auth from "../../../assets/script/auth";

function Button({
  className = "shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none",
  action,
  type = "button",
  text = "Log in",
}) {
  const router = useRouter();

  function validadeEmail(email) {
    //add email validation
    return true;
  }
  function validatePassword(password) {
    //add password validation
    return true;
  }

  const redirect = (url) => {
    if (url) {
      router.push(url);
    }
  };

  async function passwordLogin() {
    const form = document.querySelector("form");
    const email = form.querySelector("input#email").value;
    const password = form.querySelector("input#password").value;
    if (!validadeEmail(email)) return;
    if (!validatePassword(password)) return;
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
    if (!validadeEmail(email)) return;
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
        type === "submit" && e.preventDefault();
        actions[action]();
      }}
    >
      {text}
    </button>
  );
}

export default Button;
