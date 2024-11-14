"use client";

import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: 'Anna Avetisyan',
    birthday: '2000-01-01',
    phone: '818 123 4567',
    instagram: '@anna_insta',
    email: 'info@aplusdesign.co',
    password: '********',
    profilePicture: "https://cdnstorage.sendbig.com/unreal/female.webp",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleEditClick = () => setEditMode(true);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="https://cdnstorage.sendbig.com/unreal/female.webp"
          alt="Profile"
          className="profile-picture"
        />
        <h2>{profile.username}</h2>
      </div>

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
          <label>Birth Date:</label>
          <p className="profile-text">{profile.birthday}</p>
        </div>

        <div className="profile-field">
          <label>Email:</label>
          <p className="profile-text">{profile.email}</p>
        </div>

        <div className="profile-field">
          <label>Password:</label>
          <p className="profile-text">{profile.password}</p>
        </div>
      </div>

      {/* Botões de ação */}
      {editMode ? (
        <button onClick={handleSave} className="save-button">
          Save Changes
        </button>
      ) : (
        <button onClick={handleEditClick} className="edit-button">
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
