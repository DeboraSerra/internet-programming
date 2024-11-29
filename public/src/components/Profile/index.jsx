"use client";

import constants from "@/script/constants";
import { maskPhone } from "@/script/helpers";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import placeholder from "../../../assets/user_placeholder.jpg";
import Button from "../Button";
import Input from "../ControlledInput";
import Loading from "../Loading";
import toastEmitter, { TOAST_EMITTER_KEY } from "../Toast/toastEmitter";
import "./profile.css";
import EditPassword from "./ResetPassword";

const getUserUrl = constants.USER_URL + `?email=`;
const updateUserUrl = constants.USER_URL + `?id=`;

const defaultState = {
  name: "",
  birthday: "",
  phone: "000-000-0000",
  email: "",
  profilePicture: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(defaultState);
  const [editMode, setEditMode] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const fetchUserData = async (email) => {
    try {
      const response = await fetch(getUserUrl + email);
      if (!response.ok) {
        throw new Error("Error fetching profile data");
      }
      const data = await response.json();
      setProfile((prev) => ({
        ...prev,
        ...data.user,
        profilePicture: data.user.photo ?? "",
      }));
    } catch (error) {
      toastEmitter.emit(
        TOAST_EMITTER_KEY,
        `Error fetching profile data: ${error}`
      );
      console.error("Error fetching profile data:", error);
    }
    setPageIsLoading(false);
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      fetchUserData(JSON.parse(userData).email);
    }
  }, []);

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === "phone") value = maskPhone(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    const response = await fetch(updateUserUrl + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...profile, id }),
    });

    if (response.ok) {
      toastEmitter.emit(TOAST_EMITTER_KEY, "Profile updated successfully!");
      setEditMode(false);
    } else {
      toastEmitter.emit(TOAST_EMITTER_KEY, "Error updating profile!");
    }
    setIsLoading(false);
  };

  const handleEditClick = () => setEditMode(true);

  const handleCancelEdit = () => setEditMode(false);

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    setEditMode(false);
  };

  if (pageIsLoading) {
    return (
      <div className='min-h-96 flex items-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        <Image
          src={profile.profilePicture || placeholder}
          alt='Profile'
          className='profile-picture'
          width={200}
          height={200}
        />
        <h2>{profile.name}</h2>
      </div>

      {isChangingPassword ? (
        <EditPassword
          setIsChangingPassword={setIsChangingPassword}
          isLoading={isLoading}
        />
      ) : (
        <>
          <div className='profile-info'>
            <div className='profile-field'>
              {editMode ? (
                <Input
                  id='name'
                  label='User Name'
                  value={profile.name}
                  onChange={handleChange}
                  name='name'
                />
              ) : (
                <>
                  <span className='label'>User Name:</span>
                  <span className='profile-text'>{profile.name}</span>
                </>
              )}
            </div>

            <div className='profile-field'>
              {editMode ? (
                <Input
                  id='phone'
                  label='Phone'
                  value={profile.phone}
                  onChange={handleChange}
                  name='phone'
                />
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

          {editMode ? (
            <>
              <Button
                onClick={handleSaveProfile}
                className='mt-3 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
                text='Save Changes'
                isLoading={isLoading}
              />
              <Button
                onClick={handleCancelEdit}
                className='mt-3 shadow-lg bg-red-600 w-full py-3 rounded hover:bg-red-700 active:bg-red-800 active:shadow-none'
                text='Cancel Edit'
              />
            </>
          ) : (
            <>
              <Button
                onClick={handleChangePasswordClick}
                className='mt-6 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
                text='Edit Password'
              />
              <Button
                onClick={handleEditClick}
                className='mt-3 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
                text='Edit Profile'
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
