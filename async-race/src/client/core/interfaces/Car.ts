interface Car {
  create: (body: object) => Promise<CarData>;
  update: (id: number, body: object) => Promise<CarData>;
  getCars: (page: number, limit: number) => Promise<CarsData>;
  getCar: (id: number) => Promise<CarData>;
  getImage: (id: number, color: string) => string;
  startEngine: (id: number) => Promise<EngineData>;
  stopEngine: (id: number) => Promise<EngineData>;
  drive: (id: number) => Promise<boolean | object>;
  finishIcon: (id: number) => string;
}

interface CarData {
  id: number;
  name: string;
  color: string;
}

interface CarsData {
  items: CarData[];
  count: number;
}

interface EngineData {
  velocity: number;
  distance: number;
}

export { Car, CarData, EngineData };
