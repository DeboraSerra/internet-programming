import toastEmitter, {
  TOAST_EMITTER_KEY,
} from "@/components/Toast/toastEmitter";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
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
  const { email, displayName, photoURL, phone = "", birthday = "" } = user;
  const response = await fetch(`/api/user`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      name: displayName ?? "",
      photo: photoURL ?? "",
      phone,
      birthday,
    }),
  });
  if (response.status >= 400) {
    const result = await response?.json();
    if (result.error) {
      result.error.forEach((it) => {
        toastEmitter.emit(TOAST_EMITTER_KEY, it.message);
      });
    }
  }
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
    toastEmitter.emit(TOAST_EMITTER_KEY, "Login successful");
    return `/${foundUser.user.id}/dashboard`;
  } catch (error) {
    console.error(error);
    const user = auth.currentUser;
    user.delete();
    toastEmitter.emit(TOAST_EMITTER_KEY, "Something went wrong");
  }
};

export const passwordLogin = async ({ email, password }) => {
  try {
    const data = await signInWithEmailAndPassword(getAuth(), email, password);
    let user = data.user;
    const response = await fetch(`/api/user?email=${user.email}`);
    const foundUser = await response.json();
    if (!foundUser) {
      toastEmitter.emit(
        TOAST_EMITTER_KEY,
        "Email not registered or credentials invalid"
      );
      return;
    }
    localStorage.setItem("userData", JSON.stringify(foundUser.user));
    toastEmitter.emit(TOAST_EMITTER_KEY, "Login successful");
    return `/${foundUser.user.id}/dashboard`;
  } catch (e) {
    console.log(e);
    if (e.message.includes("(auth/invalid-credential)")) {
      toastEmitter.emit(TOAST_EMITTER_KEY, "Email or password is wrong");
    } else toastEmitter.emit(TOAST_EMITTER_KEY, "Something went wrong");
  }
};

export const createAccount = async (userData) => {
  const { email, password } = data
  try {
    await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    const response = await createUser(userData);
    if (!response) throw new Error("");
    toastEmitter.emit(TOAST_EMITTER_KEY, "Login successful");
    return `/${response.user.id}/dashboard`;
  } catch (e) {
    console.log(e);
    if (e.message.includes("(auth/email-already-in-use)")) {
      toastEmitter.emit(TOAST_EMITTER_KEY, "Email already in use");
    } else {
      toastEmitter.emit(TOAST_EMITTER_KEY, "Something went wrong");
      const user = auth.currentUser;
      user.delete();
    }
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

export const updateUserPassword = async (newPassword) => {
  const auth = getAuth();

  const user = auth.currentUser;

  try {
    await updatePassword(user, newPassword);
    return true;
  } catch (error) {
    toastEmitter.emit(
      TOAST_EMITTER_KEY,
      `Error updating password: ${error.message}`
    );
    return false;
  }
};

export const resetPassword = async (email) => {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
}
