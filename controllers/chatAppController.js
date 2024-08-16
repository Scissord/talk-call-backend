import axios from "axios";
import * as Customer from "../models/customer.js";
import * as Conversation from "../models/conversation.js";
import * as Message from "../models/message.js";
import * as Attachment from "../models/attachment.js";

export const register = async (req, res) => {
  console.log('starting to register webhook');

  // IF YOU NEED LICENSE_ID USE THIS TO COLLECT INFO
  // await axios({
  //   method: 'GET',
  //   url: "https://api.chatapp.online/v1/licenses",
  //   headers: {
  //     "Authorization": process.env.WEBHOOK_ACCESS_TOKEN,
  //     "Lang": "en",
  //     "Accept": "application/json",
  //   },
  // }).then(res => {
  //   if(res.data.success === true) {
  //     console.log(res.data.data);
  //     console.log(res.data.data[1].messenger);
  //   };
  // })

  await axios({
    method: 'PUT',
    url: "https://api.chatapp.online/v1/licenses/51426/messengers/caWhatsApp/callbackUrl",
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

  console.log(req.body.data[0].message);
  console.log(req.body.data[0].fromUser);
  console.log(req.body.data[0].chat);

  const customer_name = req.body.data[0].fromUser.name;
  const customer_phone = req.body.data[0].fromUser.phone;
  const customer_avatar = req.body.data[0].chat.image;
  const text = req.body.data[0].message.text;
  const file = req.body.data[0].message.file;

  let customer = await Customer.findByPhone(customer_phone)
  if(!customer) {
    customer = await Customer.create({
      name: customer_name,
      phone: customer_phone,
      avatar: customer_avatar,
    });
  };

  let conversation = await Conversation.findByCustomerId(customer.id);
  if(!conversation) {
    conversation = await Conversation.create({ customer_id: customer.id });
  };

  const message = await Message.create({
    conversation_id: conversation.id,
    incoming: true,
    text,
  });

  // if(file) {
  //   await Attachment.create({
  //     message_id: message.id,
  //     type: attachment.type,
  //     url: attachment.url,
  //     size: attachment.filesize,
  //   });
  // };

  return res.sendStatus(200);
};
