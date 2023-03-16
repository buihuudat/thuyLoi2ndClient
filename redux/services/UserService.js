import { userAPI } from "../../api/userAPI";
import { authHeader } from "../../utlis/Generator";
import { useEffect, useState } from "react";
import StorageService from "./StorageService";
import { useDispatch } from "react-redux";
import GeneralAction from "../GeneralAction";

const getUserData = async () => {

  // console.log(`UserService | getUserData`);
  try {
    // let userResponse = await userAPI.gets({
    //   headers: authHeader(token),
    // });

    // if (userResponse?.status === 200) {
    //   return {
    //     status: true,
    //     message: `User data fetched`,
    //     data: userResponse?.data,
    //   };
    // } else {
    //   return {
    //     status: false,
    //     message: `User data not found`,
    //   };
    // }
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : `User data not found`,
    };
  }
};

export default { getUserData };
