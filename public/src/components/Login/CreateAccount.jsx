import {
  maskPhone,
  validateEmail,
  validatePassword,
} from "@/script/helpers.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as auth from "../../../assets/script/auth.js";
import Button from "../Button/index.jsx";
import Input from "../ControlledInput";
import Popup from "../Popup";
import toastEmitter, { TOAST_EMITTER_KEY } from "../Toast/toastEmitter";

const defaultState = {
  name: "",
  phone: "000-000-0000",
  email: "",
  password: "",
};

const CreateAccount = ({ setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(defaultState);
  const { email, name, password, phone } = state;

  const router = useRouter();

  const redirect = (url) => {
    if (url) {
      router.push(url);
    } else {
      setIsLoading(false);
    }
  };

  async function createAccount(e) {
    e.preventDefault();
    setIsLoading(true);
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
    const url = await auth.createAccount({
      email,
      password,
      phone,
      displayName: name,
    });
    setIsOpen(false);
    redirect(url);
  }

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (name === "phone") value = maskPhone(value);
    setState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Popup setOpen={setIsOpen}>
      {" "}
      <form
        action=''
        className='flex flex-col w-full h-full items-center justify-between p-8'
        onSubmit={createAccount}
      >
        <Input
          id='name'
          type='name'
          label='Name'
          value={name}
          onChange={handleChange}
        />
        <Input
          id='phone'
          type='phone'
          label='Phone'
          value={phone}
          onChange={handleChange}
        />
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
        <div className='flex w-full gap-2 items-center'>
          <Button
            onClick={createAccount}
            className='flex items-center justify-center grow shadow-lg bg-slate-400 py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
            text='Create account'
            isLoading={isLoading}
          />
        </div>
      </form>
    </Popup>
  );
};
export default CreateAccount;
