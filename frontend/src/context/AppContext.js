import React, { createContext, useState, useEffect, useCallback } from 'react';
import localforage from "localforage";
import { APP_CONTEXT } from "../constants/localKeys";

const initData = {
  isLoggedIn: false,
  isRegistered: false,
  toggleNavbar: () => {},
  setEscapeOverflow: () => {},
  setInitLoading: () => {},
  setScreenLoading: () => {},
  handleLogin: () => {},
  handleRegister: () => {},
  handleLogout: () => {},
};

export const AppCtx = createContext(initData);

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState(initData);

  const toggleNavbar = useCallback(() => {
    setState((prev) => {
      const updateData = {
        ...prev,
        showNavbar: !prev?.showNavbar,
      };

      const { darkTheme, initLoading, showNavbar } = updateData;
      localforage.setItem(APP_CONTEXT, { darkTheme, initLoading, showNavbar });
      return updateData;
    });
  }, []);

  const setInitLoading = useCallback((boolean) => {
    setState((prev) => ({
      ...prev,
      initLoading: boolean,
    }));
  }, []);

  const setScreenLoading = useCallback((boolean) => {
    setState((prev) => ({
      ...prev,
      screenLoading: boolean,
    }));
  }, []);

  const setEscapeOverflow = useCallback((boolean) => {
    setState((prev) => ({ ...prev, escapeOverflow: boolean }));
  }, []);

  const handleRegister = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRegistered: true,
    }));
    localStorage.setItem('isRegistered', 'true');
  }, []);

  const handleLogin = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isLoggedIn: true,
    }));
    localStorage.setItem('isLoggedIn', 'true');
  }, []);

  const handleLogout = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isLoggedIn: false,
      isRegistered: false,
    }));
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isRegistered');
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isRegistered = localStorage.getItem('isRegistered') === 'true';
    setState((prev) => ({
      ...prev,
      isLoggedIn,
      isRegistered,
    }));
  }, []);

  return (
    <AppCtx.Provider
      value={{
        ...state,
        handleLogin,
        handleRegister,
        handleLogout,
        toggleNavbar,
        setInitLoading,
        setScreenLoading,
        setEscapeOverflow
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};

export const useAppContext = () => React.useContext(AppCtx);
