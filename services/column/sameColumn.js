import * as Column from '../../models/column.js';
import * as Customer from '../../models/customer.js';

export default async function sameColumn(
  sourceColumn,
  sourceIndex,
  destinationIndex,
  cardId,
  sourceColumnId
) {
  const updatedSourceTaskIds = new Set(sourceColumn.cards_ids);

  const tempArray = Array.from(updatedSourceTaskIds);
  tempArray.splice(sourceIndex, 1);
  tempArray.splice(destinationIndex, 0, cardId);

  await Column.update(sourceColumnId, {
    cards_ids: Array.from(new Set(tempArray)),
  });
};