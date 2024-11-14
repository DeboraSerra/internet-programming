import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./config.js";

let app;

if (!firebase.getApps().length) {
  app = firebase.initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
