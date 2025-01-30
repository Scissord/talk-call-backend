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
        const ordersUrl = `https://talkcall-kz.leadvertex.ru/api/admin/getOrdersIdsByConditionSearchAfter.html`;
        const orderInfoUrl = `https://demo-1.leadvertex.ru/api/admin/getOrdersByIds.html?token=${apiToken}`;

        let allOrderIds = [];
        let searchAfter = ""; // Начинаем без searchAfter

        // 🔹 1. Получаем заказы порциями
        while (true) {
            const params = {
                token: apiToken,
                additional19: '><',  // Фильтр на НЕ пустые значения
                additional13: 'whatsapp-chat-gpt'
            };
            
            if (searchAfter) {
                params.searchAfter = searchAfter; // Передаем searchAfter, если он есть
            }

            const response = await axios.get(ordersUrl, { params });

            if (response.status === 200) {
                const data = response.data;

                if (!data.ids || data.ids.length === 0) break; // Если заказов больше нет, выходим из цикла

                allOrderIds.push(...data.ids); // Добавляем найденные заказы

                searchAfter = data.searchAfter; // Запоминаем новый searchAfter

                if (!searchAfter) break; // Если searchAfter больше нет, выходим из цикла
            } else {
                return res.status(response.status).json({ success: false, message: 'Ошибка API LeadVertex' });
            }
        }

        console.log(`🔹 Найдено заказов: ${allOrderIds.length}`);

        // 🔹 2. Запрашиваем детали заказов
        for (const orderId of allOrderIds) {
            try {
                const res = await axios.get(`${orderInfoUrl}&ids=${orderId}`);
                const orderInfo = res.data[orderId]; 

                if (!orderInfo) {
                    console.log(`⚠️ Ошибка: заказ ${orderId} не найден в API LeadVertex`);
                    continue;
                }

                const oldID = orderInfo['additional19']; 

                if (oldID) {
                    await Customer.updateOrderID(oldID, orderId);
                    console.log(`✅ Заказ обновлен: oldID=${oldID}, newID=${orderId}`);
                } else {
                    console.log(`⚠️ У заказа ${orderId} нет additional19`);
                }
            } catch (error) {
                console.error(`❌ Ошибка при обработке заказа ${orderId}:`, error.message);
            }
        }

        return res.json({ success: true, ordersProcessed: allOrderIds.length });

    } catch (error) {
        console.error('❌ Ошибка получения заказов:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
};

