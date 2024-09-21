import * as Column from "../models/column.js";
import * as Customer from "../models/customer.js";
import findProduct from "../helpers/findProduct.js";
import formatDate from "../helpers/formatDate.js";
import redisClient from "../services/redis/redis.js";

export const getBoard = async (req, res) => {
  try {
    const { status } = req.user.role;

    // const cachedBoard = await redisClient.get(`board_${status}`);
    // if (cachedBoard) {
    //   return res.status(200).send(JSON.parse(cachedBoard));
    // };

    const columnsFromDb = await Column.get(status);
    const cardsFromDb = await Customer.getForBoard(status);

    const columns = {};
    const cards = {};
    const order = [];

    columnsFromDb.forEach(column => {
      columns[column.id] = {
        id: column.id,
        title: column.title,
        cardsIds: column.cards_ids,
        manager_id: column.manager_id,
        status: column.status
      };
      order.push(column.id);
    });

    for (const card of cardsFromDb) {
      card.path = findProduct(+card.good);
      card.time = formatDate(card.created_at);

      cards[card.id] = {
        id: card.id,
        name: card.name,
        avatar: card.avatar,
        good: card.good,
        order_id: card.order_id,
        manager_id: card.manager_id,
        text: card.text,
        path: card.path,
        time: card.time
      };
    };

    const boardData = {
      columns,
      cards,
      order,
    };

    // await redisClient.setEx(`board_${status}`, 3600, JSON.stringify(boardData));

    res.status(200).send(boardData);
  } catch (err) {
    console.log("Error in getBoard boardController", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
