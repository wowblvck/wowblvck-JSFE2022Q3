import { CarData } from "./Car";

interface Winner {
  add: (body: object) => Promise<WinnerData>;
}

interface WinnerData {
  car: CarData;
  id: number;
  wins: number;
  time: number;
}

export { Winner, WinnerData };
