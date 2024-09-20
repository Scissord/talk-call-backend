import * as Column from '../../models/column.js';
import * as Customer from '../../models/customer.js';

export default async function differentColumns(
  sourceColumn,
  sourceIndex,
  sourceColumnId,
  destinationColumn,
  destinationIndex,
  cardId,
  destinationColumnId,
  status
) {
  const updatedSourceTaskIds = Array.from(sourceColumn.cards_ids);
  updatedSourceTaskIds.splice(sourceIndex, 1);

  await Column.update(sourceColumnId, {
    cards_ids: updatedSourceTaskIds,
  })

  const updatedDestinationTaskIds = Array.from(destinationColumn.cards_ids);
  updatedDestinationTaskIds.splice(destinationIndex, 0, cardId);

  await Column.update(destinationColumnId, {
    cards_ids: updatedDestinationTaskIds,
  });

  await Customer.update(cardId, {
    manager_id: destinationColumn.manager_id,
  });

  const cachedBoard = await redisClient.get(`board_${status}`);

  if (cachedBoard) {
    const boardData = JSON.parse(cachedBoard);

    boardData.columns[sourceColumnId].cardsIds = updatedSourceTaskIds;
    boardData.columns[destinationColumnId].cardsIds = updatedDestinationTaskIds;

    boardData.cards[cardId].manager_id = destinationColumn.manager_id;

    await redisClient.setEx(`board_${status}`, 3600, JSON.stringify(boardData));
  };
};