import { useReducer, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { authReducer } from "../reducers";
import { authTypes } from "../types";

const initialState = { logged: false };

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  const login = async (username, password) => {
    const response = await axios.post("http://localhost:3000/api/login", {
      username,
      password,
    });

    if (!response.ok) {
      const payload = { username, password };

      const action = { type: authTypes.login, payload };

      localStorage.setItem("user", JSON.stringify(payload));

      dispatch(action);

      return true;
    }
  };

  const loginGoogle = async () => {
    const {
      ok,
      uid,
      photoURL,
      displayName,
      email: googleEmail,
      errorMessage,
    } = await singInWithGoogle();

    if (!ok) {
      dispatch({ type: authTypes.error, payload: { errorMessage } });
      return false;
    }

    const payload = { uid, googleEmail, photoURL, displayName };

    const action = { type: authTypes.login, payload };

    localStorage.setItem("user", JSON.stringify(payload));

    dispatch(action);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: authTypes.logout });
  };

  const register = async (email, password, name, lastName, username) => {
    const { ok } = await axios.post("http://localhost:3000/api/register", {
      name,
      lastName,
      username,
      email,
      password,
    });

    const payload = {
      email,
      name,
      password,
      lastName,
      username,
    };
    const action = { type: authTypes.login, payload };
    localStorage.setItem("user", JSON.stringify(payload));

    dispatch(action);

    return ok;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        loginGoogle,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
