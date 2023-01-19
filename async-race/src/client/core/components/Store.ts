import { EventEmitter } from "events";
import { MAX_CARS_PER_PAGE } from "../../config/config";
import { CarData } from "../interfaces/Car";
import { StoreData, AnimationData } from "../interfaces/Store";
import car from "./Car";

const carsLoadedEvent = new EventEmitter();

const DEFAULT_STATE: StoreData = {
  cars: [],
  carsCount: 0,
  currentPage: 1,
  maxPages: 1,
  itemsOfPage: MAX_CARS_PER_PAGE,
  idForUpdate: -1,
  animation: {},
  viewState: "garage",
};

class Store {
  private state = DEFAULT_STATE;

  static instance: Store;

  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  constructor() {
    this.loadAllCars();
  }

  get View() {
    return this.state.viewState;
  }

  set View(view: string) {
    this.state.viewState = view;
  }

  get Cars() {
    return this.state.cars;
  }

  set Cars(cars: CarData[]) {
    this.state.cars = cars;
  }

  get CarsCount() {
    return this.state.carsCount;
  }

  set CarsCount(count: number) {
    this.state.carsCount = count;
  }

  get Page() {
    return this.state.currentPage;
  }

  set Page(pageNumber: number) {
    this.state.currentPage = pageNumber;
  }

  get MaxPages() {
    return this.state.maxPages;
  }

  get ItemsOfPage() {
    return this.state.itemsOfPage;
  }

  set ItemsOfPage(items: number) {
    this.state.itemsOfPage = items;
  }

  get UpdateID() {
    return this.state.idForUpdate;
  }

  set UpdateID(id: number) {
    this.state.idForUpdate = id;
  }

  get Animation() {
    return this.state.animation;
  }

  set Animation(animation: AnimationData) {
    this.state.animation = animation;
  }

  loadAllCars = (pageNumber = 1) => {
    const cars = car.getCars(pageNumber);
    cars
      .then(({ items, count }) => {
        this.state.cars = items;
        this.state.carsCount = count;
        if (this.state.cars.length !== 0) {
          this.state.maxPages = Math.ceil(this.CarsCount / MAX_CARS_PER_PAGE);
        }
        carsLoadedEvent.emit("cars-loaded");
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export { Store, carsLoadedEvent };