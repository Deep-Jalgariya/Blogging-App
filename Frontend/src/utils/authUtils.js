// Utility functions for authentication
export const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  return token && token !== 'null' && token !== 'undefined' ? token : null;
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    return {
      "Content-Type": "application/json"
    };
  }
  
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`
  };
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};