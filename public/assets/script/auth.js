import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export const onLoadUser = async () => {
  const auth = getAuth();
  const test = auth.currentUser;
  const storageUser = localStorage.getItem("userData");
  try {
    if (storageUser) {
      const user = JSON.parse(storageUser);
      const response = await fetch(`/api/user?email=${user.email}`);
      const data = await response.json();
      return data.user;
    }
    return {};
  } catch (e) {
    console.log(e);
    return {};
  }
};

const createUser = async (user) => {
  const response = await fetch(`/api/user`, {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
    }),
  });
  if (response.status >= 400) throw new Error("");
  const foundUser = await response.json();
  localStorage.setItem("userData", JSON.stringify(foundUser.user));
  return foundUser;
};

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  try {
    const data = await signInWithPopup(auth, provider);
    let user = data.user;

    let response = await fetch(`/api/user?email=${user.email}`);
    let foundUser;
    if (response.status >= 400) {
      foundUser = await createUser(user);
    } else {
      foundUser = await response.json();
    }
    localStorage.setItem("userData", JSON.stringify(foundUser.user));
    return `/${foundUser.user.id}/dashboard`;
  } catch (error) {
    console.error(error);
    const user = auth.currentUser;
    user.delete();
  }
};

export const passwordLogin = async ({ email, password }) => {
  try {
    const data = await signInWithEmailAndPassword(getAuth(), email, password);
    let user = data.user;
    const response = await fetch(`/api/user?email=${user.email}`);
    const foundUser = await response.json();
    if (!foundUser)
      throw new Error("Email not registered or credentials invalid");
    localStorage.setItem("userData", JSON.stringify(foundUser.user));
    return `/${foundUser.user.id}/dashboard`;
  } catch (e) {
    console.log(e);
  }
};

export const createAccount = async ({ email, password }) => {
  try {
    const data = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    let user = data.user;
    const response = await createUser(user);
    if (!response) throw new Error("");
    return `/${response.user.id}/dashboard`;
  } catch (e) {
    console.log(e);
    const user = auth.currentUser;
    user.delete();
  }
};

export const logOut = async () => {
  try {
    await signOut(getAuth());
    localStorage.removeItem("userData");
    return "/";
  } catch (e) {
    console.log(e);
  }
};
