/** AUTHORIZATION */
export const getUserData = (state) => state.authentication.user;
export const getErrorMessages = (state) => state.authentication.errorMessages;
export const getLoadingState = (state) => state.authentication.isFetching;
