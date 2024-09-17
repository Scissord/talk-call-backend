import * as Column from '../../models/column.js';
import * as Customer from '../../models/customer.js';

export default async function differentColumns(
  sourceColumn,
  sourceIndex,
  sourceColumnId,
  destinationColumn,
  destinationIndex,
  cardId,
  destinationColumnId
) {
  const updatedSourceTaskIds = new Set(sourceColumn.cards_ids);
  updatedSourceTaskIds.delete(cardId);

  await Column.update(sourceColumnId, {
    cards_ids: Array.from(updatedSourceTaskIds),
  });

  const updatedDestinationTaskIds = new Set(destinationColumn.cards_ids);
  updatedDestinationTaskIds.add(cardId);

  await Column.update(destinationColumnId, {
    cards_ids: Array.from(updatedDestinationTaskIds),
  });

  await Customer.update(cardId, {
    manager_id: destinationColumn.manager_id,
  });
};