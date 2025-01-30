import * as Customer from "../models/customer.js";
import formatDate from "../helpers/formatDate.js";
import findBuyerPhone from "../helpers/findBuyerPhone.js";
import axios from 'axios';

export const get = async (req, res) => {
	try {
    const { limit, page, search } = req.query;
    const { id, role } = req.user;

    let customers = [];

    if(+role.status === 1 || +role.status === 2 || +role.status === 5 || +role.status === 100) {
      customers = await Customer.get(limit, page, search, role.status, id);
    }

    if(+role.status === 10) {
      const phone = findBuyerPhone(+id);
      customers = await Customer.getForBuyers(limit, page, search, phone);
    }

    for (const customer of customers) {
      customer.time = customer.last_message_date ? formatDate(customer.last_message_date) : "";
      customer.name = customer.name || "";
      customer.avatar = customer.avatar || "";
      customer.counter = Number(customer.counter);
      customer.manager_name = customer.manager_name || "";
      customer.last_message_text = customer.last_message_text || "";
      customer.status = Number(customer.status);
    };

		res.status(200).send({ message: 'ok', customers });
	}	catch (err) {
		console.log("Error in get customer controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const updateFilteredOrder = async (req, res) => {
    try {
        const apiToken = 'kjsdaKRhlsrk0rjjekjskaaaaaaaa'; 
        const url = `https://talkcall-kz.leadvertex.ru/api/admin/getOrdersIdsByCondition.html`;
        const getInfoOrderUrl = `https://demo-1.leadvertex.ru/api/admin/getOrdersByIds.html?token=${apiToken}`
        const params = {
            token: apiToken,
            additional19: '><', 
            additional13: 'whatsapp-chat-gpt'
        };

        const response = await axios.get(url, { params });

        if (response.status === 200) {
            const orderIds = response.data;


            for (const order of orderIds) {
              const res = await axios.get(`${getInfoOrderUrl}&ids=${order}`)
              const orderInfo = res.data[order]
              const oldID = orderInfo['additional19']
              try {
                await Customer.updateOrderID(oldID, order)
                console.log(`oldID: ${oldID}, newID: ${order}`)
              } catch (error) {
                console.log(`${error} ${error.message}`)
              }
          }
        } else {
            return res.status(response.status).json({ success: false, message: 'Ошибка API LeadVertex' });
        }
    } catch (error) {
        console.error('Ошибка получения заказов:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
};
