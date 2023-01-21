import { EventEmitter } from "events";
import {
  DEFAULT_ORDER,
  DEFAULT_SORT,
  MAX_CARS_PER_PAGE,
  MAX_WINNERS_PER_PAGE,
} from "../../config/config";
import { CarData } from "../interfaces/Car";
import { StoreData, AnimationData } from "../interfaces/Store";
import { WinnerData } from "../interfaces/Winner";
import Car from "./Car";
import Winner from "./Winner";

const carsLoadedEvent = new EventEmitter();
const winnersLoadedEvent = new EventEmitter();

const DEFAULT_STATE: StoreData = {
  cars: [],
  carsCount: 0,
  currentPage: 1,
  maxPages: 1,
  itemsOfPage: MAX_CARS_PER_PAGE,
  idForUpdate: -1,
  animation: {},
  viewState: "garage",
  sortBy: DEFAULT_SORT,
  sortOrder: DEFAULT_ORDER,
  winners: [],
  winnersCount: 0,
  winnerPage: 1,
  winnerMaxPages: 1,
  winnerItemsOfPage: MAX_WINNERS_PER_PAGE,
};

class Store {
  private state = DEFAULT_STATE;

  private car: Car = Car.getInstance();

  private winner: Winner = Winner.getInstance();

  static instance: Store;

  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  constructor() {
    this.loadAllCars();
    this.loadWinners();
  }

  get Sort() {
    return this.state.sortBy;
  }

  set Sort(sortType: string) {
    this.state.sortBy = sortType;
  }

  get Order() {
    return this.state.sortOrder;
  }

  set Order(orderType: string) {
    this.state.sortOrder = orderType;
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

  get Winners() {
    return this.state.winners;
  }

  set Winners(winners: WinnerData[]) {
    this.state.winners = winners;
  }

  get WinnerPage() {
    return this.state.winnerPage;
  }

  set WinnerPage(pageNumber: number) {
    this.state.winnerPage = pageNumber;
  }

  get WinnersCount() {
    return this.state.winnersCount;
  }

  set WinnersCount(count: number) {
    this.state.winnersCount = count;
  }

  get WinnerMaxPages() {
    return this.state.winnerMaxPages;
  }

  get ItemsOfPage() {
    return this.state.itemsOfPage;
  }

  set ItemsOfPage(items: number) {
    this.state.itemsOfPage = items;
  }

  get WinnerItemsOfPage() {
    return this.state.winnerItemsOfPage;
  }

  set WinnerItemsOfPage(items: number) {
    this.state.winnerItemsOfPage = items;
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
    const cars = this.car.getCars(pageNumber);
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

  loadWinners = (
    sort = DEFAULT_SORT,
    order = DEFAULT_ORDER,
    pageNumber = 1,
    limit = MAX_WINNERS_PER_PAGE
  ) => {
    const winners = this.winner.getWinners(sort, order, pageNumber, limit);
    winners
      .then(({ items, count }) => {
        this.state.winners = items;
        this.state.winnersCount = count;
        if (this.state.winners.length !== 0) {
          this.state.winnerMaxPages = Math.ceil(
            this.WinnersCount / MAX_WINNERS_PER_PAGE
          );
        }
        winnersLoadedEvent.emit("winners-loaded");
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export { Store, carsLoadedEvent, winnersLoadedEvent };
