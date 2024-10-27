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

  function validateEmail(email) {
    //add email validation
    return true;
  }

  function validatePassword(password) {
    /**
     * first rule: 8 characters long at least.
     * Second rule: At least 1 special characters.
     * Third rule: One Caps letter.
     * Forth rule: One lower case letter.
     * Fifth rule: Require a number.
     */
    if (/\s/g.test(password)) {
      return false;
    }
    const specialCharacterRegex = /\W/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /\d/;

    const urlRegex =
      /[(http(s)?)?://(www\.)?a-zA-Z0-9@:%\._+~#=]{2,256}\.[a-z]{2,6}\b([-\d@:%_+\.~#?&//=]*)/gi;
    const scriptRegex = /<[^>]+>/g;
    if (urlRegex.test(password) || scriptRegex.test(password)) {
      return false;
    }

    return (
      password.length >= 8 &&
      specialCharacterRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password) &&
      numberRegex.test(password)
    );
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
    if (!validateEmail(email)) return;
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
        type === "submit" && e.preventDefault();
        actions[action]();
      }}
    >
      {text}
    </button>
  );
}

export default Button;