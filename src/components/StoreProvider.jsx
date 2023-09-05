"use client";


import store from "@/store/store";
import { Provider } from "react-redux";

export function StoreProviders({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
