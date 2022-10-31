import { createContext, useContext } from "react";
export type GlobalContent = {
  TokenUser: string;
  setTokenUser: (c: string) => void;
  Token: string;
  setToken: (c: string) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  TokenUser: "",
  setTokenUser: () => {},
  Token: "",
  setToken: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
