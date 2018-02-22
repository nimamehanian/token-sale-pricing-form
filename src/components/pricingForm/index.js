import { connect } from 'react-redux';

import {
  UPDATE_PUBLIC_PRICE,
  UPDATE_GROUP_PRICE,
  UPDATE_BONUS,
  UPDATE_DISCOUNT,
  COMPUTE_FIELD
} from './actionTypes';
import PricingForm from './pricingForm';

const mapStateToProps = state => ({
  publicPrice: state.pricingForm.publicPrice,
  groupPrice: state.pricingForm.groupPrice,
  bonus: state.pricingForm.bonus,
  discount: state.pricingForm.discount,
});

const mapDispatchToProps = dispatch => ({
  updatePublicPrice(publicPrice) {
    dispatch({ type: UPDATE_PUBLIC_PRICE, publicPrice });
    dispatch({ type: COMPUTE_FIELD });
  },

  updateGroupPrice(groupPrice) {
    dispatch({ type: UPDATE_GROUP_PRICE, groupPrice });
    dispatch({ type: COMPUTE_FIELD });
  },

  updateBonus(bonus) {
    dispatch({ type: UPDATE_BONUS, bonus });
    dispatch({ type: COMPUTE_FIELD });
  },

  updateDiscount(discount) {
    dispatch({ type: UPDATE_DISCOUNT, discount });
    dispatch({ type: COMPUTE_FIELD });
  },
});

const PricingFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PricingForm);

export default PricingFormContainer;
