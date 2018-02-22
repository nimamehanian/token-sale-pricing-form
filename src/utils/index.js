import xor from 'lodash/xor';

// Adds entry to collection if different from existing last value in collection
export const distinctUntilChanged = (array, entryToAdd) => {
  const lastElement = array.length ? array[array.length - 1] : null;
  return lastElement === entryToAdd ? array : [...array, entryToAdd];
};

// As a third value arrives, drop first and add incoming one
export const lastEditedTuple = array => (
  array.length === 3 ? [array[1], array[2]] : array
);

// e.g., ['discount', 'publicPrice'] -> 'bcccdeiiilnopprstuu'
// e.g., ['publicPrice', 'discount'] -> 'bcccdeiiilnopprstuu'
// We map the alphabetized key to the function that accepts the two params
// it was generated from
export const hashFields = fields => (
  fields
    .join('')
    .split('')
    .map(char => char.toLowerCase())
    .sort()
    .join('')
);

// `xor` returns an array of the symmetric difference between both collections.
// So if we receive an empty array, it means the last two focused fields were
// `bonus` and `discount` (in either order), and thus we can't compute a third field.
export const areReagentsIncomputable = fields =>
  fields.length === 2 && !xor(fields, ['bonus', 'discount']).length;

// Rounds floats to hundredths place, by default
export const round = (number, decimalPlaces = 2) =>
  Number(`${Math.round(`${number}e${decimalPlaces}`)}e-${decimalPlaces}`);

export const calcDiscountFromBonus = bonus =>
  round((1 - (1 / (1 + (bonus / 100)))) * 100);

export const calcBonusFromDiscount = discount =>
  round(((1 / (1 - (discount / 100))) - 1) * 100);

export const calcBonusFromPublicAndGroupPrice = ({ publicPrice, groupPrice }) =>
  round(((publicPrice - groupPrice) / groupPrice) * 100);

export const calcGroupPriceFromBonusAndPublicPrice = ({ bonus, publicPrice }) =>
  round(publicPrice / (1 + (bonus / 100)));

export const calcGroupPriceFromDiscountAndPublicPrice = ({ discount, publicPrice }) =>
  round(publicPrice * (1 - (discount / 100)));

export const calcPublicPriceFromBonusAndGroupPrice = ({ bonus, groupPrice }) =>
  round(groupPrice * (1 + (bonus / 100)));

export const calcPublicPriceFromDiscountAndGroupPrice = ({ discount, groupPrice }) =>
  round(groupPrice / (1 - (discount / 100)));

export const paramsToFuncHash = {
  bccceegiiilopppprrruu: calcBonusFromPublicAndGroupPrice,
  bbcceiilnopprsuu: calcGroupPriceFromBonusAndPublicPrice,
  bcccdeiiilnopprstuu: calcGroupPriceFromDiscountAndPublicPrice,
  bceginoopprrsuu: calcPublicPriceFromBonusAndGroupPrice,
  ccdegiinoopprrstuu: calcPublicPriceFromDiscountAndGroupPrice,
};

export const paramsToOutputHash = {
  bccceegiiilopppprrruu: 'bonus',
  bbcceiilnopprsuu: 'groupPrice',
  bcccdeiiilnopprstuu: 'groupPrice',
  bceginoopprrsuu: 'publicPrice',
  ccdegiinoopprrstuu: 'publicPrice',
};
