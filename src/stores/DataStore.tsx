import { makeAutoObservable, runInAction } from "mobx";
// @ts-ignore
import { BASE_URL } from "@env";
import axios from "axios";

class DataStore {

  financialProductsList: object | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /*FINANCIAL PRODUCTS LIST*/
  FinancialProductsList = async () => {
    const url = `${BASE_URL}/bp/products`;
    const res = await axios.get(url);
    runInAction(() => this.financialProductsList = res.data?.data);
  };
}

export { DataStore };
