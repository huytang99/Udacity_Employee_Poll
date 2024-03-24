export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT = "LOGOUT";

export const logout = () => ({
  type: LOGOUT,
});

export const setAuthedUser = (authedUser) => ({
  type: SET_AUTHED_USER,
  authedUser,
});

export const handleLogin = (username, password) => (dispatch, getState) => {
  const { users } = getState();

  const user = Object.values(users).find(
    (user) => user.id === username && user.password === password
  );

  if (user) {
    return dispatch(setAuthedUser(user));
  }
};

export const handleLogout = () => (dispatch) => {
  return dispatch(logout());
};
