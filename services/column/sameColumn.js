import * as Column from '../../models/column.js';
import * as Customer from '../../models/customer.js';

export default async function sameColumn(
  sourceColumn,
  sourceIndex,
  destinationIndex,
  cardId,
  sourceColumnId
) {
  const updatedSourceTaskIds = Array.from(sourceColumn.cards_ids);
  updatedSourceTaskIds.splice(sourceIndex, 1);
  updatedSourceTaskIds.splice(destinationIndex, 0, cardId);

  await Column.update(sourceColumnId, {
    cards_ids: updatedSourceTaskIds,
  });

  console.log(cardId);
  // await Customer.update()
};