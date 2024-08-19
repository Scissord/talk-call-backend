import axios from "axios";
import * as Customer from "../models/customer.js";
import * as Conversation from "../models/conversation.js";
import * as Message from "../models/message.js";
import * as Attachment from "../models/attachment.js";

export const getIncomingMessages = async (req, res) => {
  console.log(req.body);
  const verifyToken = req.headers['authorization']
  console.log(verifyToken)
  // if(verifyToken === process.env.VERIFY_TOKEN) {

  // };

  // let customer = await Customer.findByPhone(customer_phone)
  // if(!customer) {
  //   customer = await Customer.create({
  //     name: customer_name,
  //     phone: customer_phone,
  //     avatar: customer_avatar,
  //   });
  // };

  // let conversation = await Conversation.findByCustomerId(customer.id);
  // if(!conversation) {
  //   conversation = await Conversation.create({ customer_id: customer.id });
  // };

  // const message = await Message.create({
  //   conversation_id: conversation.id,
  //   incoming: true,
  //   text,
  // });

  // if(file) {
  //   await Attachment.create({
  //     message_id: message.id,
  //     link: file.link,
  //     name: file.name,
  //     contentType: file.contentType,
  //   });
  // };

  return res.sendStatus(200);
};
