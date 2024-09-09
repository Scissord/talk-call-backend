import * as Column from '../../models/column.js';

export default async function differentColumns(
  sourceColumn,
  sourceIndex,
  sourceColumnId,
  destinationColumn,
  destinationIndex,
  cardId,
  destinationColumnId
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
};