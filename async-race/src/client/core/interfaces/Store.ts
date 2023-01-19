import { CarData } from "./Car";

interface StoreData {
  cars: CarData[];
  carsCount: number;
  currentPage: number;
  maxPages: number;
  itemsOfPage: number;
  idForUpdate: number;
  animation: AnimationData;
  viewState: string;
}

interface AnimationData {
  [key: number]: {
    id: number;
  };
}

export { StoreData, AnimationData };
