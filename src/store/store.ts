import AsyncStorage from "@react-native-async-storage/async-storage";
import { produce } from "immer";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeList: CoffeeData,
      BeansList: BeansData,
      FavoriteList: [],
      CartList: [],
      CartPrice: 0,
      OrderHistoryList: [],
    }),
    {
      name: "coffe-app-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
