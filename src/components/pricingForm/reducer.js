import omit from 'lodash/omit';

import {
  UPDATE_PUBLIC_PRICE,
  UPDATE_GROUP_PRICE,
  UPDATE_BONUS,
  UPDATE_DISCOUNT,
  RECEIVE_FIELD_VALUE
} from './actionTypes';
import {
  distinctUntilChanged,
  lastEditedTuple,
  calcDiscountFromBonus,
  calcBonusFromDiscount
} from '../../utils';

const initialState = {
  publicPrice: '',
  groupPrice: '',
  bonus: '',
  discount: '',
  // Rolling history of last two edited fields:
  // We'll use this tuple to match it with the
  // corresponding function param signature,
  // in order to compute the appropriate third field
  editedFieldsHistory: [],
};

const pricingFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PUBLIC_PRICE:
      return {
        ...state,
        publicPrice: action.publicPrice,
        editedFieldsHistory: lastEditedTuple(distinctUntilChanged(state.editedFieldsHistory, 'publicPrice')),
      };
    case UPDATE_GROUP_PRICE:
      return {
        ...state,
        groupPrice: action.groupPrice,
        editedFieldsHistory: lastEditedTuple(distinctUntilChanged(state.editedFieldsHistory, 'groupPrice')),
      };
    case UPDATE_BONUS:
      return {
        ...state,
        bonus: action.bonus,
        discount: `${calcDiscountFromBonus(action.bonus)}` || '',
        editedFieldsHistory: lastEditedTuple(distinctUntilChanged(state.editedFieldsHistory, 'bonus')),
      };
    case UPDATE_DISCOUNT:
      return {
        ...state,
        discount: action.discount,
        bonus: `${calcBonusFromDiscount(action.discount)}` || '',
        editedFieldsHistory: lastEditedTuple(distinctUntilChanged(state.editedFieldsHistory, 'discount')),
      };
    case RECEIVE_FIELD_VALUE:
      return {
        ...state,
        // key name, here, is dynamic—it may be any of the four fields—
        // so we can't explicitly select it. So we remove `type`, and destructure.
        ...omit(action, ['type']),
      };
    default:
      return state;
  }
};

export default pricingFormReducer;
