import { createContext, ReactElement } from "react";
import { data } from "./data";

interface UserType {
    name: string,
    email: string,
    img: string,
    subscription: boolean,
    price: number,
}

export interface MyContextType {
    value: number,
    users: UserType[],
}

const defaultValues = { value: 0, users: [] }

export const MyContext = createContext<MyContextType>(defaultValues)

const MyContextProvider = ({ children }: { children: ReactElement }) => {
    return (
        <MyContext.Provider value={data}>
            {children}
        </MyContext.Provider>
    )
}

export default MyContextProvider