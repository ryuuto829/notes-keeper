/** AUTHORIZATION */
export const getUserData = (state) => state.authentication.user;
export const getErrorMessages = (state) => state.authentication.errorMessages;
export const getLoadingState = (state) => state.authentication.isFetching;


// const getLoggedUserId = (state) => state.auth;
// const getLoggedUser = (state) => getUsers(state)[getLoggedUserId(state)];