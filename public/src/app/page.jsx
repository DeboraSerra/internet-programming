"use client";
import Button from "@/components/Button";
import Input from "@/components/ControlledInput";
import Login from "@/components/Login";
import Popup from "@/components/Popup";
import toastEmitter, {
  TOAST_EMITTER_KEY,
} from "@/components/Toast/toastEmitter";
import { useState } from "react";
import * as auth from "../../assets/script/auth";

export default function Home() {
  const [openPopup, setOpenPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const handleReset = async () => {
    await auth.resetPassword(resetEmail);
    toastEmitter.emit(
      TOAST_EMITTER_KEY,
      `Reset link was sent to email ${resetEmail}`
    );
    setOpenPopup(false);
    setResetEmail("");
  };
  return (
    <div className='flex flex-col items-center pt-40 min-h-screen'>
      <h1 className='mb-10 font-bold text-4xl'>Welcome</h1>
      <h2 className='text-2xl mb-8'>Log in to keep track of your tasks!</h2>
      <Login />
      <p className='mt-6 text-sm'>
        Forgot your password?{" "}
        <button
          className='text-blue-500 hover:underline'
          onClick={() => setOpenPopup(true)}
        >
          Click here
        </button>
      </p>
      {openPopup && (
        <Popup setOpen={setOpenPopup} isOpen={openPopup}>
          <form className='flex flex-col items-center justify-around h-full px-8'>
            <h2>Type the e-mail you registered</h2>
            <Input
              type='email'
              label='E-mail'
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <Button text='Receive reset email' onClick={handleReset} />
          </form>
        </Popup>
      )}
    </div>
  );
}
