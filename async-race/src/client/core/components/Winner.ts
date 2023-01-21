import { MAX_WINNERS_PER_PAGE, urlPaths } from "../../config/config";
import { WinnerData, Winner as WinnerInterface } from "../interfaces/Winner";
import Car from "./Car";

class Winner implements WinnerInterface {
  static instance: Winner;

  private car: Car = Car.getInstance();

  static getInstance() {
    if (!Winner.instance) {
      Winner.instance = new Winner();
    }
    return Winner.instance;
  }

  add = async (body: object) => {
    const response = await fetch(urlPaths.Winners, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await response.json()) as WinnerData;
  };

  delete = async (id: number) => {
    const response = await fetch(`${urlPaths.Winners}/${id}`, {
      method: "DELETE",
    });
    return (await response.json()) as WinnerData;
  };

  getSortOrder = (sort: string, order: string) => {
    if (sort && order) return `&_sort=${sort}&_order=${order}`;
    return "";
  };

  getWinner = async (id: number): Promise<WinnerData> => {
    const respone = await fetch(`${urlPaths.Winners}/${id}`);
    if (!respone.ok) {
      throw new Error(respone.statusText);
    }
    return respone.json() as Promise<WinnerData>;
  };

  getWinnerStatus = async (id: number): Promise<number> => {
    const response = await fetch(`${urlPaths.Winners}/${id}`);
    return response.status;
  };

  getWinners = async (
    sort: string,
    order: string,
    page: number,
    limit = MAX_WINNERS_PER_PAGE
  ) => {
    const response = await fetch(
      `${urlPaths.Winners}?_page=${page}&_limit=${limit}${this.getSortOrder(
        sort,
        order
      )}`
    );
    const items = (await response.json()) as WinnerData[];

    const data = await Promise.all(
      items.map(async (winner: WinnerData) => ({
        ...winner,
        car: await this.car.getCar(winner.id),
      }))
    );
    const count = Number(response.headers.get("X-Total-Count"));

    return {
      items: data,
      count,
    };
  };

  update = async (id: number, body: object) => {
    const respone = await fetch(`${urlPaths.Winners}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return (await respone.json()) as WinnerData;
  };

  save = async (data: { id: number; time: number }) => {
    const status = await this.getWinnerStatus(data.id);
    if (status === 404) {
      await this.add({
        id: data.id,
        wins: 1,
        time: data.time,
      });
    } else {
      const winner = await this.getWinner(data.id);
      await this.update(data.id, {
        id: data.id,
        wins: Number(winner.wins) + 1,
        time: data.time < winner.time ? data.time : winner.time,
      });
    }
  };
}

export default Winner;
