import { useState, createContext } from "react";

export let ContextData=createContext();


export function ContextDataProvider(props){
    const [Token,setToken]=useState(localStorage.getItem("userToken"));
    return <ContextData.Provider  value={{Token,setToken}}>
          {props.children}

    </ContextData.Provider>
}