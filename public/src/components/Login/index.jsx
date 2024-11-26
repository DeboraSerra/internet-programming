"use client";
import { validateEmail, validatePassword } from "@/script/helpers.js";
import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";
import * as auth from "../../../assets/script/auth.js";
import toastEmitter, { TOAST_EMITTER_KEY } from "../Toast/toastEmitter.js";
import CreateAccount from "./CreateAccount.jsx";
import Input from "../Input";
import Button from "../LoginButton/index.jsx";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    auth.onLoadUser().then((user) => {
      if (user.id) {
        router.push(`/${user.id}/dashboard`);
        localStorage.setItem("userData", JSON.stringify(user));
      } else {
        localStorage.removeItem("userData");
        router.push("/");
      }
    });
  }, []);

  const redirect = (url) => {
    if (url) {
      router.push(url);
    } else {
      setIsLoading(false);
    }
  };

  async function passwordLogin(e) {
    e.preventDefault();
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

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      action=''
      className='flex flex-col w-[250px] items-center gap-10'
      onSubmit={passwordLogin}
    >
      <Input
        id='email'
        type='email'
        label='Email'
        value={email}
        onChange={handleChange}
      />
      <Input
        id='password'
        type='password'
        label='Password'
        value={password}
        onChange={handleChange}
      />
      <Button onClick={passwordLogin} type='submit' isLoading={isLoading} />
      <div className='flex w-full gap-2 items-center'>
        <Button
          onClick={googleLogin}
          className='flex items-center justify-center grow py-3 bg-red-600 rounded shadow-lg hover:bg-red-700 active:bg-red-800 active:shadow-none'
          text='Google'
          isLoading={isLoading}
        />
        <Button
          onClick={() => {
            setOpenPopup(true);
          }}
          className='flex items-center justify-center grow shadow-lg bg-slate-400 py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
          text='Create account'
          isLoading={isLoading}
          type='button'
        />
      </div>
      {openPopup && <CreateAccount setIsOpen={setOpenPopup} />}
    </form>
  );
}

export default Login;
