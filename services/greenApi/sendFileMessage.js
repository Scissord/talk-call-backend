import * as Message from '../../models/message.js';
import * as Attachment from '../../models/attachment.js';

export default async function sendFileMessage(customer, file, conversation_id) {
  const url = process.env.URL + 'uploads/' + file.filename;

  const res = await axios({
    url: `${process.env.GREEN_API_URL}/waInstance${process.env.INSTANCE_ID}/sendFileByUrl/${process.env.API_TOKEN_INSTANCE}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      chatId: customer.phone,
      urlFile: url,
      fileName: file.originalname
    },
  })

  let obj = null;

  if(res.status === 200) {
    obj = await Message.create({
      conversation_id,
      text: "",
      incoming: false,
    });

    const attachment = await Attachment.create({
      message_id: obj.id,
      link: url,
      name: file.originalname,
      contentType: file.mimetype
    });

    obj.attachments = [attachment]
  };

  return obj;
};