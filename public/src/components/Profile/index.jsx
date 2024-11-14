"use client";

import constants from "@/script/constants";
import { useState } from "react";
import Input from "../ControlledInput"
import "./profile.css";

const getUserUrl = constants.USER_URL + `?email=jfsnow00@gmail.com`; // method: GET
const updateUserUrl = constants.USER_URL + `?id=673544e9acc052f5aa69184d`; // method: PUT

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Anna Avetisyan",
    birthday: "2000-01-01",
    phone: "818 123 4567",
    email: "info@techtide.co",
    password: "123456",
    photo: "https://cdnstorage.sendbig.com/unreal/female.webp",
  });

  const [editMode, setEditMode] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Função para buscar os dados do usuário
    const fetchUserData = async () => {
      try {
        const response = await fetch(getUserUrl); // Chama o backend
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do perfil");
        }
        const data = await response.json();
        setProfile(data.user); // Atualiza o estado com os dados do perfil
      } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
      }
    };

    fetchUserData();
  }, []); // Executa uma vez ao carregar o componente

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

  const handleSaveProfile = async () => {
    // Lógica para salvar as alterações do perfil
    const response = await fetch(updateUserUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile), // Envia os dados atualizados do perfil
    });

    if (response.ok) {
      alert("Perfil atualizado com sucesso!");
      setEditMode(false);
    } else {
      alert("Erro ao atualizar perfil!");
    }
  };

  const handleSavePassword = () => {
    // Validação de senha
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Por favor, preencha todos os campos de senha!");
      return;
    }

    if (passwordData.oldPassword !== profile.password) {
      alert("A senha antiga está incorreta!");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("A nova senha e a confirmação não coincidem!");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("A nova senha deve ter pelo menos 8 caracteres!");
      return;
    }
    setProfile((prevProfile) => ({
      ...prevProfile,
      password: passwordData.newPassword,
    }));

    // Limpa os dados da senha
    setIsChangingPassword(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    alert("Senha alterada com sucesso!");
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
        <img src={profile.photo} alt='Profile' className='profile-picture' />
        <h2>{profile.name}</h2>
      </div>

      {!isChangingPassword && (
        <>
          <div className='profile-info'>
            <div className='profile-field'>
              {editMode ? (
                <Input
                  id='name'
                  label='User Name'
                  value={profile.name}
                  onChange={handleChange}
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
          <Input
            id='oldPassword'
            label='Old Password'
            type='password'
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
          />
          <Input
            id='newPassword'
            label='New Password'
            type='password'
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
          <Input
            id='confirmPassword'
            label='Confirm Password'
            type='password'
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
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
