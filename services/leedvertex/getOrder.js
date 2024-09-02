import axios from 'axios';
import * as Message from '../../models/message.js';
import * as Attachment from '../../models/attachment.js';

export default async function getOrder(order_id, text) {
  const res = await axios({
    method: 'GET',
    url: `https://call-center1.leadvertex.ru/admin/page/api.html#getOrdersByIds.html?token=${process.env.LEADVERTEX_API_KEY}&ids=${order_id}`,
  })

  if(res.status === 200) {
    console.log(res.data);
  };


  // let obj = null;

  // if(res.status === 200) {
  //   obj = await Message.create({
  //     user_id,
  //     customer_id,
  //     text: "",
  //     incoming: false,
  //   });

  //   const attachment = await Attachment.create({
  //     message_id: obj.id,
  //     link: url,
  //     name: file.originalname,
  //     contentType: file.mimetype
  //   });

  //   obj.attachments = [attachment]
  // };

  // return obj;
  return;
};
