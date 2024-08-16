import axios from "axios";
import * as Customer from "../models/customer.js";
import * as Conversation from "../models/conversation.js";
import * as Message from "../models/message.js";
import * as Attachment from "../models/attachment.js";

export const register = async (req, res) => {
  console.log('starting to register webhook');

  await axios({
    method: 'PUT',
    url: "https://api.chatapp.online/v1/licenses/51426/messengers/grWhatsApp/callbackUrl",
    headers: {
      "Authorization": process.env.WEBHOOK_ACCESS_TOKEN,
      "Lang": "en",
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    data: {
      "events": [
        "message",
        "messageStatus"
      ],
      "url": "https://restrain.pw/api/chatapp/get_incoming_messages",
    },
  }).then(res => {
    if(res.data.success === true) {
      console.log('webhook registered successfully');
    };
  })

  res.sendStatus(200);
};

export const getIncomingMessages = async (req, res) => {
  console.log(req.body);
};
