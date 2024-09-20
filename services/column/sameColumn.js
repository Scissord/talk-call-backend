import * as Column from '../../models/column.js';

export default async function sameColumn(
  sourceColumn,
  sourceIndex,
  destinationIndex,
  cardId,
  sourceColumnId,
  status
) {
  const updatedSourceTaskIds = Array.from(sourceColumn.cards_ids);
  updatedSourceTaskIds.splice(sourceIndex, 1);
  updatedSourceTaskIds.splice(destinationIndex, 0, cardId);

  await Column.update(sourceColumnId, {
    cards_ids: updatedSourceTaskIds,
  });

  const cachedBoard = await redisClient.get(`board_${status}`);

  if (cachedBoard) {
    const boardData = JSON.parse(cachedBoard);

    boardData.columns[sourceColumnId].cardsIds = updatedSourceTaskIds;

    await redisClient.setEx(`board_${status}`, 3600, JSON.stringify(boardData));
  };
};