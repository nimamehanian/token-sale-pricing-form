import Rx from 'rxjs/Rx';

import {
  COMPUTE_FIELD,
  RECEIVE_FIELD_VALUE
} from './actionTypes';
import {
  areReagentsIncomputable,
  hashFields,
  paramsToFuncHash,
  paramsToOutputHash
} from '../../utils';

const receiveFieldValue = action => ({
  type: RECEIVE_FIELD_VALUE,
  ...action,
});

const computeFieldValueEpic = (action$, store) =>
  action$.ofType(COMPUTE_FIELD)
    .debounceTime(42)
    .switchMap(() => {
      const { pricingForm } = store.getState();
      const { editedFieldsHistory } = pricingForm;

      if (
        editedFieldsHistory.length < 2 ||
        areReagentsIncomputable(editedFieldsHistory)
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
