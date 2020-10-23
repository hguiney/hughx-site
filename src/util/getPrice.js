export default function getPrice( rate ) {
  const hourlyRate = 80;
  let multiplier;
  let giveDiscount = false;
  let psychologicalPricingSubtrahend = 50;
  // psychologicalPricingSubtrahend = 0;
  const discount = ( 1 / 10 );
  const roundToNearestMultipleOfSubtrahend = true;

  switch ( rate ) {
    case "hourly":
      multiplier = 1;
      psychologicalPricingSubtrahend = 0;
      break;

    case "daily":
      multiplier = 8;
      break;

    case "weekendly":
      multiplier = 16;
      // psychologicalPricingSubtrahend = 12.5;
      break;

    case "weekly":
      multiplier = 40;
      // psychologicalPricingSubtrahend = 25;
      break;

    case "semimonthly":
      multiplier = 80;
      break;

    case "monthly":
      multiplier = 160;
      // psychologicalPricingSubtrahend = 50;
      giveDiscount = true;
      break;

    default:
  }

  const baseRate = hourlyRate * multiplier;
  const psychologicalRate = baseRate - psychologicalPricingSubtrahend;
  const roundedRate = roundToNearestMultipleOfSubtrahend ? ( Math.round( psychologicalRate / psychologicalPricingSubtrahend ) * psychologicalPricingSubtrahend ) : psychologicalRate;
  const discountedPrice = giveDiscount ? ( roundedRate - ( roundedRate * discount ) ) : roundedRate;

  return {
    "value": discountedPrice,
    discount,
    "isDiscounted": giveDiscount,
    "originalValue": baseRate,
  };
} // getPrice
