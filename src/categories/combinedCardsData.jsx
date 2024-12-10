 // src/data/combinedCardsData.jsx
import { cardsData as breakfastCards } from '../categories/breakfast';
import { cardsData as sweetCards } from '../categories/Sweet';
import { cardData as thaliCards } from '../categories/Thali';

export const combinedCardsData = [
  ...breakfastCards,
  ...sweetCards,
  ...thaliCards,
];

export default combinedCardsData;
