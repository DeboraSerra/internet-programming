"use client";

import constants from "@/script/constants";
import { useState } from "react";
import Input from "../Input";
import "./profile.css";

const userUrl = constants.USER_URL + `?email=debora.r.serra@gmail.com`;

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "Anna Avetisyan",
    birthday: "2000-01-01",
    phone: "818 123 4567",
    instagram: "@anna_insta",
    email: "info@techtide.co",
    password: "123456",
    profilePicture: "https://cdnstorage.sendbig.com/unreal/female.webp",
  });

  const [editMode, setEditMode] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setEditMode(false);
  };

  const handleSavePassword = () => {
    // Validação de senha
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill in all password fields!");
      return;
    }

    if (passwordData.oldPassword !== profile.password) {
      alert("Old password is incorrect!");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirmation do not match!");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("New password must be at least 8 characters long!");
      return;
    }
    setProfile((prevProfile) => ({
      ...prevProfile,
      password: passwordData.newPassword,
    }));

    // Limpa os dados da senha
    setIsChangingPassword(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    alert("Password changed successfully!");
  };

  const handleEditClick = () => setEditMode(true);

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    setEditMode(false);
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        <img
          src={profile.profilePicture}
          alt='Profile'
          className='profile-picture'
        />
        <h2>{profile.username}</h2>
      </div>

      {!isChangingPassword && (
        <>
          <div className='profile-info'>
            <div className='profile-field'>
              {editMode ? (
                <Input id='username' label='User Name' />
              ) : (
                <>
                  <span className='label'>User Name:</span>
                  <span className='profile-text'>{profile.username}</span>
                </>
              )}
            </div>

            <div className='profile-field'>
              {editMode ? (
                <Input id='phone' label='Phone' />
              ) : (
                <>
                  <span className='label'>Phone:</span>
                  <span className='profile-text'>{profile.phone}</span>
                </>
              )}
            </div>

            <div className='profile-field'>
              <span className='label'>Email:</span>
              <p className='profile-text'>{profile.email}</p>
            </div>

            <div className='profile-field'>
              <span className='label'>Password:</span>
              <div className='password-display'>
                <p className='profile-text'>********</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleChangePasswordClick}
            className='mt-6 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
          >
            Edit Password
          </button>
          {editMode ? (
            <button
              onClick={handleSaveProfile}
              className='mt-3 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className='mt-3 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
            >
              Edit Profile
            </button>
          )}
        </>
      )}

      {isChangingPassword && (
        <div className='change-password-form'>
          <Input id='oldPassword' label='Old Password' type='password' />
          <Input id='newPassword' label='New Password' type='password' />
          <Input
            id='confirmPassword'
            label='Confirm Password'
            type='password'
          />

          <button
            onClick={handleSavePassword}
            className='mt-6 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
          >
            Save Password
          </button>
          <button
            onClick={handleCancelPasswordChange}
            className='w-full py-3 bg-red-600 rounded shadow-lg hover:bg-red-700 active:bg-red-800 active:shadow-none'
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
