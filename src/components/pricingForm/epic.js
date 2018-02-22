import Rx from 'rxjs/Rx';

import {
  COMPUTE_FIELD,
  RECEIVE_FIELD_VALUE,
  CASCADE_UPDATE_BONUS_AND_DISCOUNT
} from './actionTypes';
import {
  areReagentsIncomputable,
  hashFields,
  paramsToFuncHash,
  paramsToOutputHash
} from '../../utils';

const receiveFieldValue = action => (
  action.bonus ?
    { type: CASCADE_UPDATE_BONUS_AND_DISCOUNT, bonus: action.bonus } :
    { type: RECEIVE_FIELD_VALUE, ...action }
);

const computeFieldValueEpic = (action$, store) =>
  action$.ofType(COMPUTE_FIELD)
    .debounceTime(20)
    .switchMap(() => {
      const { pricingForm } = store.getState();
      const { editedFieldsHistory } = pricingForm;

      if (
        editedFieldsHistory.length < 2 ||
        areReagentsIncomputable(editedFieldsHistory) ||
        // Prevent calculation if we type into a field and then delete value
        !pricingForm[editedFieldsHistory[0]].length ||
        !pricingForm[editedFieldsHistory[1]].length
      ) {
        return Rx.Observable.from(['']).ignoreElements();
      }

      const method = paramsToFuncHash[hashFields(editedFieldsHistory)];
      const paramsHash = {
        [editedFieldsHistory[0]]: pricingForm[editedFieldsHistory[0]],
        [editedFieldsHistory[1]]: pricingForm[editedFieldsHistory[1]],
      };
      const outputHash = {
        [paramsToOutputHash[hashFields(editedFieldsHistory)]]: method(paramsHash).toString(),
      };

      // Uncomment to see logs. Or install ReduxDevTools
      // console.log('😛', editedFieldsHistory);
      // console.log('// =>', outputHash);

      return Rx.Observable.from([''])
        .map(() => receiveFieldValue(outputHash));
    });

export default computeFieldValueEpic;
