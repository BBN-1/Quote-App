import { createContext, useEffect, useReducer } from "react";
import { quotesData } from "../components/DataStorage/DataStorage";


export const GameContext = createContext();

export const GameProvider = ({ children }) => {
   

    

    



   

 

    return (
        <GameContext.Provider value={{ quotesData }}>
            {children}
        </GameContext.Provider>
    );
};
