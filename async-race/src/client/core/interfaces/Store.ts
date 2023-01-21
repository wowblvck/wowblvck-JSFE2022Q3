import { CarData } from "./Car";
import { WinnerData } from "./Winner";

interface StoreData {
  cars: CarData[];
  carsCount: number;
  currentPage: number;
  maxPages: number;
  itemsOfPage: number;
  idForUpdate: number;
  animation: AnimationData;
  viewState: string;
  sortBy: string;
  sortOrder: string;
  winners: WinnerData[];
  winnersCount: number;
  winnerPage: number;
  winnerMaxPages: number;
  winnerItemsOfPage: number;
}

interface AnimationData {
  [key: number]: {
    id: number;
  };
}

export { StoreData, AnimationData };
