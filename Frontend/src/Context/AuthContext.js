import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeaders, getAuthToken, removeAuthToken, isAuthenticated } from "../utils/authUtils";

export const AuthContext = React.createContext();

const AuthContextProvider = props => {

  const [activeUser, setActiveUser] = useState({})
  const [config, setConfig] = useState({
    headers: getAuthHeaders()
  })

  useEffect(() => {
    // Update config when component mounts
    setConfig({
      headers: getAuthHeaders()
    });
  }, []);

  useEffect(() => {
    const controlAuth = async () => {
      if (!isAuthenticated()) {
        setActiveUser({});
        return;
      }

      try {
        const { data } = await axios.get("/auth/private", {
          headers: getAuthHeaders()
        });
        setActiveUser(data.user)
      }
      catch (error) {
        console.error("Auth check failed:", error.response?.data?.error || error.message);
        removeAuthToken();
        setActiveUser({})
        setConfig({
          headers: getAuthHeaders()
        });
      }
    };
    controlAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, config, setConfig }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
