// Set user and token to local storage
export const saveUserToken = (token, tokenType) => {
  localStorage.setItem("token", token);
  localStorage.setItem("tokenType", tokenType);
};
// Remove user and token from local storage
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
};

// Set user data to local storage
export const saveUserData = (user) => {
  localStorage.setItem("userData", JSON.stringify(user));
};
// Returns token - without Bearer prefix
export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const getUser = () => {
  return localStorage.getItem("userData");
};
