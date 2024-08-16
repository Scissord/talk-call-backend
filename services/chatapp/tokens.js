import axios from "axios";

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

    console.log(success, data);

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
