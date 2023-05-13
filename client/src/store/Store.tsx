import { create } from "zustand";
import axios from "axios";
import { DataType } from "../interfaces";

const baseUrl = "http://localhost:3001/app";

export enum Action {
  GetList = "/",
  EditList = "/:id",
  AddItem = "/add",
  DeleteItem = "/delete/:id",
}

export type Store = {
  data: DataType[];
  loading: boolean;
  hasErrors: boolean;
  startRequest: () => void;
  endRequest: () => void;
  request: (request: Promise<any>) => void;
  fetch: (action: Action) => void;
  update: (action: Action, body: any, id: number) => void;
  deleteItem: (action: Action, id: any) => void;
  AddItem: (action: Action, body: any) => void;
};

export const useStore = create<Store>()((set, get) => ({
  data: [],
  loading: false,
  hasErrors: false,
  startRequest: () => set(() => ({ loading: true })),
  endRequest: () => set(() => ({ loading: false })),
  request: (request) => {
    const { startRequest, endRequest } = get();
    startRequest();

    request
      .then(set)
      .catch((err) => {
        console.log(err);
      })
      .finally(endRequest);
  },
  fetch: (action) => {
    const { request } = get();

    const response = axios
      .get(baseUrl + action)
      .then((res) => ({ data: res.data }));

    request(response);
  },
  update: (action, body, id) => {
    const { request, data } = get();

    const response = axios
      .put(baseUrl + action.replace(":id", id.toString()), body)
      .then((res) => ({
        data: data.map((item) => (item.id === id ? res.data.result : item)),
      }));

    request(response);
  },
  deleteItem: (action, id) => {
    const { request, data } = get();

    const response = axios
      .delete(baseUrl + action.replace(":id", id.toString()))
      .then(() => ({
        data: data.filter((item) => item.id !== id),
      }));

    request(response);
  },
  AddItem: (action, body) => {
    let { request, data } = get();

    const response = axios.post(baseUrl + action, body).then((res) => {
      data.push(res.data.result);

      return { data };
    });

    request(response);
  },
}));
