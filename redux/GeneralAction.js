import StorageService from "./services/StorageService";


const types = {
  SET_IS_APP_LOADING: "SET_IS_APP_LOADING",
  SET_TOKEN: "SET_TOKEN",
  SET_FIRST_TIME_USE: "SET_FIRST_TIME_USE",
  SET_USER_DATA: "SET_USER_DATA",
};

const setIsAppLoading = (isAppLoading) => {
  return {
    type: types.SET_IS_APP_LOADING,
    payload: isAppLoading,
  };
};

const setToken = (token) => {
  return {
    type: types.SET_TOKEN,
    payload: token,
  };
};

const setIsFirstTimeUse = () => {
  return {
    type: types.SET_FIRST_TIME_USE,
    payload: false,
  };
};

const setUserData = (userData) => {
  return {
    type: types.SET_USER_DATA,
    payload: userData,
  };
};
const appStart = () => {
  return (dispatch) => {
    StorageService.getToken().then((token) => {
      if (token) {
        dispatch({
          type: types.SET_TOKEN,
          payload: token,
        });
        // console.log(token);
        // UserService.getUserData().then((userResponse) => {
        //   if (userResponse?.status) {
        //     dispatch({
        //       type: types.SET_USER_DATA,
        //       payload: userResponse?.data,
        //     });
        //     console.log(userResponse);
        //   }
        // });
      }
      dispatch({
        type: types.SET_IS_APP_LOADING,
        payload: false,
      });
    });
  };
};

export default {
  setIsAppLoading,
  setToken,
  setIsFirstTimeUse,
  appStart,
  setUserData,
  types,
};
