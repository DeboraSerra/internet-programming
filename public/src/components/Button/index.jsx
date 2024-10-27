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
    let isValid = false
    if(password.length < 8) {
      isValid = false
    }
    else {
      isValid = true
    }
    const specialCharacters = ["@", "!", "?", "¡", "¿", "$", "%", "&", "(", ")"]
    for(const character of specialCharacters) {

      if(!password.includes(character)){
        isValid = false
      }
      else {
        isValid = true
        break
      }
    }
    const letters = ["A","B","C","D","E","F","G","H","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Z"]
    for(const character of letters) {

      if(!password.includes(character)){
        isValid = false
      }
      else {
        isValid = true
        break
      }
    } 
    for(const character of letters) {

      if(!password.includes(character.toLowerCase())){
        isValid = false
      }
      else {
        isValid = true
        break
      }
    } 
    const numbers = ["0","1","2","3","4","5","6","7","8","9"]
    for(const number of numbers) {

      if(!password.includes(number)){
        isValid = false
      }
      else {
        isValid = true
        break
      }
    } 
    return isValid;
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
