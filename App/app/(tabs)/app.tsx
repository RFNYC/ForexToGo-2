import { createContext, useContext, useState } from "react";
import { DataContext } from "@/Contexts/DataContext1";
import Settings from "./Settings";
import Settings2 from "./Settings2";

export default function App() {

    const [userName, changePlaceholder] = useState(" ")

    return(
        <DataContext.Provider value={{userName, changePlaceholder}}>
            <Settings/>
            <Settings2/>
        </DataContext.Provider>
    )
}