import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { authLogOut, authStateChange, updateUserProfile } from "./authSlice";

export const register =
  (login, email, password, avatar) => async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: login,
        photoURL: avatar,
      });

      const updatedUser = auth.currentUser;

      const userUpdateData = {
        userId: updatedUser.uid,
        login: updatedUser.displayName,
        email: updatedUser.email,
        avatar: updatedUser.photoURL,
      };

      dispatch(updateUserProfile(userUpdateData));
      console.log(user);
      return user;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

export const login = (email, password) => async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const authStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateData = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(authStateChange({ isLoginIn: true }));
      dispatch(updateUserProfile(userUpdateData));
    }
  });
};

export const logout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(authLogOut());
};

export const updateUserAvatar = (dbAvatar) => async (dispatch) => {
  try {
    await updateProfile(user, {
      photoURL: dbAvatar,
    });

    const updatedUser = auth.currentUser;

    const userUpdateData = {
      userId: updatedUser.uid,
      login: updatedUser.displayName,
      email: updatedUser.email,
      avatar: updatedUser.photoURL,
    };

    dispatch(updateUserProfile(userUpdateData));
    return user;
  } catch (error) {
    console.log(error.message);
  }
};
