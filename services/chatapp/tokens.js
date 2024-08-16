import axios from "axios";
import * as UserToken from '../../models/user_token.js';

export const makeTokens = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://api.chatapp.online/v1/tokens",
      headers: {
        "Lang": "en",
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      data: {
        email: email,
        password: password,
        appId: process.env.CHAT_APP_APP_ID,
      },
    });

    const { success, data } = res.data;

    if (success === true) {
      return data;
    } else {
      throw new Error("Failed to retrieve tokens.");
    }
  } catch (error) {
    console.error("Error making tokens:", error);
    return null;
  }
};

export const checkTokens = async (accessToken) => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://api.chatapp.online/v1/tokens/check",
      headers: {
        "Lang": "en",
        "Accept": "application/json",
        "Authorization": accessToken,
      },
    });

    if (res.data.success === true) {
      return true;
    } else {
      return false;
    };
  } catch (error) {
    console.error("Error making tokens:", error);
    return null;
  }
};

export const refreshTokens = async (user_id, refreshToken) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://api.chatapp.online/v1/tokens/refresh",
      headers: {
        "Lang": "en",
        "Refresh": refreshToken,
        "Accept": "application/json",
      },
    });

    const { success, data } = res.data;

    if (success === true) {
      await UserToken.update(user_id, {
        cabinetUserId: data.cabinetUserId,
        token: data.refreshToken,
        expires_at: data.refreshTokenEndTime
      })
      return data;
    } else {
      throw new Error("Failed to retrieve tokens.");
    }
  } catch (error) {
    console.error("Error making tokens:", error);
    return null;
  }
};
