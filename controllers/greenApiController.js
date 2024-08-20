import * as Customer from "../models/customer.js";
import * as Conversation from "../models/conversation.js";
import * as Message from "../models/message.js";
import * as Attachment from "../models/attachment.js";

export const getIncomingMessages = async (req, res) => {
  const token = req.headers['authorization'];
  const verifyToken = token.startsWith('Bearer ') ? token.slice(7) : token;
  if(verifyToken === process.env.VERIFY_TOKEN && req.body.typeWebhook !== 'outgoingMessageStatus') {
    console.log("webhook >>", req.body);
    const customer_phone = req.body.senderData.sender;
    const customer_name = req.body.senderData.senderName;
    const text = req.body.messageData.textMessageData.textMessage;
    const isFile = req.body.messageData.typeMessage === "audioMessage" ||
      req.body.messageData.typeMessage === "videoMessage" ||
      req.body.messageData.typeMessage === "imageMessage" ||
      req.body.messageData.typeMessage === "documentMessage"
    const isLocation = req.body.messageData.typeMessage === "locationMessage";
    let link, name, type;
    if(isFile) {
      link = req.body.messageData.fileMessageData.downloadUrl;
      name = req.body.messageData.fileMessageData.fileName;
      type = req.body.messageData.typeMessage;
    };
    let lat, lon, thumb;
    if(isLocation) {
      lat = req.body.messageData.locationMessageData.latitude;
      lon = req.body.messageData.locationMessageData.longitude;
      thumb = req.body.messageData.locationMessageData.jpegThumbnail;
    };

    let customer = await Customer.findByPhone(customer_phone)
    if(!customer) {
      customer = await Customer.create({
        name: customer_name,
        phone: customer_phone,
        // avatar: customer_avatar,
      });
    };

    let conversation = await Conversation.findByCustomerId(customer.id);
    if(!conversation) {
      conversation = await Conversation.create({ customer_id: customer.id });
    };

    const message = await Message.create({
      conversation_id: conversation.id,
      incoming: true,
      text: !isFile ? text : '',
    });

    if(isFile) {
      await Attachment.create({
        message_id: message.id,
        link: link,
        name: name,
        contextType: type,
      });
    };

    if(isLocation) {
      await Attachment.create({
        message_id: message.id,
        contextType: type,
        lat,
        lon,
        thumb
      });
    };
  };

  return res.sendStatus(200);
};
