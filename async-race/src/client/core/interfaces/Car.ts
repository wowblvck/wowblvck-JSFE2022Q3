interface Cars {
  create: (body: object) => Promise<CarData>;
  update: (id: number, body: object) => Promise<CarData>;
  getCars: (page: number, limit: number) => Promise<CarsData>;
  getImage: (color: string) => string;
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

export { Cars, CarData };
