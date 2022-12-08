import { createContext, useContext } from "react"
export type GlobalContent = {
  toggle: boolean
  setToggle:(c: boolean) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
toggle: false, 
setToggle: () => {},
})
export const useGlobalContext = () => useContext(MyGlobalContext)