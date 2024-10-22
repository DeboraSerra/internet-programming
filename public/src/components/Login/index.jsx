"use client";
import service from "@/backend/services/users.mjs";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import s from "../../styles/home.module.css";

function Login() {
  const router = useRouter();
  function validadeEmail(email) {
    //add email validation
  }
  function validatePassword(password) {
    //add password validation
  }

  function passwordLogin() {
    const form = document.querySelector("form");
    const email = form.querySelector("input#email");
    const password = form.querySelector("input#password");
    if (!validadeEmail(email.value)) return;
    if (!validatePassword(password.value)) return;
    signInWithEmailAndPassword(email.value, password.value)
      .then((data) => {
        let user = data.user;
        const foundUser = service.getUser(user.email);
        if (!foundUser) throw new Error();
        router.push(`/dashboard/${foundUser.id}`);
      })
      .catch(console.log);
  }

  async function googleLogin() {
    const auth = getAuth();
    console.log(auth.settings)
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      const data = await signInWithPopup(provider);
      let user = data.user;
      let foundUser = service.getUser(user.email);
      if (!foundUser) {
        foundUser = service.createUser({ email: user.email, name: user.name });
      }
      router.push(`/dashboard/${foundUser.id}`);
    } catch (e) {
      console.log(e);
    }
  }

  function createAccount() {
    const form = document.querySelector("form");
    const email = form.querySelector("input#email");
    const password = form.querySelector("input#password");
    if (!validadeEmail(email.value)) return;
    if (!validatePassword(password.value)) return;
    createUserWithEmailAndPassword(email.value, password.value)
      .then((data) => {
        let user = data.user;
        const foundUser = service.createUser({ email: user.email });
        if (!foundUser) throw new Error();
        router.push(`/dashboard/${foundUser.id}`);
      })
      .catch(console.log);
  }

  return (
    <form action='' className='flex flex-col w-[250px] items-center gap-10'>
      <label htmlFor='email' className={`w-full ${s.input__container}`}>
        <input
          type='email'
          placeholder='&nbsp;'
          id='email'
          className={`w-full ${s.input}`}
        />
        <span className={s.input__label}>Email</span>
      </label>
      <label htmlFor='password' className={`w-full ${s.input__container}`}>
        <input
          type='password'
          placeholder='&nbsp;'
          id='password'
          className={`w-full ${s.input}`}
        />
        <span className={s.input__label}>Password</span>
      </label>
      <button
        className='shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
        onClick={(e) => {
          e.preventDefault();
          passwordLogin();
        }}
      >
        Log in
      </button>
      <div className='flex w-full gap-2 items-center'>
        <button
          type='button'
          className='grow py-3 bg-red-600 rounded shadow-lg hover:bg-red-700 active:bg-red-800 active:shadow-none'
          onClick={googleLogin}
        >
          Google
        </button>
        <button
          type='button'
          className='grow shadow-lg bg-slate-400 py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
          onClick={createAccount}
        >
          Create account
        </button>
      </div>
    </form>
  );
}

export default Login;
