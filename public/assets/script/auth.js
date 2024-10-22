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
  let url;
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const response = await fetch(`/api/user?email=${user.email}`);
      const data = await response.json();
      return data.user ? (url = `/${data.user.id}/dashboard`) : "/";
    }
  } catch (e) {
    console.log(e);
  }
};

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  try {
    const data = await signInWithPopup(auth, provider);
    let user = data.user;

    let response = await fetch(`/api/user?email=${user.email}`);
    if (!response.status >= 400) {
      response = await fetch(`/api/user`, {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
      });
    }
    const foundUser = await response.json();
    return `/${foundUser.user.id}/dashboard`;
  } catch (error) {
    console.error(error);
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
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
      }),
    });
    const foundUser = await response.json();
    if (!foundUser) throw new Error("");
    return `/${foundUser.user.id}/dashboard`;
  } catch (e) {
    console.log(e);
  }
};

export const logOut = async () => {
  try {
    await signOut(getAuth());
    return "/";
  } catch (e) {
    console.log(e);
  }
};
