import * as Column from "../models/column.js";
import * as Card from "../models/card.js";
import * as CardItem from "../models/card_item.js";
import sameColumn from "../services/column/sameColumn.js";
import differentColumns from "../services/column/differentColumns.js";

export const getCard = async (req, res) => {
  try {
    const { card_id } = req.params;
    const card = await Card.find(card_id);

    res.status(200).send(card);
  } catch (err) {
    console.log("Error in getCard boardController", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const createCard = async (req, res) => {
  try {
    const column_id = req.params.column_id;
    const { price, source_id, client_id, products } = req.body;

    const card = await Card.create({
      price,
      source_id,
      client_id,
      column_id,
      creator_id: req.user.id
    });

    const column = await Column.find(column_id);
    const cards_ids = Array.isArray(column.cards_ids) ? [...column.cards_ids, card.id] : [card.id];
    await Column.update(column.id, { cards_ids });

    for(const id of products) {
      await CardItem.create({
        card_id: card.id,
        product_id: id
      });
    };

    res.status(200).send({ message: "ok" });
  } catch (err) {
    console.log("Error in createCard boardController", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const card_id = req.params.card_id;
    const { column_id } = req.body;

    const column = await Column.find(column_id);
    const cards_ids = column.cards_ids.filter((id) => id !== card_id);
    await Column.update(column.id, { cards_ids });

    await Card.softDelete(card_id);

    res.status(200).send({ message: "ok" });
  } catch (err) {
    console.log("Error in deleteCard boardController", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const moveCard = async (req, res) => {
  const { status } = req.user.role;
  const { cardId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = req.body;

  try {
    const sourceColumn = await Column.find(sourceColumnId);
    const destinationColumn = await Column.find(destinationColumnId);

    if (!sourceColumn || !destinationColumn) {
      return res.status(404).send({ error: 'Column not found' });
    }

    if (sourceColumnId === destinationColumnId) {
      sameColumn(
        sourceColumn,
        sourceIndex,
        destinationIndex,
        cardId,
        sourceColumnId,
        status
      );
    } else {
      differentColumns(
        sourceColumn,
        sourceIndex,
        sourceColumnId,
        destinationColumn,
        destinationIndex,
        cardId,
        destinationColumnId,
        status
      );
    }

    res.status(200).send({ message: "Card moved successfully" });
  } catch (err) {
    console.log("Error in moveCard boardController", err.message);
    res.status(400).send({ error: "Invalid request payload" });
  }
};
