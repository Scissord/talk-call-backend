import * as Message from '../../models/message.js';

export default async function sendFileMessage(customer, files, conversation_id) {
  console.log(files);

  // const res = await axios({
  //   url: `${process.env.GREEN_API_URL}/waInstance${process.env.INSTANCE_ID}/sendMessage/${process.env.API_TOKEN_INSTANCE}`,
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: {
  //     chatId: customer.phone,
  //     message: message
  //   },
  // })

  let obj = null;
  // if(res.status === 200) {
  //   obj = await Message.create({
  //     conversation_id,
  //     text: message,
  //     incoming: false,
  //   });
  // };

  return obj;
};