"use client";

import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: 'Anna Avetisyan',
    birthday: '2000-01-01',
    phone: '818 123 4567',
    instagram: '@anna_insta',
    email: 'info@techtide.co',
    password: "123456",
    profilePicture: "https://cdnstorage.sendbig.com/unreal/female.webp",
  });

  const [editMode, setEditMode] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
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
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
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
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    alert("Password changed successfully!");
  };

  const handleEditClick = () => setEditMode(true);

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    setEditMode(false);
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={profile.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <h2>{profile.username}</h2>
      </div>

      {!isChangingPassword && (
        <>
          <div className="profile-info">
            <div className="profile-field">
              <label>User Name:</label>
              {editMode ? (
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="input-field"
                />
              ) : (
                <p className="profile-text">{profile.username}</p>
              )}
            </div>

            <div className="profile-field">
              <label>Phone:</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="input-field"
                />
              ) : (
                <p className="profile-text">{profile.phone}</p>
              )}
            </div>

            <div className="profile-field">
              <label>Email:</label>
              <p className="profile-text">{profile.email}</p>
            </div>

            <div className="profile-field">
              <label>Password:</label>
              <div className="password-display">
                <p className="profile-text">********</p>
              </div>
            </div>
          </div>

          <button onClick={handleChangePasswordClick} className="edit-password-button">
            Edit Password
          </button>
          {editMode ? (
            <button onClick={handleSaveProfile} className="save-button">
              Save Changes
            </button>
          ) : (
            <button onClick={handleEditClick} className="edit-button">
              Edit Profile
            </button>
          )}
        </>
      )}

      {isChangingPassword && (
        <div className="change-password-form">
          <div className="profile-field">
            <label>Old Password:</label>
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="input-field"
            />
          </div>

          <div className="profile-field">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="input-field"
            />
          </div>

          <div className="profile-field">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="input-field"
            />
          </div>

          <button onClick={handleSavePassword} className="save-button">
            Save Password
          </button>
          <button onClick={handleCancelPasswordChange} className="cancel-button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
