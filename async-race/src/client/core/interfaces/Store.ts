import { CarData } from "./Car";

interface StoreData {
  cars: CarData[];
  carsCount: number;
  currentPage: number;
  maxPages: number;
  itemsOfPage: number;
  idForUpdate: number;
}

export default StoreData;
