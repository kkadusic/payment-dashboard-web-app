// Set user and token to local storage
export const loginUser = (token, tokenType, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenType', tokenType);
    localStorage.setItem('user', userName);

}
// Remove user and token from local storage
export const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

