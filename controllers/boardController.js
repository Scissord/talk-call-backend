import * as Column from "../models/column.js";
import * as Customer from "../models/customer.js";
import * as Card from "../models/card.js";

export const getBoard = async (req, res) => {
  try {
    const { role } = req.user;

    const columnsFromDb = await Column.get(role.status);
    const cardsFromDb = await Customer.getForBoard(role.status);

    const columns = {};
    const cards = {};
    const order = [];

    columnsFromDb.forEach(column => {
      columns[column.id] = {
        id: column.id,
        title: column.title,
        cardsIds: column.cards_ids,
      };
      order.push(column.id);
    });

    cardsFromDb.forEach(card => {
      cards[card.id] = {
        id: card.id,
        name: card.name,
        avatar: card.avatar,
        good: card.good,
        order_id: card.order_id,
        manager_id: card.manager_id
      };
    });

    res.status(200).send({
      columns,
      cards,
      order,
    });
  } catch (err) {
    console.log("Error in getBoard boardController", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
