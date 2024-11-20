"use client";
import { useState } from "react";
import { updateUserPassword } from "../../../assets/script/auth";
import Button from "../Button";
import Input from "../ControlledInput";
import toastEmitter, { TOAST_EMITTER_KEY } from "../Toast/toastEmitter";

const defaultState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const EditPassword = ({ setIsChangingPassword, isLoading }) => {
  const [passwordData, setPasswordData] = useState(defaultState);
  const { confirmPassword, newPassword, oldPassword } = passwordData;

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData(defaultState);
  };

  const handleSavePassword = async () => {
    if (
      !oldPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      toastEmitter.emit(
        TOAST_EMITTER_KEY,
        "Please fill in all password fields!"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toastEmitter.emit(
        TOAST_EMITTER_KEY,
        "The new password and confirmation do not match!"
      );
      return;
    }

    if (!validatePassword(newPassword)) {
      toastEmitter.emit(
        TOAST_EMITTER_KEY,
        "Password should contain at least 8 characters, with at least 1 special character, 1 upper case letter, 1 lower case letter and one number"
      );
      return;
    }

    const updated = await updateUserPassword(newPassword);
    setIsChangingPassword(false);
    setPasswordData(defaultState);
    if (updated)
      toastEmitter.emit(TOAST_EMITTER_KEY, "Password changed successfully!");
  };

  return (
    <div className='change-password-form'>
      <Input
        id='oldPassword'
        label='Old Password'
        type={"password"}
        value={oldPassword}
        onChange={handlePasswordChange}
        name='oldPassword'
      />
      <Input
        id='newPassword'
        label='New Password'
        type={"password"}
        value={newPassword}
        onChange={handlePasswordChange}
        name='newPassword'
      />
      <Input
        id='confirmPassword'
        label='Confirm Password'
        type={"password"}
        value={confirmPassword}
        onChange={handlePasswordChange}
        name='confirmPassword'
      />

      <Button
        onClick={handleSavePassword}
        className='mt-6 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
        text='Save Password'
        isLoading={isLoading}
      />
      <Button
        onClick={handleCancelPasswordChange}
        className='w-full py-3 bg-red-600 rounded shadow-lg hover:bg-red-700 active:bg-red-800 active:shadow-none'
        text='Cancel'
      />
    </div>
  );
};

export default EditPassword;
