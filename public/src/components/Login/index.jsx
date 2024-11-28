"use client";
import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";
import * as auth from "../../../assets/script/auth.js";
import Input from "../ControlledInput";
import Button from "../LoginButton/index.jsx";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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

  return (
    <form action='' className='flex flex-col w-[250px] items-center gap-10'>
      <Input id='email' type='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input id='password' type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button action='passwordLogin' type='submit' />
      <div className='flex w-full gap-2 items-center'>
        <Button
          action='googleLogin'
          className='flex items-center justify-center grow py-3 bg-red-600 rounded shadow-lg hover:bg-red-700 active:bg-red-800 active:shadow-none'
          text='Google'
        />
        <Button
          action='createAccount'
          className='flex items-center justify-center grow shadow-lg bg-slate-400 py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
          text='Create account'
        />
      </div>
    </form>
  );
}

export default Login;
